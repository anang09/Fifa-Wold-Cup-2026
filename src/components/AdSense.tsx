import { useEffect, useRef } from "react";

/**
 * Komponen Slot Iklan Google AdSense — Trending Global
 * Client ID : ca-pub-1195464297538058
 * Slot utama: 9765631109 ("Fifa world cup 2026")
 *
 * Pemakaian:
 *   <AdSense />                       → memakai slot default 9765631109
 *   <AdSense slot="1234567890" />     → memakai slot lain
 */

const AD_CLIENT = "ca-pub-1195464297538058";
const DEFAULT_SLOT = "9765631109"; // Fifa world cup 2026
const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/** Memuat script AdSense hanya sekali di seluruh halaman */
function loadAdSenseScript() {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = ADSENSE_SRC;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

interface AdSenseProps {
  /** Nomor slot iklan dari AdSense (data-ad-slot). Default: 9765631109 */
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

export default function AdSense({
  slot = DEFAULT_SLOT,
  format = "auto",
  className = "",
  label = "Iklan",
}: AdSenseProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!slot) return;
    loadAdSenseScript();

    const ins = insRef.current;
    // Cegah push ganda (mis. React StrictMode / re-render)
    if (!ins || ins.getAttribute("data-adsbygoogle-status")) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense belum siap / diblokir adblock — abaikan */
    }
  }, [slot]);

  return (
    <div className={`my-6 ${className}`} aria-label="Iklan">
      <p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80868b]">
        {label}
      </p>

      {slot ? (
        // Fifa world cup 2026
        <ins
          ref={insRef}
          key={slot}
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
            Client: <code className="font-mono text-[11px]">{AD_CLIENT}</code>
          </span>
        </div>
      )}
    </div>
  );
}
