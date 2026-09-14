export interface PilahWord {
  id: string;
  word: string;
  category: 'jejeg' | 'miring';
  spokenText: string;
  hint: string;
}

export interface SukuKataItem {
  id: number;
  word: string;
  chunks: string[];
  clue: string;
  meaning: string;
}

export interface ScenarioDialog {
  id: number;
  characterName: string;
  characterRole: 'Guru' | 'Simbah' | 'Kanca';
  situation: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  explanation: string;
}

export const PILAH_WORDS: PilahWord[] = [
  { id: '1', word: 'sega', category: 'jejeg', spokenText: 'sego', hint: 'Diwaca "sego" (muni o) -> Swara A Jejeg' },
  { id: '2', word: 'bapak', category: 'miring', spokenText: 'bapak', hint: 'Diwaca tetep "bapak" (muni a) -> Swara A Miring' },
  { id: '3', word: 'lara', category: 'jejeg', spokenText: 'loro', hint: 'Diwaca "loro" (muni o) -> Swara A Jejeg' },
  { id: '4', word: 'dalan', category: 'miring', spokenText: 'dalan', hint: 'Diwaca tetep "dalan" (muni a) -> Swara A Miring' },
  { id: '5', word: 'mata', category: 'jejeg', spokenText: 'moto', hint: 'Diwaca "moto" (muni o) -> Swara A Jejeg' },
  { id: '6', word: 'sawah', category: 'miring', spokenText: 'sawah', hint: 'Diwaca tetep "sawah" (muni a) -> Swara A Miring' },
  { id: '7', word: 'kanca', category: 'jejeg', spokenText: 'konco', hint: 'Diwaca "konco" (muni o) -> Swara A Jejeg' },
  { id: '8', word: 'manuk', category: 'miring', spokenText: 'manuk', hint: 'Diwaca tetep "manuk" (muni a) -> Swara A Miring' },
  { id: '9', word: 'toko', category: 'jejeg', spokenText: 'toko', hint: 'Diwaca tetep "toko" (muni o) -> Swara A Jejeg' },
  { id: '10', word: 'pasar', category: 'miring', spokenText: 'pasar', hint: 'Diwaca tetep "pasar" (muni a) -> Swara A Miring' },
  { id: '11', word: 'bata', category: 'jejeg', spokenText: 'boto', hint: 'Diwaca "boto" (muni o) -> Swara A Jejeg' },
  { id: '12', word: 'macan', category: 'miring', spokenText: 'macan', hint: 'Diwaca tetep "macan" (muni a) -> Swara A Miring' }
];

export const SUKU_KATA_GAMES: SukuKataItem[] = [
  { id: 1, word: 'meja', chunks: ['me', 'ja'], clue: 'Piranti kayu papat sikile kanggo sinau lan nulis ing kelas.', meaning: 'Meja' },
  { id: 2, word: 'buku', chunks: ['bu', 'ku'], clue: 'Kitab kertas isi cathetan lan kawruh wacan para murid.', meaning: 'Buku' },
  { id: 3, word: 'potlot', chunks: ['po', 'tlot'], clue: 'Piranti ireng lancip kanggo nggambar lan nulis ing buku tulis.', meaning: 'Potlot (Pensil)' },
  { id: 4, word: 'sepatu', chunks: ['se', 'pa', 'tu'], clue: 'Alas sikil ireng sing dienggo nalika budhal sekolah saben enjang.', meaning: 'Sepatu' },
  { id: 5, word: 'klambi', chunks: ['klam', 'bi'], clue: 'Ageman rasukan seragam abang putih sing dienggo ing awak.', meaning: 'Klambi (Baju)' },
  { id: 6, word: 'thukul', chunks: ['thu', 'kul'], clue: 'Winih pari utawa jagung sing wiwit metu tunas semine ing lemah.', meaning: 'Thukul (Tumbuh)' },
  { id: 7, word: 'dhuwit', chunks: ['dhu', 'wit'], clue: 'Alat pembayaran rupiah sing diparingke bapak kanggo sangu sekolah.', meaning: 'Dhuwit (Uang)' },
  { id: 8, word: 'bathik', chunks: ['ba', 'thik'], clue: 'Kain tradisional Jawa kang nduweni corak elok lan endah.', meaning: 'Bathik (Batik)' }
];

export const SCENARIO_DIALOGS: ScenarioDialog[] = [
  {
    id: 1,
    characterName: 'Bu Guru Siti',
    characterRole: 'Guru',
    situation: 'Kowe ketemu Bu Guru Siti ing ngarep gapura sekolahan nalika tabuh pitu esuk sadurunge bel muni.',
    question: 'Kepriye atur salammu sing paling sopan lan trep miturut unggah-ungguh basa Jawa?',
    options: [
      {
        text: '"Halo Bu Siti, kowe wis sarapan opo durung?"',
        isCorrect: false,
        feedback: 'Kurang trep! Tembung "kowe" lan "sarapan apa durung" iku basa ngoko sing ora kena dienggo marang guru.'
      },
      {
        text: '"Sugeng enjang Bu Guru, nyuwun pangestu kula badhe mlebet kelas sinau."',
        isCorrect: true,
        feedback: 'Pinter banget! Ukara iki alus, nggunakake basa krama, lan ngajeni marang guru.'
      },
      {
        text: '"Bu, aku mlebu dhisik yo, ojo lali nilaiku digawe apik."',
        isCorrect: false,
        feedback: 'Salah! Ukara iki ngoko lan ora nduweni tatakrama marang pendhidhik.'
      }
    ],
    explanation: 'Marang Bapak lan Ibu Guru, kita wajib nggunakake Basa Krama minangka tandha pakurmatan siswa sing bekti marang gurune.'
  },
  {
    id: 2,
    characterName: 'Simbah Kakung',
    characterRole: 'Simbah',
    situation: 'Simbah nembe pinarak ing kursi pendhapa teras omah. Kowe nyaosi unjukan teh anget kagem Simbah.',
    question: 'Ukara apa sing paling trep nalika ngaturake unjukan marang Simbah?',
    options: [
      {
        text: '"Mbah, iki unjukan teh angetipun, mangga dipununjuk."',
        isCorrect: true,
        feedback: 'Joss gandhos! Tembung "unjukan" lan "dipununjuk" kalebu krama inggil sing trep banget kagem Simbah.'
      },
      {
        text: '"Mbah, iki omben-ombenmu ndang diombe ben ora adhem."',
        isCorrect: false,
        feedback: 'Kurang trep! "Omben-ombenmu" lan "diombe" iku tembung ngoko kasar yen marang wong tuwa.'
      },
      {
        text: '"Mbah, jupuken dhewe teh angete ing meja pawon."',
        isCorrect: false,
        feedback: 'Salah gedhe! Iku tumindak sing ora sopan lan ora bekti marang simbah.'
      }
    ],
    explanation: 'Simbah iku sesepuh ing kulawarga. Nalika nyritakake tumindake simbah kaya ngombe, kudu nganggo tembung krama inggil "ngunjuk".'
  },
  {
    id: 3,
    characterName: 'Budi (Kanca Sebaya)',
    characterRole: 'Kanca',
    situation: 'Jam wis nuduhake tabuh papat sore. Kowe arep ngajak Budi dolanan bal-balan ing lapangan desa.',
    question: 'Ukara apa sing paling pas lan lumrah dienggo nalika ngajak kanca sebaya?',
    options: [
      {
        text: '"Budi, panjenengan kula aturi bidhal dhateng lapangan dolanan bal."',
        isCorrect: false,
        feedback: 'Kekarepen! Ukara iki krama inggil banget, krasa kaku yen dienggo marang kanca dolan sabendina.'
      },
      {
        text: '"Bud, mengko sore ayo bal-balan ing lapangan bareng kanca-kanca!"',
        isCorrect: true,
        feedback: 'Treep banget! Basa ngoko santai lan akrab cocok banget kanggo sesrawungan kanca sebaya.'
      },
      {
        text: '"Heh Budi budhek, melu aku saiki yen ora tak thuthuk!"',
        isCorrect: false,
        feedback: 'Salah! Senadyan karo kanca akrab, kita ora kena nggunakake tembung kasar utawa ngancam.'
      }
    ],
    explanation: 'Basa Ngoko digunakake ing kahanan akrab lan santai marang kanca sebaya, nanging tetep dijaga supaya tembunge ora kasar utawa natoni ati.'
  }
];
