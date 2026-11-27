export const HERO_IMG =
  "https://images.pexels.com/photos/38546953/pexels-photo-38546953.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

export type RangeKey = "7d" | "30d" | "12m" | "5y";

export const interestData: Record<RangeKey, { label: string; pialaDunia: number; tiket: number; jadwal: number }[]> = {
  "7d": [
    { label: "Sen", pialaDunia: 62, tiket: 38, jadwal: 44 },
    { label: "Sel", pialaDunia: 68, tiket: 41, jadwal: 47 },
    { label: "Rab", pialaDunia: 71, tiket: 39, jadwal: 52 },
    { label: "Kam", pialaDunia: 66, tiket: 45, jadwal: 49 },
    { label: "Jum", pialaDunia: 78, tiket: 58, jadwal: 61 },
    { label: "Sab", pialaDunia: 84, tiket: 72, jadwal: 68 },
    { label: "Min", pialaDunia: 92, tiket: 81, jadwal: 74 },
  ],
  "30d": [
    { label: "1", pialaDunia: 38, tiket: 22, jadwal: 28 },
    { label: "4", pialaDunia: 42, tiket: 25, jadwal: 31 },
    { label: "7", pialaDunia: 45, tiket: 24, jadwal: 34 },
    { label: "10", pialaDunia: 51, tiket: 30, jadwal: 38 },
    { label: "13", pialaDunia: 48, tiket: 28, jadwal: 36 },
    { label: "16", pialaDunia: 56, tiket: 35, jadwal: 42 },
    { label: "19", pialaDunia: 60, tiket: 33, jadwal: 45 },
    { label: "22", pialaDunia: 64, tiket: 40, jadwal: 48 },
    { label: "25", pialaDunia: 71, tiket: 52, jadwal: 55 },
    { label: "28", pialaDunia: 76, tiket: 61, jadwal: 59 },
    { label: "30", pialaDunia: 88, tiket: 74, jadwal: 67 },
  ],
  "12m": [
    { label: "Jun 25", pialaDunia: 34, tiket: 18, jadwal: 24 },
    { label: "Jul", pialaDunia: 31, tiket: 16, jadwal: 22 },
    { label: "Agu", pialaDunia: 36, tiket: 20, jadwal: 26 },
    { label: "Sep", pialaDunia: 42, tiket: 24, jadwal: 30 },
    { label: "Okt", pialaDunia: 47, tiket: 28, jadwal: 34 },
    { label: "Nov", pialaDunia: 52, tiket: 31, jadwal: 38 },
    { label: "Des", pialaDunia: 58, tiket: 44, jadwal: 41 },
    { label: "Jan 26", pialaDunia: 63, tiket: 49, jadwal: 47 },
    { label: "Feb", pialaDunia: 69, tiket: 55, jadwal: 52 },
    { label: "Mar", pialaDunia: 74, tiket: 62, jadwal: 58 },
    { label: "Apr", pialaDunia: 82, tiket: 71, jadwal: 64 },
    { label: "Mei", pialaDunia: 95, tiket: 86, jadwal: 78 },
  ],
  "5y": [
    { label: "2022", pialaDunia: 28, tiket: 12, jadwal: 20 },
    { label: "2023", pialaDunia: 41, tiket: 22, jadwal: 31 },
    { label: "2024", pialaDunia: 55, tiket: 38, jadwal: 44 },
    { label: "2025", pialaDunia: 72, tiket: 58, jadwal: 61 },
    { label: "2026", pialaDunia: 96, tiket: 89, jadwal: 82 },
  ],
};

export interface CountryRow {
  rank: number;
  name: string;
  code: string;
  region: "Amerika" | "Eropa" | "Asia" | "Afrika" | "Oseania";
  score: number;
  change: number;
  searches: string;
}

export const countries: CountryRow[] = [
  { rank: 1, name: "Meksiko", code: "MX", region: "Amerika", score: 100, change: 12, searches: "48,2 jt" },
  { rank: 2, name: "Amerika Serikat", code: "US", region: "Amerika", score: 94, change: 8, searches: "45,7 jt" },
  { rank: 3, name: "Brasil", code: "BR", region: "Amerika", score: 91, change: 15, searches: "44,1 jt" },
  { rank: 4, name: "Argentina", code: "AR", region: "Amerika", score: 89, change: 6, searches: "42,8 jt" },
  { rank: 5, name: "Indonesia", code: "ID", region: "Asia", score: 86, change: 22, searches: "41,5 jt" },
  { rank: 6, name: "Inggris", code: "GB", region: "Eropa", score: 82, change: 4, searches: "39,3 jt" },
  { rank: 7, name: "Spanyol", code: "ES", region: "Eropa", score: 79, change: 9, searches: "37,9 jt" },
  { rank: 8, name: "Prancis", code: "FR", region: "Eropa", score: 76, change: 5, searches: "36,2 jt" },
  { rank: 9, name: "Kanada", code: "CA", region: "Amerika", score: 73, change: 18, searches: "34,6 jt" },
  { rank: 10, name: "Jerman", code: "DE", region: "Eropa", score: 71, change: 3, searches: "33,1 jt" },
  { rank: 11, name: "Jepang", code: "JP", region: "Asia", score: 68, change: 7, searches: "31,4 jt" },
  { rank: 12, name: "Maroko", code: "MA", region: "Afrika", score: 65, change: 11, searches: "29,8 jt" },
  { rank: 13, name: "Portugal", code: "PT", region: "Eropa", score: 63, change: 2, searches: "28,5 jt" },
  { rank: 14, name: "India", code: "IN", region: "Asia", score: 60, change: 14, searches: "27,2 jt" },
  { rank: 15, name: "Kolombia", code: "CO", region: "Amerika", score: 58, change: 6, searches: "25,9 jt" },
];

export interface TrendRow {
  rank: number;
  query: string;
  category: string;
  growth: number;
  volume: string;
  spark: number[];
  related: string[];
  breakout?: boolean;
}

export const trends: TrendRow[] = [
  { rank: 1, query: "piala dunia 2026 jadwal lengkap", category: "Jadwal", growth: 340, volume: "5,4 jt", spark: [12, 18, 22, 30, 38, 52, 71, 100], related: ["jadwal piala dunia 2026 pdf", "piala dunia 2026 kapan dimulai", "jadwal siaran piala dunia 2026"] },
  { rank: 2, query: "tiket piala dunia 2026 harga", category: "Tiket", growth: 280, volume: "4,1 jt", spark: [10, 16, 20, 28, 35, 48, 66, 92], related: ["cara beli tiket piala dunia 2026", "tiket piala dunia 2026 resmi", "harga tiket final piala dunia 2026"] },
  { rank: 3, query: "hasil drawing piala dunia 2026", category: "Undian Grup", growth: 195, volume: "3,8 jt", spark: [8, 14, 26, 44, 58, 62, 78, 88], related: ["grup piala dunia 2026 lengkap", "undian piala dunia 2026 live", "piala dunia 2026 grup a b c d"] },
  { rank: 4, query: "timnas indonesia piala dunia 2026", category: "Tim", growth: 160, volume: "3,2 jt", spark: [15, 20, 24, 32, 40, 55, 60, 84], related: ["kualifikasi piala dunia 2026 indonesia", "skuad timnas indonesia 2026", "indonesia lolos piala dunia 2026"] },
  { rank: 5, query: "piala dunia 2026 live streaming", category: "Siaran", growth: 145, volume: "2,9 jt", spark: [9, 13, 19, 27, 36, 49, 58, 79], related: ["nonton piala dunia 2026 gratis", "tv nasional piala dunia 2026", "link streaming piala dunia 2026"] },
  { rank: 6, query: "piala dunia 2026 final di mana", category: "Stadion", growth: 120, volume: "2,4 jt", spark: [11, 15, 21, 29, 33, 45, 52, 71], related: ["final piala dunia 2026 stadion", "metlife stadium final 2026", "piala dunia 2026 pembukaan"] },
  { rank: 7, query: "messi piala dunia 2026", category: "Pemain", growth: 98, volume: "2,1 jt", spark: [20, 24, 28, 35, 42, 50, 57, 68], related: ["messi pensiun setelah piala dunia 2026", "argentina piala dunia 2026 skuad", "messi gol piala dunia 2026"] },
  { rank: 8, query: "piala dunia 2026 maskot resmi", category: "Fakta", growth: 85, volume: "1,7 jt", spark: [6, 10, 14, 22, 30, 38, 47, 62], related: ["maskot piala dunia 2026", "logo piala dunia 2026", "bola resmi piala dunia 2026"] },
  { rank: 9, query: "piala dunia 2026 lagu resmi", category: "Fakta", growth: 72, volume: "1,4 jt", spark: [5, 9, 13, 18, 26, 34, 41, 55], related: ["official song world cup 2026", "lagu piala dunia 2026 shakira", "soundtrack piala dunia 2026"] },
  { rank: 10, query: "piala dunia 2026 48 tim format", category: "Format", growth: 64, volume: "1,2 jt", spark: [14, 17, 20, 24, 28, 33, 38, 49], related: ["format baru piala dunia 2026", "48 tim piala dunia 2026", "babak 32 besar piala dunia 2026"] },
  { rank: 11, query: "piala dunia 2026 di amerika serikat", category: "Tuan Rumah", growth: 58, volume: "980 rb", spark: [7, 11, 15, 19, 23, 29, 36, 44], related: ["kota tuan rumah piala dunia 2026", "visa piala dunia 2026 amerika", "fan fest piala dunia 2026"] },
  { rank: 12, query: "piala dunia 2026 inggris 60 tahun", category: "Tim", growth: 210, volume: "890 rb", spark: [4, 8, 18, 32, 48, 66, 82, 96], related: ["inggris piala dunia 2026", "england world cup 2026 squad", "inggris juara piala dunia 1966"], breakout: true },
];

export interface NewsItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  time: string;
  read: string;
  source: string;
  img: string;
  featured?: boolean;
}

export const news: NewsItem[] = [
  {
    id: 1,
    category: "Utama",
    title: "Piala Dunia 2026 Dimulai 11 Juni: 104 Pertandingan di 16 Kota AS, Meksiko, dan Kanada",
    excerpt: "Turnamen terbesar dalam sejarah FIFA ini akan menghadirkan 48 tim, format baru dengan babak 32 besar, dan final di MetLife Stadium, New York/New Jersey pada 19 Juli 2026. Antusiasme pencarian global mencapai rekor tertinggi sepanjang masa.",
    time: "2 jam lalu",
    read: "5 menit baca",
    source: "Trending Global",
    img: "https://images.pexels.com/photos/38546953/pexels-photo-38546953.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: 2,
    category: "Tiket",
    title: "Tiket Piala Dunia 2026: Gelombang Penjualan Kedua Dibuka, Harga Mulai Rp1,2 Juta",
    excerpt: "FIFA membuka penjualan tiket gelombang kedua untuk 104 pertandingan. Kategori suporter dan tiket hospitality menjadi yang paling diburu, dengan pencarian 'tiket piala dunia 2026 harga' naik 280% minggu ini.",
    time: "4 jam lalu",
    read: "4 menit baca",
    source: "FIFA",
    img: "https://images.pexels.com/photos/26654865/pexels-photo-26654865.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 3,
    category: "Tim",
    title: "Inggris Menandai 60 Tahun Sejak Satu-satunya Gelar Piala Dunia pada 1966",
    excerpt: "Pada 2026, timnas Inggris genap 60 tahun sejak kemenangan 4-2 atas Jerman Barat di Wembley. Pencarian terkait Inggris melonjak 210% dan menjadi breakout search minggu ini di Trending Global.",
    time: "6 jam lalu",
    read: "6 menit baca",
    source: "Trending Global",
    img: "https://images.pexels.com/photos/16651656/pexels-photo-16651656.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 4,
    category: "Jadwal",
    title: "Jadwal Lengkap Babak Grup Piala Dunia 2026 Resmi Dirilis FIFA",
    excerpt: "FIFA merilis jadwal 72 pertandingan babak grup yang tersebar di 16 stadion. Laga pembuka akan digelar di Estadio Azteca, Kota Meksiko, disusul pertandingan di Toronto dan Los Angeles pada hari yang sama.",
    time: "8 jam lalu",
    read: "7 menit baca",
    source: "FIFA",
    img: "https://images.pexels.com/photos/38273821/pexels-photo-38273821.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 5,
    category: "Pemain",
    title: "Messi, Mbappé, dan Bellingham: Tiga Bintang yang Paling Dicari Jelang Piala Dunia 2026",
    excerpt: "Data Trending Global menunjukkan Lionel Messi tetap menjadi pemain paling dicari di dunia, diikuti Kylian Mbappé dan Jude Bellingham. Ketiganya diprediksi menjadi penentu gelar juara.",
    time: "12 jam lalu",
    read: "5 menit baca",
    source: "Trending Global",
    img: "https://images.pexels.com/photos/16651578/pexels-photo-16651578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 6,
    category: "Tuan Rumah",
    title: "16 Kota Tuan Rumah Siapkan Fan Fest Raksasa, dari New York hingga Guadalajara",
    excerpt: "Setiap kota tuan rumah menyiapkan zona penggemar dengan layar raksasa, kuliner lokal, dan hiburan. Dallas dan Los Angeles diprediksi menarik jutaan wisatawan selama turnamen berlangsung.",
    time: "1 hari lalu",
    read: "4 menit baca",
    source: "Reuters",
    img: "https://images.pexels.com/photos/38112754/pexels-photo-38112754.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 7,
    category: "Format",
    title: "Format 48 Tim Dijelaskan: 12 Grup, Babak 32 Besar, dan Peluang Tim Asia-Afrika",
    excerpt: "Untuk pertama kalinya, Piala Dunia diikuti 48 tim dari 6 konfederasi. Asia mendapat 8 slot, Afrika 9 slot — peluang terbesar bagi tim-tim non-Eropa untuk melangkah jauh.",
    time: "1 hari lalu",
    read: "6 menit baca",
    source: "FIFA",
    img: "https://images.pexels.com/photos/34649361/pexels-photo-34649361.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 8,
    category: "Siaran",
    title: "Hak Siar Piala Dunia 2026 di Indonesia: SCTV, Indosiar, dan Vidio Siarkan Semua Laga",
    excerpt: "Pemegang hak siar Indonesia memastikan seluruh 104 pertandingan dapat disaksikan gratis dan berbayar. Pencarian 'piala dunia 2026 live streaming' naik 145% dalam 30 hari terakhir.",
    time: "2 hari lalu",
    read: "3 menit baca",
    source: "Vidio",
    img: "https://images.pexels.com/photos/31160049/pexels-photo-31160049.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

export interface Team {
  name: string;
  code: string;
  confed: string;
  ranking: number;
  star: string;
  coach: string;
  titles: number;
}

export interface Group {
  id: string;
  teams: Team[];
  note: string;
}

export const groups: Group[] = [
  { id: "A", note: "Meksiko membuka turnamen di Estadio Azteca.", teams: [
    { name: "Meksiko", code: "MEX", confed: "CONCACAF", ranking: 14, star: "Hirving Lozano", coach: "Javier Aguirre", titles: 0 },
    { name: "Korea Selatan", code: "KOR", confed: "AFC", ranking: 22, star: "Son Heung-min", coach: "Hong Myung-bo", titles: 0 },
    { name: "Uruguay", code: "URU", confed: "CONMEBOL", ranking: 13, star: "Federico Valverde", coach: "Marcelo Bielsa", titles: 2 },
    { name: "Selandia Baru", code: "NZL", confed: "OFC", ranking: 95, star: "Chris Wood", coach: "Darren Bazeley", titles: 0 },
  ]},
  { id: "B", note: "Kanada bermain di Toronto dan Vancouver.", teams: [
    { name: "Kanada", code: "CAN", confed: "CONCACAF", ranking: 26, star: "Alphonso Davies", coach: "Jesse Marsch", titles: 0 },
    { name: "Maroko", code: "MAR", confed: "CAF", ranking: 12, star: "Achraf Hakimi", coach: "Walid Regragui", titles: 0 },
    { name: "Kroasia", code: "CRO", confed: "UEFA", ranking: 10, star: "Joško Gvardiol", coach: "Zlatko Dalić", titles: 0 },
    { name: "Jepang", code: "JPN", confed: "AFC", ranking: 18, star: "Takefusa Kubo", coach: "Hajime Moriyasu", titles: 0 },
  ]},
  { id: "C", note: "Amerika Serikat memulai perjalanan di Los Angeles.", teams: [
    { name: "Amerika Serikat", code: "USA", confed: "CONCACAF", ranking: 16, star: "Christian Pulisic", coach: "Mauricio Pochettino", titles: 0 },
    { name: "Skotlandia", code: "SCO", confed: "UEFA", ranking: 38, star: "Scott McTominay", coach: "Steve Clarke", titles: 0 },
    { name: "Paraguay", code: "PAR", confed: "CONMEBOL", ranking: 42, star: "Julio Enciso", coach: "Gustavo Alfaro", titles: 0 },
    { name: "Australia", code: "AUS", confed: "AFC", ranking: 27, star: "Mathew Ryan", coach: "Tony Popovic", titles: 0 },
  ]},
  { id: "D", note: "Grup neraka: dua juara dunia bertemu.", teams: [
    { name: "Brasil", code: "BRA", confed: "CONMEBOL", ranking: 5, star: "Vinícius Júnior", coach: "Carlo Ancelotti", titles: 5 },
    { name: "Prancis", code: "FRA", confed: "UEFA", ranking: 2, star: "Kylian Mbappé", coach: "Didier Deschamps", titles: 2 },
    { name: "Senegal", code: "SEN", confed: "CAF", ranking: 19, star: "Sadio Mané", coach: "Pape Thiaw", titles: 0 },
    { name: "Iran", code: "IRN", confed: "AFC", ranking: 20, star: "Mehdi Taremi", coach: "Amir Ghalenoei", titles: 0 },
  ]},
  { id: "E", note: "Jerman dan Spanyol berebut puncak grup.", teams: [
    { name: "Jerman", code: "GER", confed: "UEFA", ranking: 17, star: "Florian Wirtz", coach: "Julian Nagelsmann", titles: 4 },
    { name: "Spanyol", code: "ESP", confed: "UEFA", ranking: 3, star: "Lamine Yamal", coach: "Luis de la Fuente", titles: 1 },
    { name: "Ekuador", code: "ECU", confed: "CONMEBOL", ranking: 24, star: "Moisés Caicedo", coach: "Sebastián Beccacece", titles: 0 },
    { name: "Arab Saudi", code: "KSA", confed: "AFC", ranking: 58, star: "Salem Al-Dawsari", coach: "Hervé Renard", titles: 0 },
  ]},
  { id: "F", note: "Belanda diunggulkan, Norwegia kembali setelah 28 tahun.", teams: [
    { name: "Belanda", code: "NED", confed: "UEFA", ranking: 7, star: "Cody Gakpo", coach: "Ronald Koeman", titles: 0 },
    { name: "Norwegia", code: "NOR", confed: "UEFA", ranking: 31, star: "Erling Haaland", coach: "Ståle Solbakken", titles: 0 },
    { name: "Kolombia", code: "COL", confed: "CONMEBOL", ranking: 15, star: "Luis Díaz", coach: "Néstor Lorenzo", titles: 0 },
    { name: "Uzbekistan", code: "UZB", confed: "AFC", ranking: 55, star: "Eldor Shomurodov", coach: "Timur Kapadze", titles: 0 },
  ]},
  { id: "G", note: "Portugal dan Belgia menjadi favorit grup.", teams: [
    { name: "Portugal", code: "POR", confed: "UEFA", ranking: 9, star: "Cristiano Ronaldo", coach: "Roberto Martínez", titles: 0 },
    { name: "Belgia", code: "BEL", confed: "UEFA", ranking: 8, star: "Kevin De Bruyne", coach: "Rudi Garcia", titles: 0 },
    { name: "Mesir", code: "EGY", confed: "CAF", ranking: 32, star: "Mohamed Salah", coach: "Hossam Hassan", titles: 0 },
    { name: "Yordania", code: "JOR", confed: "AFC", ranking: 64, star: "Mousa Al-Taamari", coach: "Jamal Sellami", titles: 0 },
  ]},
  { id: "H", note: "Argentina mengincar gelar beruntun.", teams: [
    { name: "Argentina", code: "ARG", confed: "CONMEBOL", ranking: 1, star: "Lionel Messi", coach: "Lionel Scaloni", titles: 3 },
    { name: "Austria", code: "AUT", confed: "UEFA", ranking: 23, star: "Marcel Sabitzer", coach: "Ralf Rangnick", titles: 0 },
    { name: "Aljazair", code: "ALG", confed: "CAF", ranking: 36, star: "Riyad Mahrez", coach: "Vladimir Petković", titles: 0 },
    { name: "Tanjung Verde", code: "CPV", confed: "CAF", ranking: 71, star: "Garry Rodrigues", coach: "Bubista", titles: 0 },
  ]},
  { id: "I", note: "Inggris: 60 tahun penantian sejak 1966.", teams: [
    { name: "Inggris", code: "ENG", confed: "UEFA", ranking: 4, star: "Jude Bellingham", coach: "Thomas Tuchel", titles: 1 },
    { name: "Swiss", code: "SUI", confed: "UEFA", ranking: 21, star: "Granit Xhaka", coach: "Murat Yakin", titles: 0 },
    { name: "Pantai Gading", code: "CIV", confed: "CAF", ranking: 40, star: "Oumar Diakité", coach: "Emerse Faé", titles: 0 },
    { name: "Haiti", code: "HAI", confed: "CONCACAF", ranking: 83, star: "Frantzdy Pierrot", coach: "Sébastien Migné", titles: 0 },
  ]},
  { id: "J", note: "Italia absen, Swedia mengandalkan generasi muda.", teams: [
    { name: "Swedia", code: "SWE", confed: "UEFA", ranking: 44, star: "Alexander Isak", coach: "Graham Potter", titles: 0 },
    { name: "Tunisia", code: "TUN", confed: "CAF", ranking: 46, star: "Yassine Khenissi", coach: "Sami Trabelsi", titles: 0 },
    { name: "Afrika Selatan", code: "RSA", confed: "CAF", ranking: 56, star: "Lyle Foster", coach: "Hugo Broos", titles: 0 },
    { name: "Qatar", code: "QAT", confed: "AFC", ranking: 52, star: "Akram Afif", coach: "Julen Lopetegui", titles: 0 },
  ]},
  { id: "K", note: "Grup dengan tiga tim dari tiga konfederasi berbeda.", teams: [
    { name: "Ghana", code: "GHA", confed: "CAF", ranking: 61, star: "Mohammed Kudus", coach: "Otto Addo", titles: 0 },
    { name: "Panama", code: "PAN", confed: "CONCACAF", ranking: 33, star: "Adalberto Carrasquilla", coach: "Thomas Christiansen", titles: 0 },
    { name: "Curaçao", code: "CUW", confed: "CONCACAF", ranking: 82, star: "Tahith Chong", coach: "Dick Advocaat", titles: 0 },
    { name: "Tim Play-off", code: "TBD", confed: "—", ranking: 0, star: "—", coach: "—", titles: 0 },
  ]},
  { id: "L", note: "Grup terakhir: kejutan bisa datang dari mana saja.", teams: [
    { name: "Tim Play-off", code: "TBD", confed: "—", ranking: 0, star: "—", coach: "—", titles: 0 },
    { name: "Tim Play-off", code: "TBD", confed: "—", ranking: 0, star: "—", coach: "—", titles: 0 },
    { name: "Tim Play-off", code: "TBD", confed: "—", ranking: 0, star: "—", coach: "—", titles: 0 },
    { name: "Tim Play-off", code: "TBD", confed: "—", ranking: 0, star: "—", coach: "—", titles: 0 },
  ]},
];

export interface Stadium {
  city: string;
  country: "Amerika Serikat" | "Meksiko" | "Kanada";
  stadium: string;
  capacity: string;
  matches: string;
  highlight: string;
}

export const stadiums: Stadium[] = [
  { city: "Atlanta", country: "Amerika Serikat", stadium: "Mercedes-Benz Stadium", capacity: "71.000", matches: "8 laga", highlight: "Semifinal" },
  { city: "Boston", country: "Amerika Serikat", stadium: "Gillette Stadium", capacity: "65.878", matches: "7 laga", highlight: "Perempat final" },
  { city: "Dallas", country: "Amerika Serikat", stadium: "AT&T Stadium", capacity: "92.967", matches: "9 laga", highlight: "Semifinal" },
  { city: "Guadalajara", country: "Meksiko", stadium: "Estadio Akron", capacity: "48.071", matches: "4 laga", highlight: "Babak grup" },
  { city: "Houston", country: "Amerika Serikat", stadium: "NRG Stadium", capacity: "72.220", matches: "7 laga", highlight: "Babak 32 besar" },
  { city: "Kansas City", country: "Amerika Serikat", stadium: "Arrowhead Stadium", capacity: "76.416", matches: "6 laga", highlight: "Perempat final" },
  { city: "Los Angeles", country: "Amerika Serikat", stadium: "SoFi Stadium", capacity: "70.240", matches: "8 laga", highlight: "Perempat final" },
  { city: "Kota Meksiko", country: "Meksiko", stadium: "Estadio Azteca", capacity: "87.523", matches: "5 laga", highlight: "Laga pembuka" },
  { city: "Miami", country: "Amerika Serikat", stadium: "Hard Rock Stadium", capacity: "65.326", matches: "7 laga", highlight: "Perebutan peringkat 3" },
  { city: "Monterrey", country: "Meksiko", stadium: "Estadio BBVA", capacity: "53.500", matches: "4 laga", highlight: "Babak grup" },
  { city: "New York / New Jersey", country: "Amerika Serikat", stadium: "MetLife Stadium", capacity: "82.500", matches: "8 laga", highlight: "Final" },
  { city: "Philadelphia", country: "Amerika Serikat", stadium: "Lincoln Financial Field", capacity: "69.796", matches: "6 laga", highlight: "Babak 16 besar" },
  { city: "San Francisco", country: "Amerika Serikat", stadium: "Levi's Stadium", capacity: "68.500", matches: "6 laga", highlight: "Babak 32 besar" },
  { city: "Seattle", country: "Amerika Serikat", stadium: "Lumen Field", capacity: "69.000", matches: "6 laga", highlight: "Babak 16 besar" },
  { city: "Toronto", country: "Kanada", stadium: "BMO Field", capacity: "45.736", matches: "6 laga", highlight: "Babak 32 besar" },
  { city: "Vancouver", country: "Kanada", stadium: "BC Place", capacity: "54.500", matches: "7 laga", highlight: "Babak 32 besar" },
];

export const tickerItems = [
  "Piala Dunia 2026 dimulai 11 Juni 2026",
  "Final di MetLife Stadium, New York/New Jersey — 19 Juli 2026",
  "48 tim, 104 pertandingan, 16 kota tuan rumah",
  "Pencarian 'piala dunia 2026 jadwal' naik 340% minggu ini",
  "Meksiko peringkat 1 minat pencarian global",
  "Inggris menandai 60 tahun sejak gelar 1966",
  "Tiket gelombang kedua resmi dibuka FIFA",
];
