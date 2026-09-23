export interface KamusEntry {
  id: string;
  indonesia: string;
  ngoko: string;
  krama: string;
  kramaInggil: string;
  contoh: string;
  kategori: 'Awak' | 'Pakaryan' | 'Kahanan' | 'Panganan' | 'Srawung';
}

export const KAMUS_DATA: KamusEntry[] = [
  // Anggota Awak
  { id: '1', indonesia: 'Kepala', ngoko: 'sirah', krama: 'sirah', kramaInggil: 'mustaka', contoh: 'Mustakanipun Simbah gerah.', kategori: 'Awak' },
  { id: '2', indonesia: 'Mata', ngoko: 'mripat', krama: 'mripat', kramaInggil: 'paningal', contoh: 'Paningalipun Bu Guru mirsani murid-murid.', kategori: 'Awak' },
  { id: '3', indonesia: 'Telinga', ngoko: 'kuping', krama: 'kuping', kramaInggil: 'talingan', contoh: 'Talinganipun dipun resiki kanthi teliti.', kategori: 'Awak' },
  { id: '4', indonesia: 'Hidung', ngoko: 'irung', krama: 'irung', kramaInggil: 'grana', contoh: 'Grananipun adik mancung sanget.', kategori: 'Awak' },
  { id: '5', indonesia: 'Tangan', ngoko: 'tangan', krama: 'tangan', kramaInggil: 'asta', contoh: 'Bapak nyepeng asta adik nalika nyabrang dalan.', kategori: 'Awak' },
  { id: '6', indonesia: 'Kaki', ngoko: 'sikil', krama: 'sikil', kramaInggil: 'suku', contoh: 'Sukunipun Simbah sayah sakwise mlampah tebih.', kategori: 'Awak' },
  { id: '7', indonesia: 'Gigi', ngoko: 'untu', krama: 'untu', kramaInggil: 'waos', contoh: 'Waosipun dipungosok saben enjang lan sonten.', kategori: 'Awak' },
  { id: '8', indonesia: 'Mulut', ngoko: 'cangkem', krama: 'cangkem', kramaInggil: 'tutuk', contoh: 'Nalika matur marang guru, tutukipun mesem.', kategori: 'Awak' },
  { id: '9', indonesia: 'Rambut', ngoko: 'rambut', krama: 'rambut', kramaInggil: 'rikma', contoh: 'Rikmanipun Simbah sampun pethak sedaya.', kategori: 'Awak' },
  { id: '10', indonesia: 'Punggung', ngoko: 'geger', krama: 'geger', kramaInggil: 'pengkeran', contoh: 'Gegeripun sayah amarga nggendhong tas abot.', kategori: 'Awak' },

  // Pakaryan & Tumindak
  { id: '11', indonesia: 'Makan', ngoko: 'mangan', krama: 'nedha', kramaInggil: 'dhahar', contoh: 'Kula nedha sekul, Bapak dhahar sekul liwet.', kategori: 'Pakaryan' },
  { id: '12', indonesia: 'Minum', ngoko: 'ngombe', krama: 'nginum', kramaInggil: 'ngunjuk', contoh: 'Simbah ngunjuk wedang jahe ing pendhapa.', kategori: 'Pakaryan' },
  { id: '13', indonesia: 'Tidur', ngoko: 'turu', krama: 'tilem', kramaInggil: 'sare', contoh: 'Adik tilem jam wolu, Simbah sampun sare.', kategori: 'Pakaryan' },
  { id: '14', indonesia: 'Pergi', ngoko: 'lunga', krama: 'kesah', kramaInggil: 'tindak', contoh: 'Ibu tindak dhateng peken mundhut janganan.', kategori: 'Pakaryan' },
  { id: '15', indonesia: 'Datang / Tiba', ngoko: 'teka', krama: 'dugi', kramaInggil: 'rawuh', contoh: 'Pak Guru rawuh ing sekolah nitih pit motor.', kategori: 'Pakaryan' },
  { id: '16', indonesia: 'Duduk', ngoko: 'lungguh', krama: 'lenggah', kramaInggil: 'pinarak', contoh: 'Monggo pinarak ing kursi ngajeng, Mbah.', kategori: 'Pakaryan' },
  { id: '17', indonesia: 'Berbicara', ngoko: 'ngomong', krama: 'matur', kramaInggil: 'ngendika', contoh: 'Kula matur marang Bapak kanthi sopan.', kategori: 'Pakaryan' },
  { id: '18', indonesia: 'Mandi', ngoko: 'adus', krama: 'adus', kramaInggil: 'siram', contoh: 'Bapak nembe siram ing jedhing wingking.', kategori: 'Pakaryan' },
  { id: '19', indonesia: 'Melihat', ngoko: 'ndeleng', krama: 'ningali', kramaInggil: 'mirsani', contoh: 'Simbah mirsani wayang kulit ing bale desa.', kategori: 'Pakaryan' },
  { id: '20', indonesia: 'Membaca', ngoko: 'maca', krama: 'maos', kramaInggil: 'maos', contoh: 'Murid kelas telu maos buku basa Jawa.', kategori: 'Pakaryan' },
  { id: '21', indonesia: 'Menulis', ngoko: 'nulis', krama: 'nyerat', kramaInggil: 'nyerat', contoh: 'Budi nyerat layang kanggo kancane.', kategori: 'Pakaryan' },
  { id: '22', indonesia: 'Membeli', ngoko: 'tuku', krama: 'tumbas', kramaInggil: 'mundhut', contoh: 'Ibu mundhut beras lan gula Jawa.', kategori: 'Pakaryan' },
  { id: '23', indonesia: 'Memberi', ngoko: 'menehi', krama: 'nyukani', kramaInggil: 'maringi', contoh: 'Bu Guru maringi ganjaran bintang marang siswa.', kategori: 'Pakaryan' },
  { id: '24', indonesia: 'Membawa', ngoko: 'nggawa', krama: 'mbekta', kramaInggil: 'ngasta', contoh: 'Pak Guru ngasta tas werni cemeng.', kategori: 'Pakaryan' },
  { id: '25', indonesia: 'Pulang', ngoko: 'mulih', krama: 'wangsul', kramaInggil: 'kondur', contoh: 'Bapak kondur saking kantor tabuh sekawan sonten.', kategori: 'Pakaryan' },

  // Kahanan & Srawung
  { id: '26', indonesia: 'Rumah', ngoko: 'omah', krama: 'griya', kramaInggil: 'dalem', contoh: 'Dalemipun Simbah wonten ing kitha Sala.', kategori: 'Kahanan' },
  { id: '27', indonesia: 'Nama', ngoko: 'jeneng', krama: 'nami', kramaInggil: 'asma', contoh: 'Asmanipun kepala sekolah inggih punika Pak Hartono.', kategori: 'Srawung' },
  { id: '28', indonesia: 'Uang', ngoko: 'dhuwit', krama: 'yatra', kramaInggil: 'arto', contoh: 'Simbah maringi arto sangu sekolah.', kategori: 'Kahanan' },
  { id: '29', indonesia: 'Baju', ngoko: 'klambi', krama: 'rasukan', kramaInggil: 'ageman', contoh: 'Ageman batik dipunagem nalika dinten Kemis.', kategori: 'Kahanan' },
  { id: '30', indonesia: 'Sakit', ngoko: 'lara', krama: 'sakit', kramaInggil: 'gerah', contoh: 'Simbah putri nembe gerah waja.', kategori: 'Kahanan' },
  { id: '31', indonesia: 'Sembuh', ngoko: 'mari', krama: 'mantun', kramaInggil: 'dhangan', contoh: 'Mugi-mugi panjenengan enggal dhangan.', kategori: 'Kahanan' },
  { id: '32', indonesia: 'Saya', ngoko: 'aku', krama: 'kula', kramaInggil: 'kula', contoh: 'Kula nyuwun idi palilah badhe mlebet kelas.', kategori: 'Srawung' },
  { id: '33', indonesia: 'Kamu', ngoko: 'kowe', krama: 'sampeyan', kramaInggil: 'panjenengan', contoh: 'Panjenengan menapa sampun dhahar?', kategori: 'Srawung' },
  { id: '34', indonesia: 'Dia', ngoko: 'dheweke', krama: 'piyambakipun', kramaInggil: 'panjenenganipun', contoh: 'Panjenenganipun rawuh tepat wekdal.', kategori: 'Srawung' },
  { id: '35', indonesia: 'Bisa', ngoko: 'bisa', krama: 'saged', kramaInggil: 'saged', contoh: 'Murid-murid sampun saged maos aksara Jawa.', kategori: 'Kahanan' },
  { id: '36', indonesia: 'Tahu / Mengerti', ngoko: 'ngerti', krama: 'ngertos', kramaInggil: 'priksa', contoh: 'Bapak sampun priksa pawartos kasebat.', kategori: 'Kahanan' },
  { id: '37', indonesia: 'Besar', ngoko: 'gedhe', krama: 'ageng', kramaInggil: 'ageng', contoh: 'Wit ringin ing alun-alun ageng sanget.', kategori: 'Kahanan' },
  { id: '38', indonesia: 'Kecil', ngoko: 'cilik', krama: 'alit', kramaInggil: 'alit', contoh: 'Adik gadhah kucing alit ingkang lucu.', kategori: 'Kahanan' },
  { id: '39', indonesia: 'Bagus / Baik', ngoko: 'apik', krama: 'sae', kramaInggil: 'sae', contoh: 'Sikap sopan santun punika sae sanget.', kategori: 'Kahanan' },
  { id: '40', indonesia: 'Banyak', ngoko: 'akeh', krama: 'kathah', kramaInggil: 'kathah', contoh: 'Wonten kathah kembang ing taman sekolah.', kategori: 'Kahanan' },

  // Panganan & Piranti
  { id: '41', indonesia: 'Nasi', ngoko: 'sega', krama: 'sekul', kramaInggil: 'sekul', contoh: 'Simbah remen sekul gurih.', kategori: 'Panganan' },
  { id: '42', indonesia: 'Air', ngoko: 'banyu', krama: 'toya', kramaInggil: 'toya', contoh: 'Kula ngunjuk toya bening sabibaripun senam.', kategori: 'Panganan' },
  { id: '43', indonesia: 'Sayur', ngoko: 'jangan', krama: 'jangan', kramaInggil: 'cawisan', contoh: 'Ibu masak jangan asem seger sanget.', kategori: 'Panganan' },
  { id: '44', indonesia: 'Ikan / Lauk', ngoko: 'iwak', krama: 'ulam', kramaInggil: 'ulam', contoh: 'Ulam bandeng dipun tim kagem dhahar siang.', kategori: 'Panganan' },
  { id: '45', indonesia: 'Gula', ngoko: 'gula', krama: 'gula', kramaInggil: 'gendhis', contoh: 'Teh anget punika dipunsukani gendhis jawi.', kategori: 'Panganan' }
];
