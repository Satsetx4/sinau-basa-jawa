export interface QuestionItem {
  id: number;
  topicId: string;
  topicName: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  teacherTip: string;
  audioText?: string;
}

export const BANK_SOAL: QuestionItem[] = [
  {
    id: 1,
    topicId: 'swara-a',
    topicName: 'Swara A Jejeg lan Miring',
    question: 'Aksara "a" ing tembung basa Jawa sing nalika diwaca muni kaya aksara "o" diarani swara apa?',
    options: [
      'Swara A Jejeg',
      'Swara A Miring',
      'Swara I Jejeg',
      'Swara U Miring'
    ],
    correctAnswer: 0,
    explanation: 'Wangsulan sing bener yaiku Swara A Jejeg. Ing wulangan basa Jawa, swara aksara "a" sing nalika diwaca malih muni dadi "o" (tuladhane: sega diwaca "sego", lara diwaca "loro") diarani Swara A Jejeg. Dene yen tetep muni "a" (kaya bapak, dalan) diarani Swara A Miring.',
    teacherTip: 'Rumus cepet: A Jejeg = muni "o", A Miring = tetep muni "a"!',
    audioText: 'Aksara a ing tembung basa Jawa sing diwaca muni kaya o diarani swara apa?'
  },
  {
    id: 2,
    topicId: 'swara-a',
    topicName: 'Swara A Jejeg lan Miring',
    question: 'Tembung ing ngisor iki sing ngandhut Swara A Jejeg yaiku ...',
    options: [
      'bapak',
      'sega',
      'dalan',
      'sawah'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku "sega". Tembung "sega" sanajan ditulis nganggo aksara "a", nalika diucapake unine dadi "sego" (kaya aksara "o"). Pilihan bapak, dalan, lan sawah kabeh tetep muni "a", mula kalebu Swara A Miring.',
    teacherTip: 'Coba ucapna tembunge: "sego" lambene bunder kaya ngomong o. Dadi sega iku A Jejeg.',
    audioText: 'Tembung ing ngisor iki sing ngandhut swara a jejeg yaiku sega.'
  },
  {
    id: 3,
    topicId: 'swara-a',
    topicName: 'Swara A Jejeg lan Miring',
    question: 'Tembung "dalan" lan "sawah" kalebu tuladha tembung sing nduweni swara ...',
    options: [
      'Swara A Jejeg',
      'Swara A Miring',
      'Swara O Jejeg',
      'Swara E Jejeg'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku Swara A Miring. Tembung "dalan" lan "sawah" nalika diwaca swarane tetep wutuh muni "a" (ora dadi "dolon" utawa "sawoh"). Amarga swarane tetep murni "a", mula diarani Swara A Miring.',
    teacherTip: 'Swara A Miring biasane katutup dening konsonan ing pungkasan suku kata kaya dalan (-n) lan sawah (-h).',
    audioText: 'Tembung dalan lan sawah kalebu tuladha swara a miring.'
  },
  {
    id: 4,
    topicId: 'swara-a',
    topicName: 'Swara A Jejeg lan Miring',
    question: 'Tembung "kanca" nalika diwaca kanthi bener unine dadi ...',
    options: [
      'kanca',
      'konco',
      'kanci',
      'kuncu'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku "konco". Ing basa Jawa, tembung "kanca" ditulis nganggo aksara "a", nanging amarga kalebu Swara A Jejeg, pamacane diucapake "konco".',
    teacherTip: 'Kanca sebaya diwaca konco sebaya, tulisan asline tetep kanca nganggo a.',
    audioText: 'Tembung kanca nalika diwaca unine dadi konco.'
  },
  {
    id: 5,
    topicId: 'nyimak-swara',
    topicName: 'Nyimak Swara Tembung',
    question: 'Yen Bu Guru maos swara "loro", tulisan tembung Jawa sing bener lan cocog yaiku ...',
    options: [
      'lora',
      'laro',
      'lara',
      'loro'
    ],
    correctAnswer: 2,
    explanation: 'Wangsulan sing bener yaiku "lara". Ing materi wulangan nyimak swara tembung basa Jawa, tembung "lara" (tegese gerah / sakit) diwaca muni "loro" amarga nduweni Swara A Jejeg. Mula yen krungu swara "loro", tulisane sing bener yaiku l-a-r-a.',
    teacherTip: 'Kudu teliti ya! Aja langsung nulis loro nganggo o, amarga tembung asline asale saka lara.',
    audioText: 'Yen guru maos swara loro, tulisan tembung sing cocog yaiku lara.'
  },
  {
    id: 6,
    topicId: 'nyimak-swara',
    topicName: 'Nyimak Swara Tembung',
    question: 'Yen Pak Guru ngucapake swara "sego", ejaan tulisan basa Jawa sing bener yaiku ...',
    options: [
      'sego',
      'sega',
      'soga',
      'sogo'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku "sega". Miturut paugeran panulisan basa Jawa, tembung panganan pokok sega ditulis "sega", senadyan nalika diwaca swarane muni "sego".',
    teacherTip: 'Nalika sinau basa Jawa, kita kudu mbedakake antarane cara nulis (sega) lan cara maca (sego).',
    audioText: 'Yen guru ngucapake sego, tulisan sing bener yaiku sega.'
  },
  {
    id: 7,
    topicId: 'ngoko-krama',
    topicName: 'Basa Ngoko lan Krama',
    question: 'Basa Jawa Ngoko digunakake nalika guneman (ngomong) karo sapa?',
    options: [
      'Bapak lan Ibu Guru ing sekolah',
      'Kanca sebaya utawa kanca sing wis akrab',
      'Simbah kakung lan simbah putri',
      'Wong tuwa sing durung dikenal'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku kanca sebaya utawa kanca sing wis akrab. Basa Ngoko digunakake ing kahanan sing santai lan rumaket karo kanca sakbrayat/kanca dolan. Dene marang Guru, Simbah, lan wong tuwa wajib nggunakake Basa Krama.',
    teacherTip: 'Karo kanca = ngoko, karo wong tuwa & guru = krama. Iku jenenge unggah-ungguh basa Jawa.',
    audioText: 'Basa ngoko digunakake nalika guneman karo kanca sebaya.'
  },
  {
    id: 8,
    topicId: 'ngoko-krama',
    topicName: 'Basa Ngoko lan Krama',
    question: 'Basa Krama saka tembung ngoko "mangan" yaiku ...',
    options: [
      'sare',
      'ngunjuk',
      'nedha',
      'tindak'
    ],
    correctAnswer: 2,
    explanation: 'Wangsulan sing bener yaiku "nedha" (utawa dhahar kanggo krama inggil). Tembung ngoko "mangan" yen didadekake basa krama yaiku "nedha" (tuladhane: kula badhe nedha). Pilihan liyane: ngunjuk = ngombe, sare = turu, tindak = lunga.',
    teacherTip: 'Ayo apalna: mangan = nedha, turu = tilem. Dhahar lan sare kanggo wong sing diajeni.',
    audioText: 'Basa krama saka tembung mangan yaiku nedha.'
  },
  {
    id: 9,
    topicId: 'ngoko-krama',
    topicName: 'Basa Ngoko lan Krama',
    question: 'Basa Krama saka tembung ngoko "turu" yaiku ...',
    options: [
      'rawuh',
      'tilem',
      'lenggah',
      'matur'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku "tilem" kanggo awake dhewe. "Sare" iku krama inggil kanggo wong sing diajeni, kayata Simbah. Pilihan liyane: rawuh = teka, lenggah = lungguh, matur = ngomong.',
    teacherTip: 'Kula badhe tilem; Simbah nembe sare.',
    audioText: 'Basa krama saka tembung turu yaiku tilem.'
  },
  {
    id: 10,
    topicId: 'ngoko-krama',
    topicName: 'Basa Ngoko lan Krama',
    question: 'Nalika Budi ngomong marang Bu Guru ing kelas, ukara sing paling trep lan sopan yaiku ...',
    options: [
      '"Bu Guru, kowe arep mangan opo?"',
      '"Bu Guru, panjenengan badhe tindak pundi?"',
      '"Bu Guru, kowe arep menyang ngendi?"',
      '"Bu Guru, aku njaluk duwitmu."'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku "Bu Guru, panjenengan badhe tindak pundi?". Ukara iki nggunakake basa krama sing alus lan sopan marang guru minangka wong sing luwih tuwa. Tembung "kowe" lan "arep menyang ngendi" iku basa ngoko sing mung kena dienggo marang kanca sebaya.',
    teacherTip: 'Aja tau ngomong "kowe" marang guru ya cah, nanging gunakna "panjenengan" utawa "Bu Guru"!',
    audioText: 'Ukara sing bener marang Bu Guru yaiku Bu Guru panjenengan badhe tindak pundi.'
  },
  {
    id: 11,
    topicId: 'konsonan-th-dh',
    topicName: 'Konsonan TH lan DH',
    question: 'Tembung ing ngisor iki sing ngandhut konsonan TH yaiku ...',
    options: [
      'dhahar',
      'dhuwur',
      'thukul',
      'dhuwit'
    ],
    correctAnswer: 2,
    explanation: 'Wangsulan sing bener yaiku "thukul". Tembung thukul (tegese semi utawa tumbuh) diwiwiti nganggo aksara TH. Dene tembung dhahar, dhuwur, lan dhuwit kabeh nggunakake konsonan DH.',
    teacherTip: 'Ingat ya: thukul, thuthuk, lan bathik nggunakake konsonan TH!',
    audioText: 'Tembung sing ngandhut konsonan th yaiku thukul.'
  },
  {
    id: 12,
    topicId: 'konsonan-th-dh',
    topicName: 'Konsonan TH lan DH',
    question: 'Konsonan TH lan DH ing basa Jawa nduweni swara sing ...',
    options: [
      'Padha persis tanpa beda',
      'Beda artikulasi lan swarane',
      'Mung beda carane nulis latin',
      'Bisa diijol-ijolake sakarepe dhewe'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku Beda artikulasi lan swarane (TH ≠ DH). Ing basa Jawa, swara TH diucapake tanpa getar kanthi ilat nyenggol langit-langit (kaya thuthuk), dene DH diucapake luwih anteb mawa getaran suwanten (kaya dhahar). Ora kena diijol-ijolake!',
    teacherTip: 'TH ≠ DH! Swarane beda, maknane uga beda. Mula kudu cetha pamacane.',
    audioText: 'Konsonan th lan dh nduweni swara sing beda.'
  },
  {
    id: 13,
    topicId: 'konsonan-th-dh',
    topicName: 'Konsonan TH lan DH',
    question: 'Tembung ing ngisor iki sing bener panulisane nganggo konsonan DH yaiku ...',
    options: [
      'thuthuk',
      'thukul',
      'bathik',
      'dhuwur'
    ],
    correctAnswer: 3,
    explanation: 'Wangsulan sing bener yaiku "dhuwur" (tegese tinggi). Tembung iki ditulis nganggo konsonan DH. Pilihan liyane kaya thuthuk, thukul, lan bathik kabeh ditulis nganggo konsonan TH.',
    teacherTip: 'Tuladha tembung DH: dhahar, dhuwur, dhuwit, dhewe.',
    audioText: 'Tembung sing bener panulisane nganggo konsonan dh yaiku dhuwur.'
  },
  {
    id: 14,
    topicId: 'suku-kata',
    topicName: 'Nggabungake Suku Kata',
    question: 'Yen suku kata "po" digabung karo suku kata "tlot", bakal dadi tembung ...',
    options: [
      'polot',
      'potlot',
      'potlo',
      'plotot'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku "potlot". Suku kata "po" ditambah karo "tlot" yen disambung dadi tembung "potlot" sing tegese piranti kanggo nulis (pensil).',
    teacherTip: '4 langkah nggabungake: wacanen saben suku kata -> gandhengake -> wacanen wutuh -> priksa maknane!',
    audioText: 'Suku kata po ditambah tlot dadi potlot.'
  },
  {
    id: 15,
    topicId: 'suku-kata',
    topicName: 'Nggabungake Suku Kata',
    question: 'Tembung "sepatu" dumadi saka pira suku kata (kecapan)?',
    options: [
      '1 suku kata',
      '2 suku kata',
      '3 suku kata',
      '4 suku kata'
    ],
    correctAnswer: 2,
    explanation: 'Wangsulan sing bener yaiku 3 suku kata. Tembung "sepatu" bisa diperang dadi telung suku kata: se + pa + tu (3 kecapan swara).',
    teacherTip: 'Coba keprok saben maca kecapane: se- (keprok 1), pa- (keprok 2), tu (keprok 3). Ana 3 keprokan!',
    audioText: 'Tembung sepatu dumadi saka telung suku kata.'
  },
  {
    id: 16,
    topicId: 'anggota-awak',
    topicName: 'Jeneng Anggota Awak',
    question: 'Basa krama inggile "sirah" yaiku ...',
    options: [
      'mustaka',
      'paningal',
      'talingan',
      'grana'
    ],
    correctAnswer: 0,
    explanation: 'Wangsulan sing bener yaiku "mustaka". Jeneng anggota awak "sirah" (kepala) basa krama inggile yaiku mustaka. Pilihan liyane: paningal = mripat (mata), talingan = kuping (telinga), grana = irung (hidung).',
    teacherTip: 'Sirah = mustaka. Eling-eling mahkota dipasang ing dhuwur mustaka.',
    audioText: 'Basa krama inggile sirah yaiku mustaka.'
  },
  {
    id: 17,
    topicId: 'anggota-awak',
    topicName: 'Jeneng Anggota Awak',
    question: 'Paningal iku basa krama inggile perangan awak apa?',
    options: [
      'Kuping (telinga)',
      'Mripat (mata)',
      'Irung (hidung)',
      'Untu (gigi)'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku Mripat (mata). "Paningal" asale saka tembung dhasar tingal sing tegese ndeleng/mirsani, mula paningal iku krama inggile mripat. Basa ngoko: mripat -> Basa krama inggil: paningal.',
    teacherTip: 'Paningal kanggone ndeleng, padha karo mripat.',
    audioText: 'Paningal iku basa krama inggile mripat.'
  },
  {
    id: 18,
    topicId: 'anggota-awak',
    topicName: 'Jeneng Anggota Awak',
    question: 'Basa krama inggile "tangan" lan "sikil" yaiku ...',
    options: [
      'grana lan waos',
      'asta lan suku',
      'tutuk lan talingan',
      'mustaka lan paningal'
    ],
    correctAnswer: 1,
    explanation: 'Wangsulan sing bener yaiku "asta lan suku". Tangan basa krama inggile yaiku asta, dene sikil basa krama inggile yaiku suku. Mula pasangan sing bener yaiku asta lan suku.',
    teacherTip: 'Tangan = asta, sikil = suku. Kalorone perangan awak kanggo obah lan nyambut gawe.',
    audioText: 'Basa krama inggile tangan lan sikil yaiku asta lan suku.'
  },
  {
    id: 19,
    topicId: 'anggota-awak',
    topicName: 'Jeneng Anggota Awak',
    question: 'Basa krama inggile "untu" (gigi) yaiku ...',
    options: [
      'waos',
      'tutuk',
      'grana',
      'asta'
    ],
    correctAnswer: 0,
    explanation: 'Wangsulan sing bener yaiku "waos". Jeneng anggota awak untu basa krama inggile yaiku waos (tuladha: Waosipun Simbah nembe gerah). Pilihan tutuk iku krama inggile cangkem (mulut).',
    teacherTip: 'Untu = waos, cangkem = tutuk. Aja nganti kuwalik ya!',
    audioText: 'Basa krama inggile untu yaiku waos.'
  },
  {
    id: 20,
    topicId: 'ngoko-krama',
    topicName: 'Unggah-Ungguh Basa',
    question: 'Nalika disukani (diwenehi) jajan utawa pitulungan dening Ibu Guru, kita kudu ngucapake ...',
    options: [
      '"Matur nuwun, Bu."',
      '"Iyo Bu, kene jajane."',
      '"Matur nuwun kowe Bu."',
      '"Ora usah Bu, aku wis sugih."'
    ],
    correctAnswer: 0,
    explanation: 'Wangsulan sing bener yaiku "Matur nuwun, Bu.". Ngucapake matur nuwun minangka wujud tatakrama, sopan santun, lan ngajeni marang guru utawa wong liya sing wis paring kabecikan marang awake dhewe.',
    teacherTip: 'Bocah sing sopan lan nduweni unggah-ungguh bakal ditresnani dening wong tuwa, guru, lan kanca-kancane!',
    audioText: 'Nalika diwenehi pitulungan utawa jajan dening guru kudu matur nuwun bu.'
  }
];
