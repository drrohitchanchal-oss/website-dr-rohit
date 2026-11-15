import React from 'react';
import { ClipboardCheck, HeartPulse, Stethoscope } from 'lucide-react';

interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  accentSurface: string;
  accentIconColor: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'general-consultation',
    index: '01',
    title: 'General Consultation',
    description: 'General health assessment, consultation, and medical guidance.',
    icon: Stethoscope,
    accentSurface: 'bg-[#E3F2FD]',
    accentIconColor: 'text-[#1976D2]',
  },
  {
    id: 'blood-pressure-checkup',
    index: '02',
    title: 'Blood Pressure Checkup',
    description: 'Blood pressure measurement and basic monitoring guidance.',
    icon: HeartPulse,
    accentSurface: 'bg-[#E8F5E9]',
    accentIconColor: 'text-[#1B5E20]',
  },
  {
    id: 'basic-health-checkup',
    index: '03',
    title: 'Basic Health Checkup',
    description:
      'Basic health assessment and guidance on further medical evaluation when required.',
    icon: ClipboardCheck,
    accentSurface: 'bg-[#E3F2FD]',
    accentIconColor: 'text-[#1976D2]',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1976D2]">Patient Care &amp; Checkups</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
              Our Healthcare Services
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Focused primary care consultations in Barari, Bhagalpur to help patients understand
            their symptoms and plan appropriate next steps.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#1976D2]/35 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.accentSurface} ${service.accentIconColor}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden={true} />
                    </div>
                    <span className="font-display text-xs font-semibold text-slate-400 tabular-nums">
                      {service.index}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-base leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center text-sm font-semibold text-[#1976D2] transition-colors hover:text-[#1258A0]"
                  >
                    Ask about availability &rarr;
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
