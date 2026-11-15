import React from 'react';
import { MessageCircle, Phone, Settings2 } from 'lucide-react';
import {
  ClinicConfig,
  buildTelHref,
  buildWhatsAppHref,
} from '../config/clinicConfig';

interface FooterProps {
  config: ClinicConfig;
  onOpenEditor: () => void;
  onUnconfiguredContact: (channel: 'phone' | 'whatsapp') => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenEditor,
  onUnconfiguredContact,
}) => {
  const telHref = buildTelHref(config.phoneNumber);
  const waHref = buildWhatsAppHref(config.whatsappNumber);
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-[#0F2942] text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 gap-8 border-b border-white/15 pb-10 md:grid-cols-12">
          {/* Doctor Identity */}
          <div className="md:col-span-5">
            <p className="font-display text-xl font-bold text-white">{config.doctorName}</p>
            <p className="mt-1.5 text-sm font-medium text-sky-200">
              {config.qualification} · {config.specialty}
            </p>
            <p className="mt-2 text-sm text-slate-300">Barari, Bhagalpur, Bihar</p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-400">
              Quick Navigation
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#home" className="text-slate-200 transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-200 transition-colors hover:text-white">
                  About Doctor
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-200 transition-colors hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-200 transition-colors hover:text-white">
                  Contact &amp; Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Buttons */}
          <div className="md:col-span-4">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-400">
              Clinic Contact
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={telHref ?? '#contact'}
                onClick={handleCallClick}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#1976D2] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E88E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call Now</span>
              </a>
              <a
                href={waHref ?? '#contact'}
                target={waHref ? '_blank' : undefined}
                rel={waHref ? 'noopener noreferrer' : undefined}
                onClick={handleWhatsAppClick}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#E8F5E9] px-4 py-2.5 text-sm font-semibold text-[#1B5E20] transition-colors hover:bg-[#D7EED9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-300">
          <span className="font-semibold text-white">Medical Disclaimer: </span>
          Information on this website is for general awareness and does not replace professional
          medical consultation. For medical emergencies, seek immediate medical attention.
        </div>

        {/* Bottom Copyright & Owner Setup Trigger */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {config.doctorName}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Owner: Edit Clinic Details</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
