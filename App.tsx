import { useEffect, useMemo, useRef, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Search, TrendingUp, Globe2, Newspaper, Trophy, MapPin, CalendarDays, Clock,
  ChevronDown, ArrowUpRight, ArrowDownRight, Flame, Users, Ticket, Tv, Shield,
  Sparkles, Menu, X, Share2, Bookmark, ChevronRight, CircleDot, BarChart3,
  Timer, Landmark, Zap, Eye, ArrowRight, Star, Target, Info,
} from "lucide-react";
import { interestData, countries, trends, news, groups, stadiums, tickerItems, HERO_IMG, type RangeKey } from "./data";
import AdSense from "./components/AdSense";

/* ---------- helpers ---------- */
function useCountdown() {
  const target = new Date("2026-06-11T19:00:00Z").getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function Sparkline({ data, color = "#1a73e8" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 96, h = 28, pad = 3;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.split(" ").pop()?.split(",")[0]} cy={pts.split(" ").pop()?.split(",")[1]} r="3" fill={color} />
    </svg>
  );
}

const rangeLabels: Record<RangeKey, string> = { "7d": "7 hari", "30d": "30 hari", "12m": "12 bulan", "5y": "5 tahun" };

const NAV = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "minat", label: "Minat Pencarian" },
  { id: "negara", label: "Berdasarkan Negara" },
  { id: "tren", label: "Pencarian Trending" },
  { id: "berita", label: "Berita" },
  { id: "grup", label: "Grup & Tim" },
  { id: "stadion", label: "Stadion" },
];

export default function App() {
  const cd = useCountdown();
  const [range, setRange] = useState<RangeKey>("12m");
  const [showTiket, setShowTiket] = useState(true);
  const [showJadwal, setShowJadwal] = useState(true);
  const [region, setRegion] = useState("Semua");
  const [trendQuery, setTrendQuery] = useState("");
  const [trendCat, setTrendCat] = useState("Semua");
  const [expandedTrend, setExpandedTrend] = useState<number | null>(1);
  const [newsCat, setNewsCat] = useState("Semua");
  const [activeGroup, setActiveGroup] = useState("A");
  const [teamSearch, setTeamSearch] = useState("");
  const [stadiumCountry, setStadiumCountry] = useState("Semua");
  const [mobileNav, setMobileNav] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [headerQuery, setHeaderQuery] = useState("");
  const [activeNav, setActiveNav] = useState("ringkasan");
  const trenRef = useRef<HTMLDivElement>(null);

  const chartData = interestData[range];
  const filteredCountries = useMemo(
    () => (region === "Semua" ? countries : countries.filter((c) => c.region === region)),
    [region]
  );
  const trendCats = ["Semua", ...Array.from(new Set(trends.map((t) => t.category)))];
  const filteredTrends = useMemo(
    () =>
      trends.filter(
        (t) =>
          (trendCat === "Semua" || t.category === trendCat) &&
          t.query.toLowerCase().includes(trendQuery.toLowerCase())
      ),
    [trendQuery, trendCat]
  );
  const newsCats = ["Semua", ...Array.from(new Set(news.map((n) => n.category)))];
  const filteredNews = useMemo(
    () => news.filter((n) => newsCat === "Semua" || n.category === newsCat),
    [newsCat]
  );
  const featured = news.find((n) => n.featured)!;
  const restNews = filteredNews.filter((n) => n.id !== featured.id || newsCat !== "Semua");
  const currentGroup = groups.find((g) => g.id === activeGroup)!;
  const filteredStadiums = useMemo(
    () => (stadiumCountry === "Semua" ? stadiums : stadiums.filter((s) => s.country === stadiumCountry)),
    [stadiumCountry]
  );

  // scroll spy
  useEffect(() => {
    const onScroll = () => {
      for (const item of [...NAV].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 160) { setActiveNav(item.id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNav(false);
  };

  const submitHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTrendQuery(headerQuery);
    trenRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSave = (id: number) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#202124]">
      {/* ===== TOP BAR (Google Trends style) ===== */}
      <header className="sticky top-0 z-50 border-b border-[#dadce0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#dadce0]">
              <span className="grid grid-cols-2 gap-[3px]">
                <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
                <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
                <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
                <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              </span>
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[17px] font-semibold tracking-tight text-[#202124]">Trending Global</span>
              <span className="block text-[11px] font-medium text-[#5f6368]">Berita & Tren Piala Dunia 2026</span>
            </span>
          </button>

          <form onSubmit={submitHeaderSearch} className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2 shadow-sm transition focus-within:border-[#1a73e8] focus-within:ring-2 focus-within:ring-[#1a73e8]/20">
            <Search className="h-4 w-4 shrink-0 text-[#5f6368]" />
            <input
              value={headerQuery}
              onChange={(e) => setHeaderQuery(e.target.value)}
              placeholder="Cari tren: jadwal, tiket, tim, pemain…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#80868b]"
            />
            <button type="submit" className="shrink-0 rounded-full bg-[#1a73e8] px-3 py-1 text-xs font-semibold text-white hover:bg-[#1765cc]">Cari</button>
          </form>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <span className="rounded-full border border-[#dadce0] px-3 py-1.5 text-xs font-semibold text-[#5f6368]">Bahasa: Indonesia</span>
            <span className="flex items-center gap-1.5 rounded-full bg-[#e8f0fe] px-3 py-1.5 text-xs font-semibold text-[#1a73e8]">
              <span className="pulse-dot h-2 w-2 rounded-full bg-[#1a73e8]" /> Live
            </span>
          </div>
          <button className="rounded-full p-2 hover:bg-[#f1f3f4] md:hidden" onClick={() => setMobileNav(!mobileNav)}>
            {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* nav tabs */}
        <nav className="hidden border-t border-[#f1f3f4] md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-6">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`relative whitespace-nowrap px-4 py-2.5 text-[13px] font-medium transition ${activeNav === n.id ? "text-[#1a73e8]" : "text-[#5f6368] hover:text-[#202124]"}`}
              >
                {n.label}
                {activeNav === n.id && <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-[#1a73e8]" />}
              </button>
            ))}
            <span className="ml-auto hidden items-center gap-1.5 py-2 text-xs text-[#80868b] lg:flex">
              <Clock className="h-3.5 w-3.5" /> Diperbarui hari ini · Sumber: Trending Global, FIFA
            </span>
          </div>
        </nav>
        {mobileNav && (
          <div className="border-t border-[#f1f3f4] bg-white px-4 py-2 md:hidden">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ===== TICKER ===== */}
      <div className="overflow-hidden bg-[#202124] text-white">
        <div className="animate-marquee flex w-max items-center gap-10 py-2 pl-4 text-[12px] font-medium">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap">
              <Zap className="h-3.5 w-3.5 text-[#FBBC05]" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section id="ringkasan" className="relative overflow-hidden bg-[#0b1e3a] text-white">
        <img src={HERO_IMG} alt="Stadion Piala Dunia" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1e3a] via-[#0b1e3a]/80 to-[#0b1e3a]/30" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
              <Trophy className="h-3.5 w-3.5 text-[#FBBC05]" /> FIFA World Cup 2026™
            </span>
            <span className="rounded-full bg-[#EA4335] px-3 py-1 text-xs font-bold uppercase tracking-wide">Trending #1 Global</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20 backdrop-blur">AS · Meksiko · Kanada</span>
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            FIFA World Cup 2026™
            <span className="mt-2 block text-xl font-semibold text-white/80 sm:text-2xl">Lihat bagaimana dunia mencari turnamen ini</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75">
            Piala Dunia FIFA 2026™ dimulai pada <strong className="text-white">11 Juni 2026</strong>, dengan pertandingan berlangsung di
            <strong className="text-white"> Amerika Serikat, Meksiko, dan Kanada</strong>. Ini adalah edisi terbesar dalam sejarah:
            48 tim, 104 pertandingan, dan 16 kota tuan rumah. Berikut data pencarian, berita, dan panduan lengkapnya.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => scrollTo("tren")} className="flex items-center gap-2 rounded-full bg-[#1a73e8] px-5 py-3 text-sm font-bold shadow-lg shadow-[#1a73e8]/30 transition hover:bg-[#1765cc]">
              <TrendingUp className="h-4 w-4" /> Lihat Pencarian Trending
            </button>
            <button onClick={() => scrollTo("berita")} className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#202124] transition hover:bg-[#f1f3f4]">
              <Newspaper className="h-4 w-4" /> Baca Berita Terkini
            </button>
          </div>

          {/* countdown + stats */}
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm font-bold"><Timer className="h-4 w-4 text-[#FBBC05]" /> Hitung Mundur Kick-off</p>
                <span className="text-xs text-white/60">11 Juni 2026 · 19.00 WIB</span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2.5">
                {[
                  { v: cd.d, l: "Hari" },
                  { v: cd.h, l: "Jam" },
                  { v: cd.m, l: "Menit" },
                  { v: cd.s, l: "Detik" },
                ].map((u) => (
                  <div key={u.l} className="rounded-xl bg-white/10 py-3 text-center ring-1 ring-white/10">
                    <div className="text-2xl font-black tabular-nums sm:text-3xl">{String(u.v).padStart(2, "0")}</div>
                    <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">{u.l}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-white/65">
                <MapPin className="h-3.5 w-3.5" /> Laga pembuka: Estadio Azteca, Kota Meksiko · Final: MetLife Stadium, 19 Juli 2026
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: Users, v: "48", l: "Tim Nasional", c: "text-[#4285F4]" },
                { icon: CalendarDays, v: "104", l: "Pertandingan", c: "text-[#EA4335]" },
                { icon: MapPin, v: "16", l: "Kota Tuan Rumah", c: "text-[#FBBC05]" },
                { icon: Globe2, v: "3", l: "Negara Tuan Rumah", c: "text-[#34A853]" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col justify-center rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-md">
                  <s.icon className={`h-5 w-5 ${s.c}`} />
                  <div className="mt-2 text-2xl font-black">{s.v}</div>
                  <div className="text-xs font-medium text-white/65">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Slot Iklan AdSense — Leaderboard di bawah hero */}
        <AdSense />

        {/* ===== INTEREST OVER TIME ===== */}
        <section id="minat" className="scroll-mt-32 py-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a73e8]"><BarChart3 className="h-4 w-4" /> Minat Pencarian</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Minat pencarian dari waktu ke waktu</h2>
              <p className="mt-1 max-w-2xl text-sm text-[#5f6368]">Perbandingan istilah pencarian terkait Piala Dunia 2026™ di seluruh dunia. Angka 100 mewakili puncak popularitas.</p>
            </div>
            <div className="flex rounded-full border border-[#dadce0] bg-white p-1">
              {(Object.keys(rangeLabels) as RangeKey[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${range === r ? "bg-[#1a73e8] text-white shadow" : "text-[#5f6368] hover:text-[#202124]"}`}
                >
                  {rangeLabels[r]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#dadce0] bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-full bg-[#e8f0fe] px-3.5 py-1.5 text-xs font-bold text-[#1a73e8] ring-1 ring-[#1a73e8]/30">
                <CircleDot className="h-3.5 w-3.5" /> Piala Dunia 2026
              </button>
              <button onClick={() => setShowTiket(!showTiket)} className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ring-1 transition ${showTiket ? "bg-[#fce8e6] text-[#d93025] ring-[#d93025]/30" : "bg-white text-[#80868b] ring-[#dadce0]"}`}>
                <Ticket className="h-3.5 w-3.5" /> Tiket {showTiket ? "Aktif" : "Nonaktif"}
              </button>
              <button onClick={() => setShowJadwal(!showJadwal)} className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ring-1 transition ${showJadwal ? "bg-[#fef7e0] text-[#b06000] ring-[#f9ab00]/40" : "bg-white text-[#80868b] ring-[#dadce0]"}`}>
                <CalendarDays className="h-3.5 w-3.5" /> Jadwal {showJadwal ? "Aktif" : "Nonaktif"}
              </button>
              <span className="ml-auto hidden items-center gap-1.5 text-xs text-[#80868b] sm:flex"><Eye className="h-3.5 w-3.5" /> Data: Trending Global · Seluruh dunia</span>
            </div>

            <div className="mt-4 h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a73e8" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#1a73e8" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d93025" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#d93025" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f9ab00" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#f9ab00" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#5f6368" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#5f6368" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #dadce0", fontSize: 13, boxShadow: "0 8px 24px rgba(0,0,0,.12)" }}
                    formatter={(v) => [`${v ?? ""}`, ""]}
                  />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                  <Area type="monotone" dataKey="pialaDunia" name="Piala Dunia 2026" stroke="#1a73e8" strokeWidth={2.5} fill="url(#g1)" />
                  {showTiket && <Area type="monotone" dataKey="tiket" name="Tiket" stroke="#d93025" strokeWidth={2.5} fill="url(#g2)" />}
                  {showJadwal && <Area type="monotone" dataKey="jadwal" name="Jadwal" stroke="#f9ab00" strokeWidth={2.5} fill="url(#g3)" />}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid gap-3 border-t border-[#f1f3f4] pt-4 sm:grid-cols-3">
              <div className="rounded-xl bg-[#f8f9fa] p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-bold text-[#1a73e8]"><Flame className="h-3.5 w-3.5" /> Puncak Minat</p>
                <p className="mt-1 text-sm font-semibold">Mei 2026 — skor 100</p>
                <p className="text-xs text-[#5f6368]">Mendekati kick-off, pencarian melonjak tajam.</p>
              </div>
              <div className="rounded-xl bg-[#f8f9fa] p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-bold text-[#d93025]"><Ticket className="h-3.5 w-3.5" /> Lonjakan Tiket</p>
                <p className="mt-1 text-sm font-semibold">+86% dalam 12 bulan</p>
                <p className="text-xs text-[#5f6368]">Didorong penjualan tiket gelombang kedua FIFA.</p>
              </div>
              <div className="rounded-xl bg-[#f8f9fa] p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-bold text-[#b06000]"><CalendarDays className="h-3.5 w-3.5" /> Lonjakan Jadwal</p>
                <p className="mt-1 text-sm font-semibold">+78% setelah rilis jadwal</p>
                <p className="text-xs text-[#5f6368]">FIFA merilis jadwal resmi babak grup.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BY COUNTRY ===== */}
        <section id="negara" className="scroll-mt-32 py-6">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a73e8]"><Globe2 className="h-4 w-4" /> Minat Berdasarkan Negara</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Negara dengan minat pencarian tertinggi</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#5f6368]">Meksiko dan Amerika Serikat — dua negara tuan rumah — memimpin pencarian global, diikuti Brasil dan Argentina.</p>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
            {/* podium */}
            <div className="flex flex-col gap-3">
              {countries.slice(0, 3).map((c, i) => (
                <div key={c.code} className={`relative overflow-hidden rounded-2xl p-5 text-white ${i === 0 ? "bg-[#1a73e8]" : i === 1 ? "bg-[#202124]" : "bg-[#5f6368]"}`}>
                  <span className="absolute -right-2 -top-4 text-7xl font-black text-white/10">{i + 1}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm font-black ring-1 ring-white/30">{c.code}</span>
                    <div>
                      <p className="text-lg font-black leading-tight">{c.name}</p>
                      <p className="text-xs text-white/70">{c.region} · {c.searches} pencarian</p>
                    </div>
                    <span className="ml-auto flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold">
                      <ArrowUpRight className="h-3.5 w-3.5" /> +{c.change}%
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full rounded-full bg-white" style={{ width: `${c.score}%` }} />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-white/80">Skor minat: {c.score}/100</p>
                </div>
              ))}
              <div className="rounded-2xl border border-[#dadce0] bg-white p-5">
                <p className="flex items-center gap-2 text-sm font-bold"><Sparkles className="h-4 w-4 text-[#f9ab00]" /> Fakta Menarik</p>
                <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-[#3c4043]">
                  <li className="flex gap-2"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#1a73e8]" /> Indonesia naik <strong>+22%</strong> — pertumbuhan tercepat di Asia Tenggara.</li>
                  <li className="flex gap-2"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#1a73e8]" /> Kanada naik <strong>+18%</strong> seiring persiapan Toronto & Vancouver.</li>
                  <li className="flex gap-2"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#1a73e8]" /> Inggris mencari perayaan <strong>60 tahun gelar 1966</strong>.</li>
                </ul>
              </div>
            </div>

            {/* ranking list */}
            <div className="rounded-2xl border border-[#dadce0] bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                {["Semua", "Amerika", "Eropa", "Asia", "Afrika"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${region === r ? "bg-[#202124] text-white" : "border border-[#dadce0] text-[#5f6368] hover:border-[#202124] hover:text-[#202124]"}`}
                  >
                    {r}
                  </button>
                ))}
                <span className="ml-auto text-xs text-[#80868b]">{filteredCountries.length} negara</span>
              </div>
              <div className="mt-4 divide-y divide-[#f1f3f4]">
                {filteredCountries.map((c) => (
                  <div key={c.code} className="group flex items-center gap-3 py-3 transition hover:bg-[#f8f9fa] sm:px-2 sm:rounded-lg">
                    <span className="w-6 text-center text-sm font-black text-[#80868b]">{c.rank}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f0fe] text-[11px] font-black text-[#1a73e8]">{c.code}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold">{c.name}</p>
                        <span className="hidden rounded-full bg-[#f1f3f4] px-2 py-0.5 text-[10px] font-semibold text-[#5f6368] sm:inline">{c.region}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e8eaed]">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285F4] transition-all duration-700" style={{ width: `${c.score}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">{c.score}</p>
                      <p className={`flex items-center justify-end gap-0.5 text-[11px] font-bold ${c.change >= 0 ? "text-[#188038]" : "text-[#d93025]"}`}>
                        {c.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} {Math.abs(c.change)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slot Iklan AdSense — antara Negara & Trending */}
        <AdSense />

        {/* ===== TRENDING SEARCHES ===== */}
        <section id="tren" ref={trenRef} className="scroll-mt-32 py-10">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d93025]"><Flame className="h-4 w-4" /> Pencarian yang Sedang Tren</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Pencarian trending Piala Dunia 2026™</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#5f6368]">Kueri yang paling cepat naik popularitasnya dalam 24 jam terakhir di Indonesia dan dunia.</p>

          <div className="mt-5 rounded-2xl border border-[#dadce0] bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#f1f3f4] p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-[#dadce0] px-4 py-2.5">
                <Search className="h-4 w-4 text-[#80868b]" />
                <input value={trendQuery} onChange={(e) => setTrendQuery(e.target.value)} placeholder="Saring pencarian trending…" className="w-full bg-transparent text-sm outline-none placeholder:text-[#80868b]" />
                {trendQuery && <button onClick={() => setTrendQuery("")}><X className="h-4 w-4 text-[#80868b]" /></button>}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {trendCats.map((c) => (
                  <button key={c} onClick={() => setTrendCat(c)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${trendCat === c ? "bg-[#1a73e8] text-white" : "bg-[#f1f3f4] text-[#5f6368] hover:bg-[#e8eaed]"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden grid-cols-[3rem_1fr_7rem_6rem_7rem_2rem] gap-3 border-b border-[#f1f3f4] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#80868b] md:grid">
              <span>#</span><span>Pencarian</span><span>Grafik</span><span>Volume</span><span>Pertumbuhan</span><span />
            </div>

            <div className="divide-y divide-[#f1f3f4]">
              {filteredTrends.length === 0 && (
                <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
                  <Search className="h-8 w-8 text-[#dadce0]" />
                  <p className="text-sm font-semibold text-[#5f6368]">Tidak ada hasil untuk “{trendQuery}”</p>
                  <button onClick={() => { setTrendQuery(""); setTrendCat("Semua"); }} className="text-sm font-bold text-[#1a73e8]">Reset filter</button>
                </div>
              )}
              {filteredTrends.map((t) => (
                <div key={t.rank}>
                  <button
                    onClick={() => setExpandedTrend(expandedTrend === t.rank ? null : t.rank)}
                    className="grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[#f8f9fa] sm:px-5 md:grid-cols-[3rem_1fr_7rem_6rem_7rem_2rem]"
                  >
                    <span className="text-sm font-black text-[#80868b]">{t.rank}</span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-[#202124]">{t.query}</span>
                        {t.breakout && <span className="rounded-full bg-[#d93025] px-2 py-0.5 text-[10px] font-black uppercase text-white">Breakout</span>}
                        <span className="rounded-full bg-[#f1f3f4] px-2 py-0.5 text-[10px] font-semibold text-[#5f6368]">{t.category}</span>
                      </span>
                    </span>
                    <span className="hidden md:block"><Sparkline data={t.spark} color={t.growth > 150 ? "#d93025" : "#1a73e8"} /></span>
                    <span className="hidden text-sm font-semibold text-[#3c4043] md:block">{t.volume}</span>
                    <span className={`hidden items-center gap-1 text-sm font-black md:flex ${t.growth > 100 ? "text-[#d93025]" : "text-[#188038]"}`}>
                      <TrendingUp className="h-4 w-4" /> +{t.growth}%
                    </span>
                    <ChevronDown className={`h-4 w-4 justify-self-end text-[#80868b] transition ${expandedTrend === t.rank ? "rotate-180" : ""}`} />
                  </button>
                  {expandedTrend === t.rank && (
                    <div className="fade-up border-t border-dashed border-[#e8eaed] bg-[#f8f9fa] px-5 py-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#80868b]">Pencarian terkait</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {t.related.map((r) => (
                          <button key={r} onClick={() => setTrendQuery(r.split(" ").slice(0, 3).join(" "))} className="flex items-center gap-1.5 rounded-full border border-[#dadce0] bg-white px-3 py-1.5 text-xs font-semibold text-[#3c4043] transition hover:border-[#1a73e8] hover:text-[#1a73e8]">
                            <Search className="h-3 w-3" /> {r}
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-[#80868b]">Volume pencarian 24 jam: <strong className="text-[#202124]">{t.volume}</strong> · Pertumbuhan <strong className="text-[#d93025]">+{t.growth}%</strong> vs periode sebelumnya.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== NEWS ===== */}
        <section id="berita" className="scroll-mt-32 py-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a73e8]"><Newspaper className="h-4 w-4" /> Berita Terkini</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Kabar terbaru Piala Dunia 2026™</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {newsCats.map((c) => (
                <button key={c} onClick={() => setNewsCat(c)} className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${newsCat === c ? "bg-[#202124] text-white" : "border border-[#dadce0] bg-white text-[#5f6368] hover:border-[#202124]"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* featured */}
          {newsCat === "Semua" && (
            <article className="group mt-5 grid overflow-hidden rounded-2xl border border-[#dadce0] bg-white shadow-sm lg:grid-cols-2">
              <div className="relative min-h-[260px] overflow-hidden">
                <img src={featured.img} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-[#d93025] px-3 py-1 text-xs font-black uppercase text-white">Berita Utama</span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#80868b]">
                  <span className="text-[#1a73e8]">{featured.category}</span><span>·</span><span>{featured.time}</span><span>·</span><span>{featured.read}</span>
                </div>
                <h3 className="mt-3 text-2xl font-black leading-snug tracking-tight transition group-hover:text-[#1a73e8] sm:text-[28px]">{featured.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5f6368]">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3">
                  <button className="flex items-center gap-2 rounded-full bg-[#1a73e8] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1765cc]">Baca Selengkapnya <ArrowRight className="h-4 w-4" /></button>
                  <button onClick={() => toggleSave(featured.id)} className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-bold transition ${saved.has(featured.id) ? "border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8]" : "border-[#dadce0] text-[#5f6368] hover:border-[#1a73e8]"}`}>
                    <Bookmark className={`h-4 w-4 ${saved.has(featured.id) ? "fill-[#1a73e8]" : ""}`} /> {saved.has(featured.id) ? "Tersimpan" : "Simpan"}
                  </button>
                  <button className="rounded-full border border-[#dadce0] p-2.5 text-[#5f6368] hover:border-[#1a73e8] hover:text-[#1a73e8]"><Share2 className="h-4 w-4" /></button>
                </div>
                <p className="mt-4 text-xs text-[#80868b]">Sumber: {featured.source}</p>
              </div>
            </article>
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restNews.map((n) => (
              <article key={n.id} className="group flex flex-col overflow-hidden rounded-2xl border border-[#dadce0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                  <img src={n.img} alt={n.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-black text-[#202124]">{n.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#80868b]">
                    <span>{n.time}</span><span>·</span><span>{n.read}</span>
                  </div>
                  <h3 className="mt-2 line-clamp-3 text-[15px] font-bold leading-snug transition group-hover:text-[#1a73e8]">{n.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-[#5f6368]">{n.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#f1f3f4] pt-3">
                    <span className="text-[11px] font-semibold text-[#80868b]">{n.source}</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => toggleSave(n.id)} className={`rounded-full p-1.5 transition ${saved.has(n.id) ? "bg-[#e8f0fe] text-[#1a73e8]" : "text-[#80868b] hover:bg-[#f1f3f4]"}`}>
                        <Bookmark className={`h-4 w-4 ${saved.has(n.id) ? "fill-[#1a73e8]" : ""}`} />
                      </button>
                      <button className="rounded-full p-1.5 text-[#80868b] hover:bg-[#f1f3f4]"><Share2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {restNews.length === 0 && <p className="mt-6 rounded-2xl border border-dashed border-[#dadce0] bg-white py-10 text-center text-sm text-[#5f6368]">Tidak ada berita pada kategori ini.</p>}
        </section>

        {/* Slot Iklan AdSense — antara Berita & Grup */}
        <AdSense />

        {/* ===== GROUPS & TEAMS ===== */}
        <section id="grup" className="scroll-mt-32 py-10">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#188038]"><Shield className="h-4 w-4" /> Grup & Tim</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Jelajahi 12 grup & 48 tim peserta</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#5f6368]">Pilih grup untuk melihat tim, peringkat FIFA, bintang utama, dan pelatih. Dua peringkat teratas tiap grup lolos ke babak 32 besar.</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2.5">
              <Search className="h-4 w-4 text-[#80868b]" />
              <input value={teamSearch} onChange={(e) => setTeamSearch(e.target.value)} placeholder="Cari tim… mis. Argentina, Jepang, Indonesia" className="w-full bg-transparent text-sm outline-none placeholder:text-[#80868b]" />
            </div>
            <p className="text-xs text-[#80868b]">Klik tab grup di bawah untuk berpindah</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                className={`h-11 w-11 rounded-xl text-sm font-black transition ${activeGroup === g.id ? "bg-[#188038] text-white shadow-md shadow-[#188038]/25" : "border border-[#dadce0] bg-white text-[#5f6368] hover:border-[#188038] hover:text-[#188038]"}`}
              >
                {g.id}
              </button>
            ))}
          </div>

          <div className="fade-up mt-4 rounded-2xl border border-[#dadce0] bg-white p-5 shadow-sm sm:p-6" key={activeGroup}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#188038] text-xl font-black text-white">{activeGroup}</span>
              <div>
                <h3 className="text-xl font-black">Grup {activeGroup}</h3>
                <p className="text-sm text-[#5f6368]">{currentGroup.note}</p>
              </div>
              <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-[#e6f4ea] px-3 py-1.5 text-xs font-bold text-[#188038] sm:flex"><Target className="h-3.5 w-3.5" /> 2 teratas lolos · 8 peringkat 3 terbaik juga lolos</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {currentGroup.teams
                .filter((t) => t.name.toLowerCase().includes(teamSearch.toLowerCase()))
                .map((t) => (
                  <div key={t.code + t.name} className="group rounded-2xl border border-[#e8eaed] bg-[#f8f9fa] p-4 transition hover:border-[#188038]/40 hover:bg-white hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#188038] ring-1 ring-[#dadce0]">{t.code}</span>
                      <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-[#5f6368] ring-1 ring-[#e8eaed]">#{t.ranking || "—"} FIFA</span>
                    </div>
                    <p className="mt-3 text-[15px] font-black leading-tight">{t.name}</p>
                    <p className="text-xs font-semibold text-[#80868b]">{t.confed} · {t.titles > 0 ? `${t.titles}× Juara Dunia` : "Belum pernah juara"}</p>
                    <div className="mt-3 space-y-1.5 border-t border-[#e8eaed] pt-3 text-xs text-[#3c4043]">
                      <p className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-[#f9ab00]" /> <span><strong>Bintang:</strong> {t.star}</span></p>
                      <p className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#1a73e8]" /> <span><strong>Pelatih:</strong> {t.coach}</span></p>
                    </div>
                  </div>
                ))}
            </div>
            {currentGroup.teams.filter((t) => t.name.toLowerCase().includes(teamSearch.toLowerCase())).length === 0 && (
              <p className="py-8 text-center text-sm text-[#5f6368]">Tim “{teamSearch}” tidak ada di Grup {activeGroup}. Coba grup lain.</p>
            )}
          </div>

          {/* England spotlight like original page */}
          <div className="mt-4 grid gap-4 overflow-hidden rounded-2xl bg-[#202124] text-white lg:grid-cols-[1.3fr_1fr]">
            <div className="p-6 sm:p-8">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold ring-1 ring-white/20">Sorotan Tim</span>
              <h3 className="mt-3 text-2xl font-black leading-snug">Tim Nasional Inggris: 60 Tahun Menanti Gelar Kedua</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Pada 2026, timnas Inggris menandai <strong className="text-white">60 tahun</strong> sejak satu-satunya kemenangan Piala Dunia mereka
                pada 1966 di Wembley. Di bawah pelatih Thomas Tuchel dan kapten Jude Bellingham, Inggris datang dengan skuad termuda dan
                paling mahal di turnamen ini. Pencarian terkait Inggris naik <strong className="text-white">210%</strong> minggu ini.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Jude Bellingham", "Bukayo Saka", "Cole Palmer", "Declan Rice", "Harry Kane"].map((p) => (
                  <span key={p} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/15">{p}</span>
                ))}
              </div>
              <button onClick={() => setActiveGroup("I")} className="mt-6 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#202124] hover:bg-[#f1f3f4]">
                Lihat Grup I <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative min-h-[220px]">
              <img src="https://images.pexels.com/photos/16651653/pexels-photo-16651653.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Tim merayakan gol" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#202124] via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        </section>

        {/* ===== STADIUMS ===== */}
        <section id="stadion" className="scroll-mt-32 py-6">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#b06000]"><Landmark className="h-4 w-4" /> Stadion & Kota Tuan Rumah</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">16 stadion di 3 negara tuan rumah</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#5f6368]">Dari Estadio Azteca yang legendaris hingga MetLife Stadium tempat final digelar.</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {["Semua", "Amerika Serikat", "Meksiko", "Kanada"].map((c) => (
              <button key={c} onClick={() => setStadiumCountry(c)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${stadiumCountry === c ? "bg-[#b06000] text-white" : "border border-[#dadce0] bg-white text-[#5f6368] hover:border-[#b06000] hover:text-[#b06000]"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filteredStadiums.map((s) => (
              <div key={s.city} className="group rounded-2xl border border-[#dadce0] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[15px] font-black leading-tight">{s.city}</p>
                    <p className="mt-0.5 text-xs font-semibold text-[#80868b]">{s.country}</p>
                  </div>
                  <span className="rounded-full bg-[#fef7e0] px-2.5 py-1 text-[10px] font-black text-[#b06000]">{s.highlight}</span>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-[#202124]"><Landmark className="h-4 w-4 text-[#1a73e8]" /> {s.stadium}</p>
                <div className="mt-3 flex items-center gap-4 border-t border-[#f1f3f4] pt-3 text-xs text-[#5f6368]">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {s.capacity}</span>
                  <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {s.matches}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FACTS / TIMELINE ===== */}
        <section className="py-10">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl border border-[#dadce0] bg-white p-6 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a73e8]"><Info className="h-4 w-4" /> Fakta Singkat</p>
              <h3 className="mt-1 text-xl font-black">Mengapa 2026 bersejarah?</h3>
              <ul className="mt-4 space-y-3.5">
                {[
                  { t: "Edisi pertama 48 tim", d: "12 grup berisi 4 tim, dengan babak 32 besar — total 104 pertandingan dalam 39 hari." },
                  { t: "Tiga negara tuan rumah", d: "Amerika Serikat (11 kota), Meksiko (3 kota), dan Kanada (2 kota) berbagi penyelenggaraan." },
                  { t: "Final di New York/New Jersey", d: "MetLife Stadium akan menjadi panggung penentuan juara pada 19 Juli 2026." },
                  { t: "Piala Dunia ke-23", d: "Sejak 1930, turnamen ini telah digelar di 4 benua — 2026 menjadi yang pertama di Amerika Utara sejak 1994." },
                ].map((f) => (
                  <li key={f.t} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f0fe]"><ChevronRight className="h-4 w-4 text-[#1a73e8]" /></span>
                    <div>
                      <p className="text-sm font-bold">{f.t}</p>
                      <p className="text-[13px] leading-relaxed text-[#5f6368]">{f.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#0b1e3a] p-6 text-white shadow-sm sm:p-7">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FBBC05]"><Clock className="h-4 w-4" /> Linimasa Menuju Kick-off</p>
              <h3 className="mt-1 text-xl font-black">Perjalanan menuju 11 Juni 2026</h3>
              <div className="relative mt-6 space-y-5 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-white/15">
                {[
                  { date: "Des 2025", title: "Undian babak grup", desc: "48 tim dibagi ke 12 grup di Washington D.C." },
                  { date: "Jan 2026", title: "Penjualan tiket gelombang kedua", desc: "FIFA membuka kategori suporter dan hospitality." },
                  { date: "Mar 2026", title: "Play-off terakhir", desc: "6 slot terakhir ditentukan lewat play-off antar-konfederasi." },
                  { date: "Mei 2026", title: "Pengumuman skuad final", desc: "26 pemain per tim diumumkan pelatih masing-masing negara." },
                  { date: "11 Jun 2026", title: "Kick-off Piala Dunia", desc: "Meksiko vs lawan Grup A di Estadio Azteca, Kota Meksiko." },
                  { date: "19 Jul 2026", title: "Final", desc: "MetLife Stadium, New York/New Jersey — penentuan juara dunia." },
                ].map((e, i) => (
                  <div key={e.title} className="relative flex gap-4 pl-1">
                    <span className={`relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full ring-4 ring-[#0b1e3a] ${i === 4 ? "bg-[#EA4335]" : i === 5 ? "bg-[#FBBC05]" : "bg-[#4285F4]"}`} />
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase tracking-wider text-white/50">{e.date}</p>
                      <p className="text-sm font-bold">{e.title}</p>
                      <p className="text-[13px] text-white/65">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slot Iklan AdSense — di atas CTA */}
        <AdSense />

        {/* ===== CTA ===== */}
        <section className="pb-14">
          <div className="relative overflow-hidden rounded-3xl bg-[#1a73e8] px-6 py-10 text-center text-white sm:px-10">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold ring-1 ring-white/25"><Tv className="h-4 w-4" /> Jangan Lewatkan</span>
              <h3 className="mx-auto mt-4 max-w-2xl text-2xl font-black leading-snug sm:text-3xl">Dapatkan kabar Piala Dunia 2026 langsung di kotak masuk Anda</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/75">Ringkasan tren pencarian, jadwal, dan berita terpenting setiap minggu — gratis, tanpa spam.</p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Terima kasih! Anda telah berlangganan kabar Piala Dunia 2026."); }} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
                <input required type="email" placeholder="Alamat email Anda" className="flex-1 rounded-full border-0 px-5 py-3 text-sm text-[#202124] outline-none ring-white/40 focus:ring-4" />
                <button className="rounded-full bg-[#202124] px-6 py-3 text-sm font-bold text-white transition hover:bg-black">Berlangganan</button>
              </form>
              <p className="mt-3 text-[11px] text-white/60">Dengan berlangganan, Anda menyetujui kebijakan privasi kami.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#dadce0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="grid grid-cols-2 gap-[3px]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#4285F4]" /><span className="h-2.5 w-2.5 rounded-full bg-[#EA4335]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FBBC05]" /><span className="h-2.5 w-2.5 rounded-full bg-[#34A853]" />
                </span>
                <span className="text-lg font-bold">Trending Global — Piala Dunia 2026</span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5f6368]">
                Trending Global — halaman berita interaktif tentang bagaimana dunia mencari FIFA World Cup 2026™ —
                minat pencarian, negara teratas, pencarian trending, berita, grup, tim, dan stadion tuan rumah.
              </p>
              <div className="mt-4 flex gap-2">
                {["FIFA", "Trending Global", "Reuters", "Vidio"].map((s) => (
                  <span key={s} className="rounded-full bg-[#f1f3f4] px-3 py-1 text-xs font-semibold text-[#5f6368]">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-black">Navigasi</p>
              <ul className="mt-3 space-y-2 text-sm text-[#5f6368]">
                {NAV.map((n) => (
                  <li key={n.id}><button onClick={() => scrollTo(n.id)} className="hover:text-[#1a73e8]">{n.label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-black">Tentang Turnamen</p>
              <ul className="mt-3 space-y-2 text-sm text-[#5f6368]">
                <li>11 Juni – 19 Juli 2026</li>
                <li>48 tim · 104 pertandingan</li>
                <li>16 kota · 3 negara</li>
                <li>Final: MetLife Stadium</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#f1f3f4] pt-6 text-xs text-[#80868b] sm:flex-row">
            <p>© 2026 Trending Global. Data ilustratif berdasarkan tren pencarian publik. FIFA World Cup 2026™ adalah merek dagang FIFA.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-1 font-bold text-[#1a73e8] hover:underline">
              Kembali ke atas <ArrowUpRight className="h-3.5 w-3.5 -rotate-45" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
