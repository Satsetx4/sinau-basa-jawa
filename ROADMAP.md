# Roadmap — sinau-basa-jawa

React 19 + TS + Vite 6 + Tailwind v4 + Framer Motion. Struktur: `src/components/` (Materi, Kamus, Quiz, Games, CertificateModal), `src/data/` (`materiData.ts`, `kamusData.ts`, `bankSoalData.ts` ±14KB, `gamesData.ts`), `src/domain/` (`assessment.ts`, `progress.ts`, `quizDraft.ts` + tes), `src/lib/` (`storage.ts`, `speech.ts`, `sound.ts`). CI `verify.yml` (build, oxlint, vitest, Playwright). Aturan main: ujian penuh nilai ≥70 dapat piagam, bintang sekali per pencapaian. Demo: sinau-basa-jawa-nu.vercel.app. Belum ada ROADMAP.md.

## Fase 1 — Validasi materi & kamus
- [ ] Review guru/penutur: pasangan ngoko–krama–krama inggil di `kamusData.ts` vs `materiData.ts`
- [ ] Kunci contoh swara A (`turu–tilem–sare`, `mangan–nedha–dhahar`) + rujukan UNDIP di README
- [ ] Tandai batas TTS browser untuk swara A dan TH/DH di `speech.ts` (jangan jadi acuan tunggal)
- [ ] Tambah skrip cek konsistensi kamus ↔ materi ↔ `bankSoalData.ts`

## Fase 2 — Integritas asesmen
- [ ] Kunci logika `assessment.ts`: hanya ujian penuh + skor ≥70 → `CertificateModal.tsx`
- [ ] Cegah konversi nilai lama angka jadi hasil terverifikasi; wajib ujian ulang
- [ ] Bintang sekali per pencapaian di `progress.ts` + tombol reset footer
- [ ] Perluas `tests/assessment.spec.ts` + `domain/*.test.ts` untuk edge (draf, lanjut, reset)

## Fase 3 — UX mobile & audio
- [ ] Navbar + `HeroBanner.tsx` + `GamesSection.tsx` aman 360px, no overflow
- [ ] Sinkron theme toggle + `motion.ts` + `sound.ts` + mute hentikan TTS (`useDialogFocus.ts`)
- [ ] Fokus dialog aksesibel (`NameModal.tsx`, `CertificateModal.tsx`, `ErrorBoundary.tsx`)
- [ ] Uji `storage.ts` saat `localStorage` diblokir (privat) tanpa crash

## Fase 4 — CI & rilis sekolah
- [ ] Hijau konsisten: `npm run build`, `lint`, `vitest run`, `playwright test`
- [ ] Smoke Vercel: onboarding nama panggilan → latihan → kuis → ujian → piagam
- [ ] Minta review akhir guru daerah + catat di README
- [ ] Tag `v1.0` + catat batasan suara perangkat di rilis
