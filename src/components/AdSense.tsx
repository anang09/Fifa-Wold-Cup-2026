import { useEffect, useRef } from "react";

const AD_CLIENT = "ca-pub-1195464297538058";
const DEFAULT_AD_SLOT = "9765631109";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

interface AdSenseProps {
  /** Nomor slot AdSense. Jika tidak diisi, gunakan slot bawaan. */
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

export default function AdSense({
  slot = DEFAULT_AD_SLOT,
  format = "auto",
  className = "",
  label = "Iklan",
}: AdSenseProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;

    // Siapkan antrean sebelum script AdSense selesai dimuat.
    const adsQueue = (window.adsbygoogle = window.adsbygoogle || []);

    // Muat script AdSense satu kali saja.
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    try {
      adsQueue.push({});
      pushed.current = true;
    } catch {
      // Abaikan jika AdSense belum siap atau diblokir.
    }
  }, [slot]);

  return (
    <div className={`my-6 ${className}`} aria-label={label}>
      <p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80868b]">
        {label}
      </p>

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
            Client: <code className="font-mono text-[11px]">{AD_CLIENT}</code>
          </span>
        </div>
      )}
    </div>
  );
}
```
