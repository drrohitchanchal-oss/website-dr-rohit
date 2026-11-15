import React, { useState } from 'react';
import {
  CalendarClock,
  Clock,
  Edit3,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
} from 'lucide-react';
import {
  ClinicConfig,
  WHATSAPP_DEFAULT_MESSAGE,
  buildGoogleMapsDirectionsHref,
  buildTelHref,
  buildWhatsAppHref,
  isPlaceholderValue,
} from '../config/clinicConfig';

interface ContactSectionProps {
  config: ClinicConfig;
  onOpenEditor: () => void;
  onUnconfiguredContact: (channel: 'phone' | 'whatsapp') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  onOpenEditor,
  onUnconfiguredContact,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning');
  const [concern, setConcern] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const telHref = buildTelHref(config.phoneNumber);
  const waHref = buildWhatsAppHref(config.whatsappNumber);
  const directionsHref = buildGoogleMapsDirectionsHref(
    config.googleMapsUrl,
    config.clinicAddress
  );

  const handleCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!telHref) {
      e.preventDefault();
      onUnconfiguredContact('phone');
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!waHref) {
      e.preventDefault();
      onUnconfiguredContact('whatsapp');
    }
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = patientName.trim();
    const trimmedPhone = patientPhone.trim();
    const trimmedConcern = concern.trim();

    if (!trimmedName) {
      setFormError('Please enter the patient name.');
      return;
    }

    if (trimmedPhone && trimmedPhone.replace(/[^\d]/g, '').length < 7) {
      setFormError('Please enter a valid contact number or leave it blank.');
      return;
    }

    const messageParts = [
      WHATSAPP_DEFAULT_MESSAGE,
      '',
      `Patient Name: ${trimmedName}`,
      `Preferred Timing: ${preferredSlot}`,
    ];
    if (trimmedPhone) {
      messageParts.push(`Contact Number: ${trimmedPhone}`);
    }
    if (trimmedConcern) {
      messageParts.push(`Consultation Reason: ${trimmedConcern}`);
    }

    const fullMessage = messageParts.join('\n');
    const customWaHref = buildWhatsAppHref(config.whatsappNumber, fullMessage);

    if (!customWaHref) {
      onUnconfiguredContact('whatsapp');
      return;
    }

    window.open(customWaHref, '_blank', 'noopener,noreferrer');
  };

  const renderValue = (value: string, placeholderClass = 'text-amber-800 font-semibold') => {
    if (isPlaceholderValue(value)) {
      return <span className={placeholderClass}>{value}</span>;
    }
    return <span className="text-slate-900">{value}</span>;
  };

  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1976D2]">Visit &amp; Appointments</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
              Clinic Location &amp; Contact
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex min-h-[40px] items-center gap-2 self-start rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-[#1976D2] hover:bg-white hover:text-[#1976D2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] md:self-auto whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Update Clinic Details</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Clinic Information & Action Buttons */}
          <div className="flex flex-col lg:col-span-7">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    {config.doctorName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {config.qualification} · {config.specialty}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium text-slate-500">Location</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">
                    Barari, Bhagalpur
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1976D2]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Clinic Address</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-900">
                      {config.clinicAddress}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarClock
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1976D2]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Consultation Timing</dt>
                    <dd className="mt-1 text-sm tabular-nums">
                      {renderValue(config.consultationTiming)}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#1976D2]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Opening Hours</dt>
                    <dd className="mt-1 text-sm tabular-nums">
                      {renderValue(config.openingHours)}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#1976D2]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Phone</dt>
                    <dd className="mt-1 text-sm tabular-nums">
                      {renderValue(config.phoneNumber)}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1B5E20]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">WhatsApp</dt>
                    <dd className="mt-1 text-sm tabular-nums">
                      {renderValue(config.whatsappNumber)}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Navigation
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1976D2]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <dt className="text-xs font-medium text-slate-500">Google Maps</dt>
                    <dd className="mt-1 truncate text-sm">
                      {isPlaceholderValue(config.googleMapsUrl) ? (
                        <span className="font-semibold text-amber-800">
                          {config.googleMapsUrl}
                        </span>
                      ) : (
                        <a
                          href={directionsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-[#1976D2] underline-offset-4 hover:underline"
                        >
                          <span>Open Clinic Map Pin</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
                <a
                  href={telHref ?? '#contact'}
                  onClick={handleCallClick}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1976D2] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1258A0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Call Now</span>
                </a>

                <a
                  href={waHref ?? '#contact'}
                  target={waHref ? '_blank' : undefined}
                  rel={waHref ? 'noopener noreferrer' : undefined}
                  onClick={handleWhatsAppClick}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#1B5E20]/25 bg-[#E8F5E9] px-5 py-2.5 text-sm font-semibold text-[#1B5E20] transition-colors hover:bg-[#D7EED9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0"
                >
                  <Navigation className="h-4 w-4 text-[#1976D2]" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Patient Appointment Request via WhatsApp */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-sm font-semibold text-[#1B5E20]">Quick Appointment Request</p>
              <h3 className="mt-1.5 font-display text-2xl font-bold text-slate-900">
                Request Consultation Timings
              </h3>

              <form onSubmit={handleAppointmentSubmit} noValidate className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="patient-name"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Patient Name <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient full name"
                    className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="patient-phone"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="e.g. 98XXXXXXXX"
                      className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="preferred-slot"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="preferred-slot"
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Any Available Timing">Any Available Timing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="consultation-reason"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Health Concern / Service Needed (Optional)
                  </label>
                  <textarea
                    id="consultation-reason"
                    rows={3}
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    placeholder="e.g. General consultation, blood pressure checkup, or basic health checkup"
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
                  />
                </div>

                {formError && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-800"
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#1976D2] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1258A0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] cursor-pointer"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Send Request on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
