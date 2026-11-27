import { useEffect, useRef } from "react";

/**
 * Komponen Slot Iklan Google AdSense — Trending Global
 * Client ID: ca-pub-1195464297538058
 *
 * CARA MENGISI SLOT:
 * 1. Buka https://www.google.com/adsense/new/ → Ads → Ad units → Create ad unit
 * 2. Salin "Data ad slot" (angka, mis. 1234567890)
 * 3. Tempelkan ke prop `slot` di bawah, contoh: <AdSense slot="1234567890" />
 * Jika slot belum diisi, kotak placeholder akan tampil agar layout tetap rapi.
 */

const AD_CLIENT = "ca-pub-1195464297538058";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

interface AdSenseProps {
  /** Nomor slot iklan dari AdSense (data-ad-slot). Kosongkan untuk placeholder. */
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

export default function AdSense({ slot, format = "auto", className = "", label = "Iklan" }: AdSenseProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense belum siap / diblokir — abaikan */
    }
  }, [slot]);

  return (
    <div className={`my-6 ${className}`} aria-label="Iklan">
      <p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80868b]">{label}</p>
      {slot ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex min-h-[90px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#dadce0] bg-white px-4 py-6 text-center">
          <span className="rounded-full bg-[#f1f3f4] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#5f6368]">
            Slot Iklan AdSense
          </span>
          <span className="text-xs text-[#80868b]">
            Client: <code className="font-mono text-[11px]">{AD_CLIENT}</code> — isi nomor slot di <code className="font-mono text-[11px]">src/components/AdSense.tsx</code>
          </span>
        </div>
      )}
    </div>
  );
}
