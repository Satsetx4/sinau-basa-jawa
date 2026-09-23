import { describe, expect, it } from 'vitest';
import { grantAchievement, parseStars } from './progress';
import { KAMUS_DATA } from '../data/kamusData';
import { KRAMA_COMPARISON_ROWS, MATERI_MODULES } from '../data/materiData';
import { PILAH_WORDS } from '../data/gamesData';
import { parseQuizDraft } from './quizDraft';

describe('progress and content', () => {
  it('awards an achievement only once', () => {
    const first = grantAchievement({ stars: 0, achievements: [] }, 'topic:swara-a', 5);
    expect(first.stars).toBe(5);
    expect(grantAchievement(first, 'topic:swara-a', 5)).toBe(first);
  });

  it('starts safely with an empty or corrupted star count', () => {
    expect(parseStars(null)).toBe(0);
    expect(parseStars('NaN')).toBe(0);
    expect(parseStars('-1')).toBe(0);
  });

  it('uses the dictionary for krama comparisons and valid swara examples', () => {
    for (const row of KRAMA_COMPARISON_ROWS) {
      const word = KAMUS_DATA.find(item => item.ngoko === row.left)!;
      expect(row.right).toContain(word.krama);
      expect(row.right).toContain(word.kramaInggil);
    }
    const jejegExamples = MATERI_MODULES[0].sections[0].items || [];
    expect(jejegExamples.every(item => item.word.includes('a'))).toBe(true);
    expect(PILAH_WORDS.every(item => item.word.includes('a'))).toBe(true);
  });

  it('restores only valid quiz drafts', () => {
    const valid = { version: 1, mode: 'ujian', topicId: 'all', currentIndex: 0,
      answers: {}, deadlineAt: Date.now() + 900000 };
    expect(parseQuizDraft(JSON.stringify(valid))).toEqual(valid);
    expect(parseQuizDraft(JSON.stringify({ ...valid, topicId: 'unknown' }))).toBeNull();
    expect(parseQuizDraft(JSON.stringify({ ...valid, answers: { 1: 99 } }))).toBeNull();
  });
});
