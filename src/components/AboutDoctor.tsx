import React from 'react';
import { Award, GraduationCap, Stethoscope } from 'lucide-react';
import { ClinicConfig } from '../config/clinicConfig';
import { DoctorPortraitFrame } from './DoctorPortraitFrame';

interface AboutDoctorProps {
  config: ClinicConfig;
  onPhotoChange: (dataUrl: string | null) => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({
  config,
  onPhotoChange,
}) => {

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
