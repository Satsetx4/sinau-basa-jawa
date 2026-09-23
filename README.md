# Sinau Basa Jawa

Media latihan mandiri Basa Jawa kelas 3 SD. Aplikasi ini berjalan di browser; nama panggilan, progres, jawaban yang belum dikirim, dan hasil ujian disimpan lokal di perangkat. Tidak ada akun atau server penyimpan data siswa.

## Menjalankan

```sh
npm ci
npm run dev
```

Pemeriksaan perubahan:

```sh
npm run build
npm run lint
npm test
npx playwright install chromium
npm run test:e2e
```

GitHub Actions menjalankan build, lint, unit test, dan uji browser pada setiap push dan pull request.

## Penilaian dan piagam

Mode latihan menampilkan pembahasan langsung. Kuis topik menilai soal pada topik pilihan. Hanya ujian lengkap dengan seluruh soal dan nilai sedikitnya 70 yang menghasilkan piagam pencapaian latihan. Piagam ini bukan dokumen resmi sekolah. Nilai lama yang hanya disimpan sebagai angka tidak dikonversi menjadi hasil ujian terverifikasi; siswa perlu mengerjakan ujian lengkap lagi. Bintang diberikan sekali untuk setiap pencapaian.

## Sumber dan batasan materi

Pasangan ngoko, krama, dan krama inggil dalam tabel materi diturunkan dari data kamus aplikasi. Pembedaan *turu–tilem–sare* dan *mangan–nedha–dhahar* merujuk pada [kajian UNDIP tentang undak usuk Bahasa Jawa](https://eprints.undip.ac.id/48696/7/Thesis_-_Hartati.pdf). Contoh swara A dicek agar setiap kata benar-benar memuat huruf A. Konten masih perlu peninjauan akhir oleh guru atau penutur ahli sesuai daerah dan bahan ajar sekolah.

Tombol speaker menggunakan suara sintetis yang disediakan browser. Kualitas pelafalan Basa Jawa, termasuk swara A dan TH/DH, bergantung pada suara yang tersedia di perangkat dan tidak boleh dipakai sebagai acuan tunggal. Tombol mute menghentikan efek suara dan pembacaan yang sedang berlangsung.

## Privasi dan pemulihan

Onboarding meminta nama panggilan secara opsional. Data hanya berada di `localStorage`; hindari mengisi informasi sensitif. Tombol reset di footer menghapus progres dan jawaban latihan. Browser privat atau penyimpanan yang diblokir dapat membuat data tidak bertahan setelah ditutup; aplikasi tetap bisa digunakan.
