import React from 'react';
import { Award, Building2, Edit3, GraduationCap, ShieldAlert, Stethoscope } from 'lucide-react';
import {
  ASSOCIATION_TYPE_LABELS,
  ClinicConfig,
} from '../config/clinicConfig';
import { DoctorPortraitFrame } from './DoctorPortraitFrame';

interface AboutDoctorProps {
  config: ClinicConfig;
  onPhotoChange: (dataUrl: string | null) => void;
  onOpenEditor: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({
  config,
  onPhotoChange,
  onOpenEditor,
}) => {
  const isUnconfirmedAssociation = config.associationType === 'unconfirmed';

  return (
    <section
      id="about"
      className="border-b border-slate-200/80 bg-[#F8FAFC] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Doctor Photograph */}
          <div className="lg:col-span-5">
            <DoctorPortraitFrame
              doctorName={config.doctorName}
              qualification={config.qualification}
              specialty={config.specialty}
              photoDataUrl={config.doctorPhotoDataUrl}
              onPhotoChange={onPhotoChange}
              variant="about"
            />
          </div>

          {/* Right Column: Doctor Profile, Credentials & Vision */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-sm font-semibold text-[#1976D2]">About the Doctor</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
              {config.doctorName}
            </h2>
            <p className="mt-2 text-base font-medium text-slate-700">
              {config.qualification} · {config.specialty} · {config.experience} Experience
            </p>

            <p className="mt-5 text-base leading-relaxed text-slate-700">
              {config.aboutText}
            </p>

            {/* Structured Credential Overview */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <GraduationCap className="h-4 w-4 text-[#1976D2]" aria-hidden="true" />
                  <span>Qualification</span>
                </div>
                <p className="mt-1.5 font-display text-base font-bold text-slate-900">
                  {config.qualification}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Stethoscope className="h-4 w-4 text-[#1976D2]" aria-hidden="true" />
                  <span>Specialization</span>
                </div>
                <p className="mt-1.5 font-display text-base font-bold text-slate-900">
                  {config.specialty}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Award className="h-4 w-4 text-[#1B5E20]" aria-hidden="true" />
                  <span>Experience</span>
                </div>
                <p className="mt-1.5 font-display text-base font-bold text-slate-900 tabular-nums">
                  {config.experience}
                </p>
              </div>
            </div>

            {/* Editable Professional Background / Hospital Association */}
            <div
              className={`mt-6 rounded-xl border p-5 ${
                isUnconfirmedAssociation
                  ? 'border-amber-300 bg-amber-50/70'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {isUnconfirmedAssociation ? (
                    <ShieldAlert className="h-4 w-4 shrink-0 text-amber-800" aria-hidden="true" />
                  ) : (
                    <Building2 className="h-4 w-4 shrink-0 text-[#1976D2]" aria-hidden="true" />
                  )}
                  <h3 className="font-display text-sm font-bold text-slate-900">
                    Professional Background &amp; Institution Reference
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onOpenEditor}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-[#1976D2] hover:text-[#1976D2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Edit Association</span>
                </button>
              </div>

              <p className="mt-2 text-xs font-medium text-slate-600">
                Institution: {config.associationInstitution} · Status:{' '}
                <span className={isUnconfirmedAssociation ? 'font-semibold text-amber-900' : 'text-slate-800'}>
                  {ASSOCIATION_TYPE_LABELS[config.associationType]}
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {config.associationDescription}
              </p>
            </div>

            {/* Clinic Vision */}
            <div className="mt-6 rounded-xl border border-[#1B5E20]/15 bg-[#E8F5E9]/70 p-5">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-[#1B5E20]">
                Clinic Vision
              </p>
              <p className="mt-1.5 text-base leading-relaxed text-slate-800">
                &ldquo;{config.clinicVision}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
