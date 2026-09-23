import { describe, expect, it } from 'vitest';
import { BANK_SOAL } from '../data/bankSoalData';
import { assessmentMode, calculateResult, isCertificateEligible, parseExamResult } from './assessment';

describe('assessment and certificate eligibility', () => {
  const answers = Object.fromEntries(BANK_SOAL.map(question => [question.id, question.correctAnswer]));

  it('permits only a passing full exam', () => {
    const exam = calculateResult(BANK_SOAL, answers, 'exam', null);
    expect(exam.score).toBe(100);
    expect(isCertificateEligible(exam, BANK_SOAL.length)).toBe(true);
    expect(isCertificateEligible({ ...exam, mode: 'practice' }, BANK_SOAL.length)).toBe(false);
    expect(isCertificateEligible({ ...exam, mode: 'topicQuiz', topicId: 'ngoko-krama' }, BANK_SOAL.length)).toBe(false);
    expect(isCertificateEligible({ ...exam, totalQuestions: 2 }, BANK_SOAL.length)).toBe(false);
    expect(isCertificateEligible({ ...exam, passed: false, score: 65 }, BANK_SOAL.length)).toBe(false);
  });

  it('counts unanswered questions as incorrect and distinguishes topic quizzes', () => {
    const topic = BANK_SOAL.filter(question => question.topicId === 'ngoko-krama');
    const result = calculateResult(topic, { [topic[0].id]: topic[0].correctAnswer },
      assessmentMode('ujian', 'ngoko-krama'), 'ngoko-krama');
    expect(result.correctAnswers).toBe(1);
    expect(result.totalQuestions).toBe(topic.length);
    expect(isCertificateEligible(result, BANK_SOAL.length)).toBe(false);
    expect(assessmentMode('latihan', 'all')).toBe('practice');
  });

  it('rejects old scores and corrupted stored results', () => {
    const exam = calculateResult(BANK_SOAL, answers, 'exam', null);
    expect(parseExamResult('100', BANK_SOAL)).toBeNull();
    expect(parseExamResult(JSON.stringify(exam), BANK_SOAL)).toEqual(exam);
    expect(parseExamResult(JSON.stringify({ ...exam, correctAnswers: 1 }), BANK_SOAL)).toBeNull();
    expect(parseExamResult(JSON.stringify({ ...exam, answers: {} }), BANK_SOAL)).toBeNull();
  });
});
