import type { QuestionItem } from '../data/bankSoalData';

export type AssessmentMode = 'practice' | 'topicQuiz' | 'exam';

export interface ExamResult {
  version: 1;
  mode: AssessmentMode;
  topicId: string | null;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answers: Record<number, number>;
  completedAt: string;
  passed: boolean;
}

export function assessmentMode(mode: 'latihan' | 'ujian', topicId: string): AssessmentMode {
  if (mode === 'latihan') return 'practice';
  return topicId === 'all' ? 'exam' : 'topicQuiz';
}

export function calculateResult(
  questions: QuestionItem[],
  answers: Record<number, number>,
  mode: AssessmentMode,
  topicId: string | null,
  completedAt = new Date().toISOString(),
): ExamResult {
  const correctAnswers = questions.filter(question => answers[question.id] === question.correctAnswer).length;
  const score = questions.length ? Math.round(correctAnswers / questions.length * 100) : 0;
  return {
    version: 1,
    mode,
    topicId,
    totalQuestions: questions.length,
    correctAnswers,
    score,
    answers: { ...answers },
    completedAt,
    passed: score >= 70,
  };
}

export function isCertificateEligible(result: ExamResult | null, fullExamQuestionCount: number): boolean {
  return !!result && result.mode === 'exam' && result.topicId === null &&
    result.totalQuestions === fullExamQuestionCount && result.passed && result.score >= 70;
}

export function parseExamResult(raw: string | null, questions: QuestionItem[]): ExamResult | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const result = value as Partial<ExamResult>;
    if (result.version !== 1 || result.mode !== 'exam' || result.topicId !== null ||
      result.totalQuestions !== questions.length || !questions.length ||
      !Number.isInteger(result.correctAnswers) || result.correctAnswers! < 0 || result.correctAnswers! > questions.length ||
      !Number.isInteger(result.score) || result.score !== Math.round(result.correctAnswers! / questions.length * 100) ||
      result.passed !== (result.score >= 70) ||
      typeof result.completedAt !== 'string' || !Number.isFinite(Date.parse(result.completedAt)) ||
      !result.answers || typeof result.answers !== 'object' || Array.isArray(result.answers)) return null;
    const answers = result.answers as Record<string, unknown>;
    if (Object.entries(answers).some(([id, answer]) => {
      const question = questions.find(item => String(item.id) === id);
      return !question || !Number.isInteger(answer) || (answer as number) < 0 || (answer as number) >= question.options.length;
    })) return null;
    if (questions.filter(question => answers[String(question.id)] === question.correctAnswer).length !== result.correctAnswers) return null;
    return result as ExamResult;
  } catch {
    return null;
  }
}
