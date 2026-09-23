import { KAMUS_DATA } from './kamusData';

const kramaWords = ['mangan', 'ngombe', 'turu', 'lunga', 'teka', 'ngomong', 'lungguh'];
export const KRAMA_COMPARISON_ROWS = kramaWords.map(word => {
  const entry = KAMUS_DATA.find(item => item.ngoko === word);
  if (!entry) throw new Error(`Kosakata ora tinemu: ${word}`);
  return { left: entry.ngoko, right: `${entry.krama} / ${entry.kramaInggil} (inggil)`, note: entry.indonesia };
});

export interface WordSample {
  word: string;
  spoken: string;
  type: string;
  meaning: string;
  sentence?: string;
}

export interface TopicModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  badge: string;
  color: string;
  accentBg: string;
  borderColor: string;
  teacherNote: string;
  sections: {
    heading: string;
    description: string;
    items?: WordSample[];
    steps?: string[];
    rules?: string[];
    comparison?: {
      col1Title: string;
      col2Title: string;
      rows: { left: string; right: string; note?: string }[];
    };
  }[];
  interactiveTip: string;
}

export const MATERI_MODULES: TopicModule[] = [
  {
    id: 'swara-a',
    number: 1,
    title: 'Swara A Jejeg lan Swara A Miring',
    subtitle: 'Niteni Bedane Swara Aksara "A" ing Basa Jawa',
    summary: 'Ing basa Jawa, aksara "a" nduweni rong cara pamaca: ana sing muni "o" (A Jejeg) lan ana sing tetep muni "a" (A Miring).',
    badge: 'Artikulasi Vokal',
    color: 'emerald',
    accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-500/30',
    teacherNote: 'Halo bocah-bocah pinter! Rumus cepete gampang banget dielingi: yen muni kaya "o" iku A Jejeg, yen tetep muni "a" iku A Miring!',
    interactiveTip: 'Klik tombol speaker ing saben tembung kanggo ngrungokake bedane swarane kanthi cetha!',
    sections: [
      {
        heading: '1. Swara A Jejeg (Muni Kaya "O")',
        description: 'A Jejeg yaiku swara "a" sing nalika diwaca malih muni kaya aksara "o". Senadyan tulisane nganggo aksara "a", pamacane dadi "o".',
        items: [
          { word: 'sega', spoken: 'sego', type: 'A Jejeg', meaning: 'Nasi (makanan pokok)' },
          { word: 'lara', spoken: 'loro', type: 'A Jejeg', meaning: 'Sakit / pedih' },
          { word: 'mata', spoken: 'moto', type: 'A Jejeg', meaning: 'Mata (alat penglihatan)' },
          { word: 'kanca', spoken: 'konco', type: 'A Jejeg', meaning: 'Teman / kawan' },
          { word: 'bata', spoken: 'boto', type: 'A Jejeg', meaning: 'Batu bata' }
        ]
      },
      {
        heading: '2. Swara A Miring (Tetep Muni "A")',
        description: 'A Miring yaiku swara "a" sing nalika diwaca swarane tetep wutuh "a", ora owah dadi "o". Biasane manggon ing pungkasan suku kata sing katutup konsonan.',
        items: [
          { word: 'bapak', spoken: 'bapak', type: 'A Miring', meaning: 'Ayah / bapak' },
          { word: 'dalan', spoken: 'dalan', type: 'A Miring', meaning: 'Jalanan' },
          { word: 'manuk', spoken: 'manuk', type: 'A Miring', meaning: 'Burung' },
          { word: 'sawah', spoken: 'sawah', type: 'A Miring', meaning: 'Sawah tempat menanam padi' }
        ]
      }
    ]
  },
  {
    id: 'nyimak-swara',
    number: 2,
    title: 'Swara Tembung Basa Jawa (Nyimak & Nulis)',
    subtitle: 'Ngrungokake Swara Tembung kanthi Teliti',
    summary: 'Nalika sinau basa Jawa, kita kudu ngrungokake swara tembung kanthi premati. Ora mung ndeleng tulisane, nanging nggatekake swara nalika diucapake.',
    badge: 'Keterampilan Nyimak',
    color: 'amber',
    accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-500/30',
    teacherNote: 'Aja nganti kleru ya! Tulisane nganggo "a", nanging swarane "o". Contone: yen Bu Guru muni "sego", tulisan asline yaiku "sega".',
    interactiveTip: 'Latih kupingmu! Bandingna tulisan resmi karo carane maca saben tembung ing ngisor iki.',
    sections: [
      {
        heading: 'Beda Tulisan karo Swarane',
        description: 'Nalika guru maos sawijining tembung, murid kudu bisa milih tulisan sing bener miturut ejaan basa Jawa sing trep.',
        comparison: {
          col1Title: 'Swara sing Diucapake',
          col2Title: 'Tulisan sing Bener',
          rows: [
            { left: '"sego"', right: 'sega', note: 'A Jejeg diwaca o' },
            { left: '"loro"', right: 'lara', note: 'A Jejeg diwaca o' },
            { left: '"moto"', right: 'mata', note: 'A Jejeg diwaca o' },
            { left: '"konco"', right: 'kanca', note: 'A Jejeg diwaca o' }
          ]
        }
      }
    ]
  },
  {
    id: 'ngoko-krama',
    number: 3,
    title: 'Tembung Ngoko lan Basa Krama',
    subtitle: 'Mbedakake Ragam Basa Miturut Kahanan lan Lawan Bicara',
    summary: 'Basa Jawa nduweni tatakrama tutur: Basa Ngoko digunakake kanggo kahanan santai marang kanca, dene Basa Krama digunakake kanthi sopan marang wong sing kudu diajeni.',
    badge: 'Unggah-Ungguh Basa',
    color: 'indigo',
    accentBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    borderColor: 'border-indigo-500/30',
    teacherNote: 'Nalika ngomong karo Bu Guru, Simbah, utawa Bapak/Ibu, gunakna Basa Krama minangka tandha pakurmatan lan tata krama bocah pinter!',
    interactiveTip: 'Coba apalna pasangan tembung Ngoko lan Krama ing tabel iki kanggo sangu unggah-ungguh saben dina!',
    sections: [
      {
        heading: 'Kapan Basa Ngoko lan Krama Digunakake?',
        description: 'Trep-trepane ragam basa gumantung sapa sing diajak guneman.',
        rules: [
          'Basa Ngoko: Kanca sebaya, kanca sing wis akrab, utawa wong sing luwih enom.',
          'Basa Krama: Guru ing sekolah, Bapak lan Ibu ing omah, Simbah, lan wong sing luwih tuwa utawa durung akrab.'
        ]
      },
      {
        heading: 'Tabel Pasangan Tembung Ngoko & Krama',
        description: 'Tembung-tembung penting sing asring dienggo ing pacelathon padinan:',
        comparison: {
          col1Title: 'Basa Ngoko',
          col2Title: 'Krama / Krama Inggil',
          rows: [...KRAMA_COMPARISON_ROWS, { left: 'mlaku', right: 'mlampah', note: 'Berjalan' }]
        }
      },
      {
        heading: 'Tuladha Ukara Trep',
        description: 'Bandingna ukara Ngoko karo ukara Krama ing ngisor iki:',
        comparison: {
          col1Title: 'Ukara Ngoko (Karo Kanca)',
          col2Title: 'Ukara Krama (Karo Guru / Wong Tuwa)',
          rows: [
            { left: 'Aku arep mangan.', right: 'Kula badhe nedha.' },
            { left: 'Aku arep ngombe.', right: 'Kula badhe nginum.' },
            { left: 'Kowe wis turu?', right: 'Panjenengan sampun sare?' },
            { left: 'Kowe arep menyang ngendi?', right: 'Bu Guru badhe tindak pundi?' },
            { left: 'Aku arep dolanan.', right: 'Bu, kula nyuwun pangapunten.' }
          ]
        }
      }
    ]
  },
  {
    id: 'konsonan-th-dh',
    number: 4,
    title: 'Konsonan TH lan DH (Aja Nganti Ketuker!)',
    subtitle: 'Niteni Bedane Swara Letupan Aksara TH lan DH',
    summary: 'Sanajan katon meh padha tulisane, konsonan TH lan DH nduweni artikulasi swara sing beda banget ing basa Jawa. TH ≠ DH!',
    badge: 'Fonologi Konsonan',
    color: 'rose',
    accentBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    borderColor: 'border-rose-500/30',
    teacherNote: 'Elinga ya cah bagus lan cah ayu: Aksara TH diucapake kanthi pucuk ilat nyenggol langit-langit tanpa getar suwanten (thukul), dene DH luwih anteb mawa getar (dhahar)!',
    interactiveTip: 'Dengarkan lafal thukul vs dhahar kanthi setiti kanggo ngrasakake bedane getar ing gorokan!',
    sections: [
      {
        heading: '1. Konsonan TH',
        description: 'Swara letupan retroflex tanpa getar pita suara.',
        items: [
          { word: 'thukul', spoken: 'thukul', type: 'Konsonan TH', meaning: 'Tumbuh (tanaman)' },
          { word: 'thuthuk', spoken: 'thuthuk', type: 'Konsonan TH', meaning: 'Memukul / mengetuk' },
          { word: 'bathik', spoken: 'bathik', type: 'Konsonan TH', meaning: 'Kain batik tradisional' }
        ]
      },
      {
        heading: '2. Konsonan DH',
        description: 'Swara letupan retroflex anteb kanthi getaran pita suara.',
        items: [
          { word: 'dhahar', spoken: 'dhahar', type: 'Konsonan DH', meaning: 'Makan (krama inggil)' },
          { word: 'dhuwur', spoken: 'dhuwur', type: 'Konsonan DH', meaning: 'Tinggi' },
          { word: 'dhuwit', spoken: 'dhuwit', type: 'Konsonan DH', meaning: 'Uang' },
          { word: 'dhewe', spoken: 'dhewe', type: 'Konsonan DH', meaning: 'Sendiri' }
        ]
      }
    ]
  },
  {
    id: 'suku-kata',
    number: 5,
    title: 'Nggabungake Suku Kata Dadi Tembung',
    subtitle: 'Sinau Merang lan Nggandhengake Kecapan',
    summary: 'Tembung bisa dumadi saka sawetara suku kata (kecapan). Suku kata yaiku bagean tembung sing bisa diwaca kanthi siji hembusan swara.',
    badge: 'Morfologi Kata',
    color: 'sky',
    accentBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-500/30',
    teacherNote: 'Ayo tindakake 4 langkah trep nalika nemu suku kata sing kapisah supaya dadi tembung sing nduweni teges!',
    interactiveTip: 'Coba sambungake saben suku kata kanthi mencet tombol dolanan rakit kata ing menu game!',
    sections: [
      {
        heading: '4 Langkah Nggabungake Suku Kata',
        description: 'Tindakna 4 urutan langkah iki kanthi teliti:',
        steps: [
          'Langkah 1: Wacanen saben suku kata kanthi cetha (contoh: po - tlot).',
          'Langkah 2: Gandhengake suku kata kasebut dadi siji rerangken.',
          'Langkah 3: Wacanen maneh tembung sing wis digabung kanthi utuh (potlot).',
          'Langkah 4: Priksa apa tembung kasebut wis bener lan nduweni makna sing cetha.'
        ]
      },
      {
        heading: 'Tuladha Panggabungan Suku Kata',
        description: 'Sawetara conto tembung saka panggabungan suku kata:',
        comparison: {
          col1Title: 'Suku Kata Dipisah',
          col2Title: 'Tembung Wutuh & Tegese',
          rows: [
            { left: 'me + ja', right: 'meja (perabot meja)', note: '2 suku kata' },
            { left: 'bu + ku', right: 'buku (kitab wacan)', note: '2 suku kata' },
            { left: 'ba + ju', right: 'baju (klambi)', note: '2 suku kata' },
            { left: 'po + tlot', right: 'potlot (alat nulis pensil)', note: '2 suku kata' },
            { left: 'se + pa + tu', right: 'sepatu (alas sikil)', note: '3 suku kata' },
            { left: 'se + ga', right: 'sega (nasi)', note: '2 suku kata' },
            { left: 'la + ra', right: 'lara (sakit)', note: '2 suku kata' }
          ]
        }
      }
    ]
  },
  {
    id: 'anggota-awak',
    number: 6,
    title: 'Jeneng Anggota Awak (Ngoko & Krama Inggil)',
    subtitle: 'Ngenal Peranganing Awak Kanthi Unggah-Ungguh Trep',
    summary: 'Anggota awak manungsa nduweni jeneng ing basa ngoko lan basa krama inggil. Basa krama inggil digunakake nalika nyritakake anggota awake wong sing luwih tuwa minangka rasa ngajeni.',
    badge: 'Anatomi & Basa Kasar/Halus',
    color: 'purple',
    accentBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-500/30',
    teacherNote: 'Penting banget dielingi: Yen nyebut awake dhewe cukup nganggo ngoko/krama lugu, nanging yen nyebut anggota awake Simbah utawa Guru wajib nganggo Krama Inggil ya!',
    interactiveTip: 'Buka menu Wayang Awak kanggo ngeklik langsung bagean sirah, mripat, tangan, lan sikil ing avatar interaktif!',
    sections: [
      {
        heading: '8 Pasangan Jeneng Anggota Awak Pokok',
        description: 'Tabel lengkap miturut wulangan basa Jawa kelas 3 SD:',
        comparison: {
          col1Title: 'Basa Indonesia & Ngoko',
          col2Title: 'Basa Krama Inggil',
          rows: [
            { left: 'Kepala = sirah', right: 'mustaka', note: 'Sirah (ngoko) -> mustaka (krama inggil)' },
            { left: 'Mata = mripat', right: 'paningal', note: 'Mripat (ngoko) -> paningal (krama inggil)' },
            { left: 'Telinga = kuping', right: 'talingan', note: 'Kuping (ngoko) -> talingan (krama inggil)' },
            { left: 'Hidung = irung', right: 'grana', note: 'Irung (ngoko) -> grana (krama inggil)' },
            { left: 'Tangan = tangan', right: 'asta', note: 'Tangan (ngoko) -> asta (krama inggil)' },
            { left: 'Kaki = sikil', right: 'suku', note: 'Sikil (ngoko) -> suku (krama inggil)' },
            { left: 'Gigi = untu', right: 'waos', note: 'Untu (ngoko) -> waos (krama inggil)' },
            { left: 'Mulut = cangkem', right: 'tutuk', note: 'Cangkem (ngoko) -> tutuk (krama inggil)' }
          ]
        }
      },
      {
        heading: 'Tuladha Pitakon lan Wangsulan Trep',
        description: 'Latihan nanggapi pitakon ngenani krama inggil:',
        rules: [
          'Pitakon: "Apa basa krama inggile tangan?" -> Wangsulan: "Asta".',
          'Pitakon: "Apa basa krama inggile mripat?" -> Wangsulan: "Paningal".',
          'Pitakon: "Apa basa ngoko saka talingan?" -> Wangsulan: "Kuping".',
          'Pitakon: "Apa basa krama inggile untu?" -> Wangsulan: "Waos".'
        ]
      }
    ]
  }
];
