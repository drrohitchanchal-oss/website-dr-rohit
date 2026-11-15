import { useState } from 'react';
import { AlertCircle, Edit3, X } from 'lucide-react';
import { AboutDoctor } from './components/AboutDoctor';
import { ClinicSetupModal } from './components/ClinicSetupModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import {
  ClinicConfig,
  loadClinicConfig,
  resetClinicConfig,
  saveClinicConfig,
} from './config/clinicConfig';

export default function App() {
  const [config, setConfig] = useState<ClinicConfig>(() => loadClinicConfig());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [contactNotice, setContactNotice] = useState<'phone' | 'whatsapp' | null>(null);

  const handleSaveConfig = (updated: ClinicConfig) => {
    setConfig(updated);
    saveClinicConfig(updated);
    setContactNotice(null);
  };

  const handlePhotoChange = (photoDataUrl: string | null) => {
    const updated = { ...config, doctorPhotoDataUrl: photoDataUrl };
    setConfig(updated);
    saveClinicConfig(updated);
  };

  const handleResetConfig = () => {
    const reset = resetClinicConfig();
    setConfig(reset);
    setContactNotice(null);
  };

  const handleUnconfiguredContact = (channel: 'phone' | 'whatsapp') => {
    setContactNotice(channel);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header config={config} onUnconfiguredContact={handleUnconfiguredContact} />

      <main className="flex-1">
        {contactNotice && (
          <div
            role="status"
            className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-800" aria-hidden="true" />
                <span>
                  {contactNotice === 'phone'
                    ? 'Clinic phone number is currently a placeholder ([ADD CLINIC PHONE NUMBER]).'
                    : 'Clinic WhatsApp number is currently a placeholder ([ADD WHATSAPP NUMBER]).'}{' '}
                  Add the clinic number to activate direct calling and WhatsApp links.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setContactNotice(null);
                    setIsEditorOpen(true);
                  }}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-amber-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amber-800 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Add Number Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContactNotice(null)}
                  aria-label="Dismiss notice"
                  className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg text-amber-900 hover:bg-amber-100 cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}

        <HeroSection
          config={config}
          onPhotoChange={handlePhotoChange}
          onUnconfiguredContact={handleUnconfiguredContact}
        />

        <ServicesSection />

        <AboutDoctor
          config={config}
          onPhotoChange={handlePhotoChange}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        <ContactSection
          config={config}
          onOpenEditor={() => setIsEditorOpen(true)}
          onUnconfiguredContact={handleUnconfiguredContact}
        />
      </main>

      <Footer
        config={config}
        onOpenEditor={() => setIsEditorOpen(true)}
        onUnconfiguredContact={handleUnconfiguredContact}
      />

      <ClinicSetupModal
        isOpen={isEditorOpen}
        config={config}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
