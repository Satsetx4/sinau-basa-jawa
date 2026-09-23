import { BANK_SOAL } from '../data/bankSoalData';

export interface QuizDraft {
  version: 1;
  mode: 'latihan' | 'ujian';
  topicId: string;
  currentIndex: number;
  answers: Record<number, number>;
  deadlineAt: number | null;
}

export function parseQuizDraft(raw: string | null): QuizDraft | null {
  if (!raw) return null;
  try {
    const draft: unknown = JSON.parse(raw);
    if (!draft || typeof draft !== 'object') return null;
    const value = draft as Partial<QuizDraft>;
    const questions = BANK_SOAL.filter(question => value.topicId === 'all' || question.topicId === value.topicId);
    if (value.version !== 1 || !['latihan', 'ujian'].includes(value.mode || '') ||
      typeof value.topicId !== 'string' || !questions.length ||
      !Number.isInteger(value.currentIndex) || value.currentIndex! < 0 || value.currentIndex! >= questions.length ||
      !value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers) ||
      (value.mode === 'ujian' && (!Number.isFinite(value.deadlineAt) || value.deadlineAt! <= 0)) ||
      (value.mode === 'latihan' && value.deadlineAt !== null)) return null;
    for (const [id, answer] of Object.entries(value.answers)) {
      const question = questions.find(item => String(item.id) === id);
      if (!question || !Number.isInteger(answer) || answer < 0 || answer >= question.options.length) return null;
    }
    return value as QuizDraft;
  } catch { return null; }
}
