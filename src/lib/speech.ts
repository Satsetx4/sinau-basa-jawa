// Helper for clear Speech Synthesis of Javanese/Indonesian pronunciation
export const speakText = (text: string, lang = 'id-ID') => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.86; // Kecepatan ramah anak SD kelas 3
    utterance.pitch = 1.05; // Sedikit ceria dan renyah

    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.startsWith('jv'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
  }
};
