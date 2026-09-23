// Safe localStorage helper for Sinau Basa Jawa
// Ensures defensive error handling (e.g. incognito/iframe restrictions)
// and clean separation of state keys with 0 hardcoded fallback values.

export const STORAGE_KEYS = {
  DARK_MODE: 'sinau_jawa_dark_mode',
  STUDENT_NAME: 'sinau_jawa_student_name',
  STARS: 'sinau_jawa_stars',
  LAST_EXAM_SCORE: 'sinau_jawa_last_exam_score',
  EXAM_RESULT: 'sinau_jawa_exam_result_v1',
  COMPLETED_TOPICS: 'sinau_jawa_completed_topics',
  ACHIEVEMENTS: 'sinau_jawa_achievements_v1',
  ACTIVE_TAB: 'sinau_jawa_active_tab_v1',
  ACTIVE_TOPIC: 'sinau_jawa_active_topic_v1',
  QUIZ_DRAFT: 'sinau_jawa_quiz_draft_v1',
  SOUND_MUTED: 'sinau_basa_jawa_sound_muted',
} as const;

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn('safeStorage.setItem error:', e);
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn('safeStorage.removeItem error:', e);
    }
  },
  clearAllProgress: (): void => {
    Object.values(STORAGE_KEYS)
      .filter(key => key !== STORAGE_KEYS.DARK_MODE && key !== STORAGE_KEYS.SOUND_MUTED)
      .forEach(key => safeStorage.removeItem(key));
  },
};
