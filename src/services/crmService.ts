const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnpnnadb';

import { sanitizeText, sanitizeEmail, sanitizePhone } from '../utils/sanitize';

export interface CrmLeadPayload {
  name: string;
  email?: string;
  phone: string;
  source: 'Room Booking' | 'Contact Inquiry';
  notes?: string;
  custom_fields?: Record<string, string | number | boolean | undefined | null>;
}

export interface CrmResponse {
  success: boolean;
  delivered?: boolean;
  message?: string;
  error?: string;
}

/**
 * Dispatches guest booking and inquiry details directly to the Formspree form
 * backend (https://formspree.io/f/xnpnnadb), which emails the Sentiero admin
 * inbox with every new submission.
 */
export async function sendLeadToCrm(
  lead: CrmLeadPayload,
  endpoint: string = FORMSPREE_ENDPOINT,
): Promise<CrmResponse> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: sanitizeText(lead.name, 120),
        email: sanitizeEmail(lead.email) || '',
        phone: sanitizePhone(lead.phone),
        _subject: `New ${sanitizeText(lead.source, 60)} — Sentiero Website`,
        message: sanitizeText(lead.notes),
        ...Object.fromEntries(
          Object.entries(lead.custom_fields ?? {}).map(([k, v]) => [sanitizeText(k, 100), sanitizeText(String(v), 500)]),
        ),
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.ok === false) {
      const firstError = Array.isArray(data.errors) ? data.errors[0] : undefined;
      return {
        success: false,
        error: firstError?.message || `Form service responded with status ${response.status}`,
      };
    }

    return {
      success: true,
      message: 'Submission delivered to the Sentiero front desk.',
    };
  } catch (err: any) {
    console.warn('[Formspree] Failed to submit lead:', err);
    // Return gracefully so user experience in UI is never blocked
    return {
      success: false,
      error: err.message || 'Network error',
    };
  }
}