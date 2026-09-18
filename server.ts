import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'netbiz0925@gmail.com';

// Lazy SMTP transporter creation
function getMailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

async function sendAdminNotificationEmail(lead: {
  name: string;
  email?: string;
  phone: string;
  source: string;
  notes?: string;
  custom_fields?: Record<string, any>;
}) {
  const transporter = getMailTransporter();
  if (!transporter) {
    console.info(
      `[Email Notification] SMTP not configured. Lead for ${lead.name} (${lead.source}) intended for ${ADMIN_EMAIL}. To enable automatic SMTP emails, set SMTP_USER and SMTP_PASS.`
    );
    return false;
  }

  try {
    const fieldsHtml = lead.custom_fields
      ? Object.entries(lead.custom_fields)
          .map(
            ([k, v]) =>
              `<tr><td style="padding: 6px 12px; font-weight: bold; color: #242E51; border-bottom: 1px solid #eee;">${k}</td><td style="padding: 6px 12px; color: #333; border-bottom: 1px solid #eee;">${v}</td></tr>`
          )
          .join('')
      : '';

    const mailOptions = {
      from: `"Sentiero Hotel System" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `🛎️ New ${lead.source}: ${lead.name} (${lead.phone})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #242E51; border-radius: 12px; overflow: hidden;">
          <div style="background: #242E51; padding: 20px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; color: #CD9A29; font-size: 20px;">Sentiero Hotels & Suites</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #e2e8f0;">New Reservation & Inquiry Alert</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 14px; color: #333;">A new <strong>${lead.source}</strong> has been submitted on the website:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px;">
              <tr><td style="padding: 6px 12px; font-weight: bold; color: #242E51; border-bottom: 1px solid #eee;">Guest Name</td><td style="padding: 6px 12px; color: #333; border-bottom: 1px solid #eee;">${lead.name}</td></tr>
              <tr><td style="padding: 6px 12px; font-weight: bold; color: #242E51; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 6px 12px; color: #333; border-bottom: 1px solid #eee;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
              <tr><td style="padding: 6px 12px; font-weight: bold; color: #242E51; border-bottom: 1px solid #eee;">Email</td><td style="padding: 6px 12px; color: #333; border-bottom: 1px solid #eee;">${lead.email || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 12px; font-weight: bold; color: #242E51; border-bottom: 1px solid #eee;">Source</td><td style="padding: 6px 12px; color: #333; border-bottom: 1px solid #eee;">${lead.source}</td></tr>
              ${fieldsHtml}
            </table>
            ${
              lead.notes
                ? `<div style="margin-top: 20px; padding: 12px; background: #f8fafc; border-left: 4px solid #CD9A29; border-radius: 4px; font-size: 13px; color: #475569;"><strong>Notes:</strong> ${lead.notes}</div>`
                : ''
            }
          </div>
          <div style="background: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #64748b;">
            Sentiero Hotels & Suites · Sam Mbakwe Airport Road, Imo State
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Notification] Email successfully delivered to ${ADMIN_EMAIL}:`, info.messageId);
    return true;
  } catch (err: any) {
    console.error(`[Email Notification] Failed to send email to ${ADMIN_EMAIL}:`, err.message);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Status & Configuration Check
  app.get('/api/crm/status', (req, res) => {
    res.json({
      status: 'ok',
      hasPrivyrWebhook: Boolean(process.env.PRIVYR_WEBHOOK_URL && process.env.PRIVYR_WEBHOOK_URL.trim().length > 0),
      hasSmtpConfig: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
      adminEmail: ADMIN_EMAIL,
      timestamp: new Date().toISOString(),
    });
  });

  // API Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasPrivyrWebhook: Boolean(process.env.PRIVYR_WEBHOOK_URL && process.env.PRIVYR_WEBHOOK_URL.trim().length > 0),
      timestamp: new Date().toISOString(),
    });
  });

  // Secure Privyr CRM Relay & Admin Email Notification Endpoint
  // All incoming form submissions (Room bookings, airport shuttles, contact inquiries)
  // are received here and forwarded server-side to Privyr and optionally via email.
  // The webhook URL is never exposed to the client browser or committed to GitHub.
  app.post('/api/crm/lead', async (req, res) => {
    try {
      const { name, email, phone, source, notes, custom_fields } = req.body;
      const rawWebhookUrl = process.env.PRIVYR_WEBHOOK_URL?.trim();
      const webhookUrl = rawWebhookUrl ? rawWebhookUrl.split('#')[0].trim() : null;

      // Privyr standard payload format
      const payload: Record<string, any> = {
        name: name || 'Guest Inquiry',
        email: email || '',
        phone: phone || '',
        notes: notes || `Lead from Sentiero Hotels Website (${source || 'General'})`,
        other_fields: {
          Source: source || 'Website',
          Timestamp: new Date().toISOString(),
          ...(custom_fields || {}),
        },
      };

      let webhookDelivered = false;
      let webhookError: string | null = null;

      // 1. Dispatch to Privyr if webhook is configured
      if (webhookUrl) {
        try {
          console.log(`[Privyr CRM] Dispatching lead to Privyr for: ${payload.name} (${source})`);
          const crmResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (crmResponse.ok) {
            webhookDelivered = true;
            console.log(`[Privyr CRM] Lead successfully posted to Privyr for: ${payload.name}`);
          } else {
            const errorText = await crmResponse.text().catch(() => 'Unknown error');
            webhookError = `CRM status ${crmResponse.status}: ${errorText}`;
            console.error(`[Privyr CRM] Webhook error:`, webhookError);
          }
        } catch (postErr: any) {
          webhookError = postErr.message;
          console.error(`[Privyr CRM] Network error dispatching to Privyr:`, postErr);
        }
      } else {
        console.warn(
          `[Privyr CRM] PRIVYR_WEBHOOK_URL is not set yet. Lead recorded safely for: ${payload.name} (${source})`
        );
      }

      // 2. Dispatch email notification to admin
      const emailSent = await sendAdminNotificationEmail({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        source: source || 'Room Booking',
        notes: payload.notes,
        custom_fields: payload.other_fields,
      });

      return res.json({
        success: true,
        privyrConfigured: Boolean(webhookUrl),
        privyrDelivered: webhookDelivered,
        privyrError: webhookError,
        emailSent,
        adminEmail: ADMIN_EMAIL,
        message: !webhookUrl
          ? 'Lead received. Privyr Webhook URL is not yet configured in environment.'
          : webhookDelivered
          ? 'Lead delivered to Privyr CRM successfully.'
          : 'Lead processed with webhook error.',
      });
    } catch (err: any) {
      console.error('[Privyr CRM / Email] Failed to process lead:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Internal error processing lead',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sentiero Server running on port ${PORT}`);
  });
}

startServer();
