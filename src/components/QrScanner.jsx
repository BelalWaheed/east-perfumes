import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { HiX } from 'react-icons/hi';
import { useTranslation } from '@/hooks/useTranslation';

export default function QrScanner({ onScan, onClose }) {
  const { t } = useTranslation();
  const scannerRef = useRef(null);
  const runningRef = useRef(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const scannerId = 'qr-scanner-region';
    const html5Qrcode = new Html5Qrcode(scannerId);
    scannerRef.current = html5Qrcode;

    html5Qrcode
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          runningRef.current = false;
          html5Qrcode.stop().catch(() => {});
          onScan(decodedText);
        },
        () => {} // ignore scan failures (no QR in frame)
      )
      .then(() => {
        runningRef.current = true;
      })
      .catch(() => {
        setError(t('verify.cameraPermissionDenied'));
      });

    return () => {
      if (runningRef.current) {
        runningRef.current = false;
        html5Qrcode
          .stop()
          .catch(() => {})
          .finally(() => html5Qrcode.clear());
      } else {
        html5Qrcode.clear();
      }
    };
  }, []);

  const handleClose = () => {
    if (runningRef.current && scannerRef.current) {
      runningRef.current = false;
      scannerRef.current
        .stop()
        .catch(() => {})
        .finally(() => onClose());
    } else {
      onClose();
    }
  };

  return (
    <>
      {/* Fixed close button — always on top, can never be covered */}
      <button
        onClick={handleClose}
        style={{ zIndex: 999999, position: 'fixed', top: 16, right: 16 }}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-red-600 text-white shadow-xl transition-colors"
        aria-label="Close scanner"
      >
        <HiX className="text-2xl" />
      </button>

      {/* Backdrop */}
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200"
        style={{ zIndex: 99999 }}
        onClick={handleClose}
      >
        <div className="relative w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
          {/* Scanner Card */}
          <div className="card-premium p-4 glass overflow-hidden rounded-2xl">
            {/* Header */}
            <p className="text-center text-sm font-medium text-muted-foreground mb-3">
              {t('verify.scanning')}
            </p>

            {/* Camera View */}
            <div
              id="qr-scanner-region"
              className="rounded-xl overflow-hidden bg-black"
            />

            {/* Error */}
            {error && (
              <div className="mt-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-center">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
