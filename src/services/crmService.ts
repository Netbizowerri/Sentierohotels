export interface CrmLeadPayload {
  name: string;
  email?: string;
  phone: string;
  source: 'Room Booking' | 'Contact Inquiry' | 'Airport Shuttle Dispatch';
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
 * Dispatches guest contact and booking details securely to the server-side
 * Privyr CRM proxy (/api/crm/lead).
 * The webhook URL itself remains hidden in backend environment variables and
 * will never be exposed to the browser or committed to version control.
 */
export async function sendLeadToCrm(lead: CrmLeadPayload): Promise<CrmResponse> {
  try {
    const response = await fetch('/api/crm/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `Server responded with status ${response.status}`,
      };
    }

    return await response.json();
  } catch (err: any) {
    console.warn('[CRM Client] Failed to send lead to backend proxy:', err);
    // Return gracefully so user experience in UI is never blocked
    return {
      success: false,
      error: err.message || 'Network error',
    };
  }
}
