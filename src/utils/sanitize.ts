import type { Reservation } from '../types/hotel';

const MAX_TEXT_LENGTH = 2000;
const MAX_NAME_LENGTH = 120;
const MAX_PHONE_LENGTH = 30;
const MAX_EMAIL_LENGTH = 254;
const MAX_DATE_LENGTH = 10;

const HTML_TAG_REGEX = /<[^>]*>/g;
const CONTROL_CHAR_REGEX = /[\u0000-\u001f\u007f]/g;
const WHITESPACE_REGEX = /\s{2,}/g;
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ'’.\-\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+]?[0-9\s()\-.]{6,20}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const RATE_TYPES: ReadonlyArray<Reservation['rateType']> = ['member', 'standard'];
const STATUSES: ReadonlyArray<Reservation['status']> = [
  'Confirmed',
  'Checked-in',
  'Completed',
  'Cancelled',
];

function stripUnsafe(value: string): string {
  return value
    .replace(HTML_TAG_REGEX, ' ')
    .replace(CONTROL_CHAR_REGEX, ' ')
    .replace(WHITESPACE_REGEX, ' ')
    .trim();
}

export function sanitizeText(value: unknown, maxLength: number = MAX_TEXT_LENGTH): string {
  if (typeof value !== 'string') return '';
  return stripUnsafe(value).slice(0, maxLength);
}

export function sanitizeName(value: unknown): string {
  const cleaned = sanitizeText(value, MAX_NAME_LENGTH);
  return cleaned.replace(/[^\p{L}\p{M}'.\-\s]/gu, '');
}

export function isValidName(value: unknown): boolean {
  const name = sanitizeText(value, MAX_NAME_LENGTH);
  if (name.length < 2 || name.length > MAX_NAME_LENGTH) return false;
  return NAME_REGEX.test(name);
}

export function sanitizePhone(value: unknown): string {
  const cleaned = stripUnsafe(String(value ?? ''))
    .replace(/[^0-9+()\s.\-]/g, '')
    .slice(0, MAX_PHONE_LENGTH);
  return cleaned;
}

export function isValidPhone(value: unknown): boolean {
  const phone = sanitizePhone(value);
  if (phone.length < 6) return false;
  return PHONE_REGEX.test(phone);
}

export function sanitizeEmail(value: unknown): string {
  const cleaned = stripUnsafe(String(value ?? '')).toLowerCase();
  if (cleaned.length > MAX_EMAIL_LENGTH) return '';
  return EMAIL_REGEX.test(cleaned) ? cleaned : '';
}

export function isValidEmail(value: unknown): boolean {
  return typeof value === 'string' && EMAIL_REGEX.test(value.trim().toLowerCase());
}

export function sanitizeDate(value: unknown): string {
  const raw = String(value ?? '').trim();
  if (!DATE_REGEX.test(raw)) return '';
  const [year, month, day] = raw.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return '';
  }
  return raw;
}

export function isValidDate(value: unknown): boolean {
  return sanitizeDate(value) !== '';
}

export function sanitizeReservation(raw: unknown): Reservation | null {
  if (!raw || typeof raw !== 'object') return null;

  const record = raw as Record<string, unknown>;
  const guestName = sanitizeText(record.guestName, MAX_NAME_LENGTH);
  const guestPhone = sanitizePhone(record.guestPhone);
  const guestEmail = sanitizeEmail(record.guestEmail);
  const checkInDate = sanitizeDate(record.checkInDate);
  const checkOutDate = sanitizeDate(record.checkOutDate);
  const suiteName = sanitizeText(record.suiteName, MAX_NAME_LENGTH);
  const suiteImage = sanitizeText(record.suiteImage, 500);
  const suiteId = sanitizeText(record.suiteId, 64);
  const bookingRef = sanitizeText(record.bookingRef, 32);
  const id = sanitizeText(record.id, 64);
  const specialRequests = sanitizeText(record.specialRequests);
  const createdAt = sanitizeText(record.createdAt, 40);
  const rateType = RATE_TYPES.includes(record.rateType as Reservation['rateType'])
    ? (record.rateType as Reservation['rateType'])
    : 'member';
  const status = STATUSES.includes(record.status as Reservation['status'])
    ? (record.status as Reservation['status'])
    : 'Confirmed';
  const guestsCount = Math.max(1, Math.min(20, Number(record.guestsCount) || 1));
  const totalPriceNgn = Number(record.totalPriceNgn) || 0;
  const totalPriceUsd = Number(record.totalPriceUsd) || 0;

  if (!id || !bookingRef || !suiteId || !checkInDate || !checkOutDate || !guestName || !guestPhone) {
    return null;
  }

  return {
    id,
    bookingRef,
    suiteId,
    suiteName,
    suiteImage,
    rateType,
    guestName,
    guestEmail,
    guestPhone,
    checkInDate,
    checkOutDate,
    guestsCount,
    specialRequests,
    totalPriceNgn,
    totalPriceUsd,
    status,
    createdAt,
  };
}

export function sanitizeReservations(raw: unknown): Reservation[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const result: Reservation[] = [];
  for (const item of raw) {
    const reservation = sanitizeReservation(item);
    if (!reservation || seen.has(reservation.id)) continue;
    seen.add(reservation.id);
    result.push(reservation);
  }
  return result;
}