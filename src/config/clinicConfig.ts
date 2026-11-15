export type AssociationType =
  | 'unconfirmed'
  | 'clinical_training'
  | 'previous_experience'
  | 'current_practice'
  | 'professional_affiliation';

export interface ClinicConfig {
  doctorName: string;
  qualification: string;
  specialty: string;
  experience: string;
  tagline: string;
  supportingText: string;
  aboutText: string;
  clinicVision: string;
  associationType: AssociationType;
  associationInstitution: string;
  associationDescription: string;
  clinicAddress: string;
  consultationTiming: string;
  openingHours: string;
  phoneNumber: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  doctorPhotoDataUrl: string | null;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello Doctor, I would like to book an appointment. Please share the available timings.';

export const PLACEHOLDERS = {
  phoneNumber: '[ADD CLINIC PHONE NUMBER]',
  whatsappNumber: '[ADD WHATSAPP NUMBER]',
  googleMapsUrl: '[ADD GOOGLE MAPS LOCATION LINK]',
  consultationTiming: '[ADD CONSULTATION TIMING]',
  openingHours: '[ADD OPENING HOURS]',
} as const;

export const DEFAULT_CLINIC_CONFIG: ClinicConfig = {
  doctorName: 'Dr. Rohit Chanchal',
  qualification: 'MBBS',
  specialty: 'General Physician',
  experience: '1 Year',
  tagline: 'General Consultation in Barari, Bhagalpur',
  supportingText:
    'Accessible healthcare consultation and patient-focused medical guidance in Barari, Bhagalpur.',
  aboutText:
    "Dr. Rohit Chanchal provides general healthcare consultation with a focus on understanding patients' health concerns and offering appropriate medical guidance.",
  clinicVision:
    'To make accessible, affordable, and quality healthcare consultation available to people in Barari and nearby areas of Bhagalpur.',
  associationType: 'unconfirmed',
  associationInstitution: 'Mayaganj Hospital (JLNMCH), Bhagalpur',
  associationDescription:
    'Associated with Mayaganj Hospital (JLNMCH), Bhagalpur — [EDIT: Specify clinical training, previous experience, current practice, or professional affiliation before publishing].',
  clinicAddress: 'Barari, Bhagalpur, Bihar, India',
  consultationTiming: PLACEHOLDERS.consultationTiming,
  openingHours: PLACEHOLDERS.openingHours,
  phoneNumber: PLACEHOLDERS.phoneNumber,
  whatsappNumber: PLACEHOLDERS.whatsappNumber,
  googleMapsUrl: PLACEHOLDERS.googleMapsUrl,
  doctorPhotoDataUrl: null,
};

const STORAGE_KEY = 'dr_rohit_chanchal_clinic_config_v1';

export function loadClinicConfig(): ClinicConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_CLINIC_CONFIG;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CLINIC_CONFIG;
    const parsed = JSON.parse(raw) as Partial<ClinicConfig>;
    return {
      ...DEFAULT_CLINIC_CONFIG,
      ...parsed,
    };
  } catch {
    return DEFAULT_CLINIC_CONFIG;
  }
}

export function saveClinicConfig(config: ClinicConfig): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage quota errors silently; state remains active for session
  }
}

export function resetClinicConfig(): ClinicConfig {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }
  return DEFAULT_CLINIC_CONFIG;
}

export function isPlaceholderValue(value: string): boolean {
  const trimmed = value.trim();
  return !trimmed || (trimmed.startsWith('[') && trimmed.endsWith(']'));
}

export function sanitizePhoneDigits(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

export function isConfiguredPhone(phone: string): boolean {
  if (isPlaceholderValue(phone)) return false;
  return sanitizePhoneDigits(phone).length >= 7;
}

export function buildTelHref(phone: string): string | null {
  if (!isConfiguredPhone(phone)) return null;
  const cleaned = phone.trim().replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

export function buildWhatsAppHref(
  whatsappNumber: string,
  customMessage: string = WHATSAPP_DEFAULT_MESSAGE
): string | null {
  if (!isConfiguredPhone(whatsappNumber)) return null;
  const digits = sanitizePhoneDigits(whatsappNumber);
  // If a 10-digit Indian mobile number is entered without country code, prefix 91
  const normalizedDigits = digits.length === 10 ? `91${digits}` : digits;
  const encodedText = encodeURIComponent(customMessage);
  return `https://wa.me/${normalizedDigits}?text=${encodedText}`;
}

export function buildGoogleMapsDirectionsHref(googleMapsUrl: string, address: string): string {
  if (!isPlaceholderValue(googleMapsUrl) && /^https?:\/\//i.test(googleMapsUrl.trim())) {
    return googleMapsUrl.trim();
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const ASSOCIATION_TYPE_LABELS: Record<AssociationType, string> = {
  unconfirmed: 'To Be Confirmed by Clinic',
  clinical_training: 'Clinical Training',
  previous_experience: 'Previous Experience',
  current_practice: 'Current Practice',
  professional_affiliation: 'Professional Affiliation',
};
