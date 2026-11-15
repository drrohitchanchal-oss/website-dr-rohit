import React, { useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import {
  ClinicConfig,
  buildTelHref,
  buildWhatsAppHref,
} from '../config/clinicConfig';

interface HeaderProps {
  config: ClinicConfig;
  onUnconfiguredContact: (channel: 'phone' | 'whatsapp') => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Doctor', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({ config, onUnconfiguredContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const telHref = buildTelHref(config.phoneNumber);
  const waHref = buildWhatsAppHref(config.whatsappNumber);

  const handleCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!telHref) {
      e.preventDefault();
      setMobileMenuOpen(false);
      onUnconfiguredContact('phone');
    } else {
      setMobileMenuOpen(false);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!waHref) {
      e.preventDefault();
      setMobileMenuOpen(false);
      onUnconfiguredContact('whatsapp');
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8">
        {/* Zone 1: Clean single-line brand wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-[#1976D2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0"
        >
          {config.doctorName}
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 transition-colors hover:text-[#1976D2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Prominent Call Now & WhatsApp actions (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={telHref ?? '#contact'}
              onClick={handleCallClick}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#1976D2] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1258A0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Call Now</span>
            </a>
            <a
              href={waHref ?? '#contact'}
              target={waHref ? '_blank' : undefined}
              rel={waHref ? 'noopener noreferrer' : undefined}
              onClick={handleWhatsAppClick}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-2 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#D7EED9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] whitespace-nowrap shrink-0"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile responsive navigation drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-slate-200 bg-white px-4 py-4 md:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-800 transition-colors hover:bg-slate-50 hover:text-[#1976D2]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <a
              href={telHref ?? '#contact'}
              onClick={handleCallClick}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1976D2] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1258A0]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call Now</span>
            </a>
            <a
              href={waHref ?? '#contact'}
              target={waHref ? '_blank' : undefined}
              rel={waHref ? 'noopener noreferrer' : undefined}
              onClick={handleWhatsAppClick}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-2.5 text-sm font-semibold text-[#1B5E20] transition-colors hover:bg-[#D7EED9]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
