import { afterEach, describe, expect, it, vi } from 'vitest';
import { setMuted } from './sound';
import { speakText } from './speech';

describe('mute controls speech as well as effects', () => {
  afterEach(() => { vi.unstubAllGlobals(); setMuted(false); });

  it('cancels current speech and blocks new utterances even when storage is unavailable', () => {
    const cancel = vi.fn();
    const speak = vi.fn();
    vi.stubGlobal('window', { speechSynthesis: { cancel, speak, getVoices: () => [] } });
    vi.stubGlobal('localStorage', { setItem: () => { throw new Error('blocked'); }, getItem: () => null });
    setMuted(true);
    speakText('sega');
    expect(cancel).toHaveBeenCalledOnce();
    expect(speak).not.toHaveBeenCalled();
  });
});
