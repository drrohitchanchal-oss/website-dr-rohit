import React, { useRef, useState } from 'react';
import { Camera, RefreshCw, Trash2, UserRound } from 'lucide-react';

interface DoctorPortraitFrameProps {
  doctorName: string;
  qualification: string;
  specialty: string;
  photoDataUrl: string | null;
  onPhotoChange: (dataUrl: string | null) => void;
  variant?: 'hero' | 'about';
}

function resizeImageToDataUrl(file: File, maxDimension = 960): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the selected image file.'));
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Invalid image data.'));
        return;
      }
      const img = new Image();
      img.onerror = () => reject(new Error('The selected file is not a valid image.'));
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const targetWidth = Math.round(img.width * scale);
        const targetHeight = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}

export const DoctorPortraitFrame: React.FC<DoctorPortraitFrameProps> = ({
  doctorName,
  qualification,
  specialty,
  photoDataUrl,
  onPhotoChange,
  variant = 'hero',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a JPG, PNG, or WebP photograph.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Please choose an image smaller than 10 MB.');
      return;
    }

    try {
      setIsProcessing(true);
      const optimizedDataUrl = await resizeImageToDataUrl(file);
      onPhotoChange(optimizedDataUrl);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Unable to process image.');
    } finally {
      setIsProcessing(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="sr-only"
        aria-label={`Upload photograph for ${doctorName}`}
      />

      <div
        className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#F4F8FD] via-white to-[#E8F5E9]/70 ${
          variant === 'hero' ? 'aspect-[4/4.3] lg:min-h-[420px]' : 'aspect-[4/4.5] lg:min-h-[400px]'
        } flex flex-col justify-between`}
      >
        {photoDataUrl ? (
          <>
            <img
              src={photoDataUrl}
              alt={`${doctorName}, ${qualification} — ${specialty}`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3">
              <div className="text-white">
                <p className="font-display text-base font-semibold leading-tight">{doctorName}</p>
                <p className="text-xs text-slate-200">
                  {qualification} · {specialty}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={triggerUpload}
                  disabled={isProcessing}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-medium text-slate-900 shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-[#1976D2]" aria-hidden="true" />
                  <span>Replace Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => onPhotoChange(null)}
                  aria-label="Remove uploaded doctor photograph"
                  className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-white hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-between p-6 sm:p-8 text-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/80 pb-3">
              <span className="font-medium text-slate-700">Doctor Portrait Placeholder</span>
              <span>Owner Upload Ready</span>
            </div>

            <div className="my-auto flex flex-col items-center py-6">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-[#1976D2]/20 bg-white text-[#1976D2] shadow-xs">
                <UserRound className="h-11 w-11 stroke-[1.5]" aria-hidden="true" />
              </div>

              <p className="font-display text-lg font-semibold text-slate-900">{doctorName}</p>
              <p className="mt-1 text-sm text-slate-600">
                {qualification} · {specialty}
              </p>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
                Upload the doctor&apos;s verified photograph to display here. No stock or AI-generated
                portrait is used.
              </p>

              <button
                type="button"
                onClick={triggerUpload}
                disabled={isProcessing}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1976D2] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1258A0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976D2] whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                <span>{isProcessing ? 'Preparing Photo...' : 'Upload Doctor Photo'}</span>
              </button>

              {uploadError && (
                <p role="alert" className="mt-3 text-xs font-medium text-red-700">
                  {uploadError}
                </p>
              )}
            </div>

            <div className="w-full border-t border-slate-200/80 pt-3 text-xs text-slate-500">
              Recommended: Clear portrait photo (JPG, PNG, or WebP)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
