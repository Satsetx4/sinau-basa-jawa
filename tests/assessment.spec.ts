import { test, expect, type Page } from '@playwright/test';
import { BANK_SOAL } from '../src/data/bankSoalData';

async function answerQuestions(page: Page, questions: typeof BANK_SOAL) {
  for (const [index, question] of questions.entries()) {
    await expect(page.getByRole('heading', { name: question.question })).toBeVisible();
    await page.locator('div.space-y-3.pt-2 > button').nth(question.correctAnswer).click();
    if (index < questions.length - 1) await page.getByRole('button', { name: 'Pitakon Sabanjure' }).click();
  }
  await page.getByRole('button', { name: 'Kirim & Deleng Hasil' }).click();
}

test('topic quiz cannot create a certificate; full exam can', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('dialog', { name: /Sapa Jenengmu/ })).toBeVisible();
  await page.getByRole('button', { name: /Lewati dhisik/ }).click();
  await page.getByRole('button', { name: /Bank Soal & Ujian/ }).first().click();
  await page.getByRole('button', { name: 'Mode Ujian Latihan' }).click();
  await page.getByRole('button', { name: 'Swara A Jejeg/Miring' }).click();
  await answerQuestions(page, BANK_SOAL.filter(question => question.topicId === 'swara-a'));
  await expect(page.getByRole('button', { name: 'Cetak Piagam Latihan' })).toHaveCount(0);

  await page.getByRole('navigation', { name: 'Navigasi Utama Ponsel' }).getByRole('button', { name: 'Ujian' }).click();
  await expect(page.getByRole('button', { name: 'Kabeh Topik (20 Soal)' })).toBeVisible();
  await page.getByRole('button', { name: 'Mode Ujian Latihan' }).click();
  await answerQuestions(page, BANK_SOAL);
  await page.getByRole('button', { name: 'Cetak Piagam Latihan' }).click();
  await expect(page.getByRole('dialog', { name: 'Piagam Pencapaian Latihan' })).toBeVisible();
  await expect(page.getByText(/dudu dokumen resmi sekolah/)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Piagam Pencapaian Latihan' })).toHaveCount(0);
});

test('new device starts clean and layout does not overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('dialog', { name: /Sapa Jenengmu/ })).toBeVisible();
  await page.getByRole('button', { name: /Lewati dhisik/ }).click();
  for (const width of [360, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 850 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test('topic, reward, and unfinished quiz survive refresh without repeated stars', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('dialog', { name: /Sapa Jenengmu/ }).getByRole('button', { name: /Lewati dhisik/ }).click();
  await page.getByRole('button', { name: /Ngoko & Basa Krama/ }).click();
  await expect(page.getByRole('heading', { name: 'Tembung Ngoko lan Basa Krama' })).toBeVisible();
  await page.getByRole('button', { name: /Tandhani Rampung Sinau/ }).click();
  const stars = await page.evaluate(() => localStorage.getItem('sinau_jawa_stars'));
  await page.getByRole('button', { name: 'Wis Ditandhani Rampung' }).click();
  await page.getByRole('button', { name: /Tandhani Rampung Sinau/ }).click();
  expect(await page.evaluate(() => localStorage.getItem('sinau_jawa_stars'))).toBe(stars);
  await page.reload();
  await page.getByRole('dialog', { name: /Sapa Jenengmu/ }).getByRole('button', { name: /Lewati dhisik/ }).click();
  await expect(page.getByRole('heading', { name: 'Tembung Ngoko lan Basa Krama' })).toBeVisible();

  await page.getByRole('navigation', { name: 'Navigasi Utama Ponsel' }).getByRole('button', { name: 'Ujian' }).click();
  await page.getByRole('button', { name: 'Mode Ujian Latihan' }).click();
  await page.locator('div.space-y-3.pt-2 > button').first().click();
  await page.getByRole('button', { name: 'Pitakon Sabanjure' }).click();
  const secondQuestion = BANK_SOAL[1].question;
  await page.reload();
  await page.getByRole('dialog', { name: /Sapa Jenengmu/ }).getByRole('button', { name: /Lewati dhisik/ }).click();
  await expect(page.getByRole('heading', { name: secondQuestion })).toBeVisible();
});
