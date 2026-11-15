import React, { useEffect, useState } from 'react';
import { Check, Copy, RotateCcw, Save, X } from 'lucide-react';
import {
  ASSOCIATION_TYPE_LABELS,
  AssociationType,
  ClinicConfig,
  DEFAULT_CLINIC_CONFIG,
} from '../config/clinicConfig';

interface ClinicSetupModalProps {
  isOpen: boolean;
  config: ClinicConfig;
  onClose: () => void;
  onSave: (updated: ClinicConfig) => void;
  onReset: () => void;
}

export const ClinicSetupModal: React.FC<ClinicSetupModalProps> = ({
  isOpen,
  config,
  onClose,
  onSave,
  onReset,
}) => {
  const [draft, setDraft] = useState<ClinicConfig>(config);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDraft(config);
      setCopiedCode(false);
    }
  }, [isOpen, config]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  const handleCopyConfigSnippet = async () => {
    const snippet = JSON.stringify(
      {
        ...draft,
        doctorPhotoDataUrl: draft.doctorPhotoDataUrl
          ? '/* Uploaded in browser — place image in public/images/doctor.jpg for production */'
          : null,
      },
      null,
      2
    );
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clinic-setup-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-xs"
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 id="clinic-setup-title" className="font-display text-lg font-bold text-slate-900">
              Edit Clinic Details &amp; Doctor Profile
            </h2>
            <p className="mt-0.5 text-xs text-slate-600">
              Changes save locally in this browser. Copy the JSON config to commit to source code.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close clinic details editor"
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-phone" className="block text-xs font-semibold text-slate-700">
                Clinic Phone Number
              </label>
              <input
                id="edit-phone"
                type="text"
                value={draft.phoneNumber}
                onChange={(e) => setDraft({ ...draft, phoneNumber: e.target.value })}
                placeholder="+91 98XXXXXXXX"
                className="mt-1 block w-full min-h-[42px] rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
              />
            </div>

            <div>
              <label htmlFor="edit-whatsapp" className="block text-xs font-semibold text-slate-700">
                WhatsApp Number
              </label>
              <input
                id="edit-whatsapp"
                type="text"
                value={draft.whatsappNumber}
                onChange={(e) => setDraft({ ...draft, whatsappNumber: e.target.value })}
                placeholder="+91 98XXXXXXXX"
                className="mt-1 block w-full min-h-[42px] rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-timing" className="block text-xs font-semibold text-slate-700">
                Consultation Timing
              </label>
              <input
                id="edit-timing"
                type="text"
                value={draft.consultationTiming}
                onChange={(e) => setDraft({ ...draft, consultationTiming: e.target.value })}
                placeholder="e.g. 9:00 AM – 1:00 PM, 5:00 PM – 8:00 PM"
                className="mt-1 block w-full min-h-[42px] rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
              />
            </div>

            <div>
              <label htmlFor="edit-hours" className="block text-xs font-semibold text-slate-700">
                Opening Hours
              </label>
              <input
                id="edit-hours"
                type="text"
                value={draft.openingHours}
                onChange={(e) => setDraft({ ...draft, openingHours: e.target.value })}
                placeholder="e.g. Mon – Sat, Sunday Closed"
                className="mt-1 block w-full min-h-[42px] rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-address" className="block text-xs font-semibold text-slate-700">
                Clinic Address
              </label>
              <input
                id="edit-address"
                type="text"
                value={draft.clinicAddress}
                onChange={(e) => setDraft({ ...draft, clinicAddress: e.target.value })}
                placeholder="Barari, Bhagalpur, Bihar, India"
                className="mt-1 block w-full min-h-[42px] rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
              />
            </div>

            <div>
              <label htmlFor="edit-maps" className="block text-xs font-semibold text-slate-700">
                Google Maps Location Link
              </label>
              <input
                id="edit-maps"
                type="text"
                value={draft.googleMapsUrl}
                onChange={(e) => setDraft({ ...draft, googleMapsUrl: e.target.value })}
                placeholder="https://maps.google.com/..."
                className="mt-1 block w-full min-h-[42px] rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
              />
            </div>
          </div>

          {/* Hospital Association Verification & Edit */}
          <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 space-y-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-slate-700">
              Hospital Association (Mayaganj Hospital / JLNMCH, Bhagalpur)
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="edit-assoc-type"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Association Category
                </label>
                <select
                  id="edit-assoc-type"
                  value={draft.associationType}
                  onChange={(e) =>
                    setDraft({ ...draft, associationType: e.target.value as AssociationType })
                  }
                  className="mt-1 block w-full min-h-[42px] rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
                >
                  {(Object.keys(ASSOCIATION_TYPE_LABELS) as AssociationType[]).map((key) => (
                    <option key={key} value={key}>
                      {ASSOCIATION_TYPE_LABELS[key]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="edit-assoc-inst"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Institution Name
                </label>
                <input
                  id="edit-assoc-inst"
                  type="text"
                  value={draft.associationInstitution}
                  onChange={(e) =>
                    setDraft({ ...draft, associationInstitution: e.target.value })
                  }
                  className="mt-1 block w-full min-h-[42px] rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="edit-assoc-desc"
                className="block text-xs font-semibold text-slate-700"
              >
                Verified Description (Previous experience, clinical training, current practice, or
                affiliation)
              </label>
              <textarea
                id="edit-assoc-desc"
                rows={3}
                value={draft.associationDescription}
                onChange={(e) => setDraft({ ...draft, associationDescription: e.target.value })}
                className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-[#1976D2] focus:outline-2 focus:outline-[#1976D2]/20"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onReset();
                  setDraft(DEFAULT_CLINIC_CONFIG);
                }}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Defaults</span>
              </button>
              <button
                type="button"
                onClick={handleCopyConfigSnippet}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                {copiedCode ? (
                  <Check className="h-3.5 w-3.5 text-[#1B5E20]" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                <span>{copiedCode ? 'Copied JSON' : 'Copy Config JSON'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[42px] items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#1976D2] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1258A0] cursor-pointer"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                <span>Save Details</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
