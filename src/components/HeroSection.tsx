import React from 'react';
import { ArrowDown, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  ClinicConfig,
  buildTelHref,
  buildWhatsAppHref,
  isPlaceholderValue,
} from '../config/clinicConfig';
import { DoctorPortraitFrame } from './DoctorPortraitFrame';

interface HeroSectionProps {
  config: ClinicConfig;
  onPhotoChange: (dataUrl: string | null) => void;
  onUnconfiguredContact: (channel: 'phone' | 'whatsapp') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onPhotoChange,
  onUnconfiguredContact,
}) => {
  const telHref = buildTelHref(config.phoneNumber);
  const waHref = buildWhatsAppHref(config.whatsappNumber);

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

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#F4F8FD] via-white to-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Primary Doctor Identity & Consultation Actions */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#1976D2]">
              <span>{config.qualification}</span>
              <span aria-hidden="true" className="text-slate-400">
                ·
              </span>
              <span>{config.specialty}</span>
              <span aria-hidden="true" className="text-slate-400">
                ·
              </span>
              <span className="inline-flex items-center gap-1 text-slate-700">
                <MapPin className="h-3.5 w-3.5 text-[#1976D2]" aria-hidden="true" />
                Barari, Bhagalpur
              </span>
            </div>

            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight text-slate-900 [text-wrap:balance]">
              {config.doctorName}
            </h1>

            <p className="mt-3 font-display text-xl font-semibold text-[#1976D2] sm:text-2xl [text-wrap:balance]">
              {config.specialty} &amp; Healthcare Consultation
            </p>

            <p className="mt-4 text-base font-medium text-slate-800 sm:text-lg">
              &ldquo;{config.tagline}&rdquo;
            </p>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
              {config.supportingText}
            </p>

            {/* Primary Call & WhatsApp CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={telHref ?? '#contact'}
                onClick={handleCallClick}
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-[#1976D2] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#1258A0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call Now</span>
              </a>

              <a
                href={waHref ?? '#contact'}
                target={waHref ? '_blank' : undefined}
                rel={waHref ? 'noopener noreferrer' : undefined}
                onClick={handleWhatsAppClick}
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-[#1B5E20]/25 bg-[#E8F5E9] px-6 py-3 text-sm font-semibold text-[#1B5E20] transition-colors hover:bg-[#D7EED9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0"
              >
                <span>Clinic Location &amp; Timings</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {/* Clean unboxed clinical facts strip */}
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-200 pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-medium text-slate-500">Qualification</dt>
                <dd className="mt-1 font-display text-base font-bold text-slate-900">
                  {config.qualification}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-500">Clinical Experience</dt>
                <dd className="mt-1 font-display text-base font-bold text-slate-900 tabular-nums">
                  {config.experience}
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-xs font-medium text-slate-500">Consultation Hours</dt>
                <dd
                  className={`mt-1 font-display text-sm font-semibold ${
                    isPlaceholderValue(config.consultationTiming)
                      ? 'text-amber-800'
                      : 'text-slate-900'
                  }`}
                >
                  {config.consultationTiming}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right column: Doctor Portrait Upload Frame */}
          <div className="lg:col-span-5">
            <DoctorPortraitFrame
              doctorName={config.doctorName}
              qualification={config.qualification}
              specialty={config.specialty}
              photoDataUrl={config.doctorPhotoDataUrl}
              onPhotoChange={onPhotoChange}
              variant="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
