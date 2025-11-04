// 오디오 유틸리티 함수들

class AudioManager {
  private audioContext: AudioContext | null = null;
  private masterVolume = 0.3;
  private sfxVolume = 0.5;
  private musicVolume = 0.2;
  private backgroundMusic: HTMLAudioElement | null = null;

  // AudioContext 초기화
  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // 효과음 생성 및 재생
  private playTone(frequency: number, duration: number, volume: number = 0.3, type: OscillatorType = 'sine') {
    try {
      const ctx = this.initAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * this.sfxVolume * this.masterVolume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  // 재료 클릭 효과음
  playIngredientClick() {
    this.playTone(800, 0.1, 0.2, 'square');
  }

  // 성공 효과음 (올바른 재료) - 더 밝고 짧은 소리
  playSuccess() {
    this.playTone(880, 0.1, 0.3, 'sine');  // A5 - 높고 깨끗한 음
  }

  // 실패 효과음 (잘못된 재료) - 낮고 거친 소리
  playError() {
    this.playTone(150, 0.2, 0.3, 'sawtooth');
  }

  // 햄버거 완성 효과음
  playBurgerComplete() {
    setTimeout(() => this.playTone(523, 0.2, 0.4), 0);   // C5
    setTimeout(() => this.playTone(659, 0.2, 0.4), 150); // E5
    setTimeout(() => this.playTone(784, 0.2, 0.4), 300); // G5
    setTimeout(() => this.playTone(1047, 0.4, 0.5), 450); // C6
  }

  // 퀴즈 정답 효과음
  playQuizCorrect() {
    setTimeout(() => this.playTone(659, 0.15, 0.4), 0);   // E5
    setTimeout(() => this.playTone(784, 0.15, 0.4), 100); // G5
    setTimeout(() => this.playTone(1047, 0.15, 0.4), 200); // C6
    setTimeout(() => this.playTone(1319, 0.3, 0.5), 300);  // E6
  }

  // 퀴즈 오답 효과음
  playQuizWrong() {
    setTimeout(() => this.playTone(330, 0.2, 0.4), 0);   // E4
    setTimeout(() => this.playTone(294, 0.2, 0.4), 150); // D4
    setTimeout(() => this.playTone(262, 0.4, 0.5), 300); // C4
  }

  // 콤보 달성 효과음
  playCombo(comboCount: number) {
    const baseFreq = 523; // C5
    for (let i = 0; i < comboCount && i < 5; i++) {
      setTimeout(() => {
        this.playTone(baseFreq * Math.pow(1.2, i), 0.15, 0.4 + i * 0.1);
      }, i * 80);
    }
  }

  // 카운트다운 효과음
  playCountdown(count: number) {
    if (count > 0) {
      this.playTone(880, 0.2, 0.3); // A5
    } else {
      this.playTone(1047, 0.5, 0.5); // C6 - Go!
    }
  }

  // 게임 승리 효과음
  playVictory() {
    const melody = [523, 659, 784, 1047, 1319]; // C-E-G-C-E
    melody.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.3, 0.4), i * 200);
    });
  }

  // 배경음악 시작 (긴장감 있는 리듬)
  startBackgroundMusic() {
    this.stopBackgroundMusic();
    this.createBackgroundMusic();
  }

  private createBackgroundMusic() {
    try {
      const ctx = this.initAudioContext();

      // 단순한 드럼 비트와 베이스라인 생성
      const playBeat = () => {
        // 킥 드럼 (낮은 주파수)
        setTimeout(() => this.playTone(60, 0.1, this.musicVolume * 0.8, 'sine'), 0);
        setTimeout(() => this.playTone(60, 0.1, this.musicVolume * 0.8, 'sine'), 500);

        // 스네어 (높은 주파수 노이즈)
        setTimeout(() => this.playTone(200, 0.05, this.musicVolume * 0.4, 'square'), 250);
        setTimeout(() => this.playTone(200, 0.05, this.musicVolume * 0.4, 'square'), 750);

        // 베이스라인 (간단한 패턴)
        setTimeout(() => this.playTone(110, 0.15, this.musicVolume * 0.3, 'sawtooth'), 0);
        setTimeout(() => this.playTone(146, 0.15, this.musicVolume * 0.3, 'sawtooth'), 250);
        setTimeout(() => this.playTone(110, 0.15, this.musicVolume * 0.3, 'sawtooth'), 500);
        setTimeout(() => this.playTone(98, 0.15, this.musicVolume * 0.3, 'sawtooth'), 750);
      };

      // 1초마다 비트 반복
      const beatInterval = setInterval(playBeat, 1000);

      // 컴포넌트 언마운트시 정리할 수 있도록 참조 저장
      (window as any).__backgroundMusicInterval = beatInterval;

    } catch (error) {
      console.warn('Background music failed:', error);
    }
  }

  // 배경음악 정지
  stopBackgroundMusic() {
    if ((window as any).__backgroundMusicInterval) {
      clearInterval((window as any).__backgroundMusicInterval);
      (window as any).__backgroundMusicInterval = null;
    }
  }

  // 볼륨 조절
  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  // 사용자 상호작용 후 AudioContext 활성화
  async resumeAudioContext() {
    try {
      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    } catch (error) {
      console.warn('Failed to resume audio context:', error);
    }
  }
}

// 싱글톤 인스턴스 생성
export const audioManager = new AudioManager();

// 편의 함수들 export
export const playIngredientClick = () => audioManager.playIngredientClick();
export const playSuccess = () => audioManager.playSuccess();
export const playError = () => audioManager.playError();
export const playBurgerComplete = () => audioManager.playBurgerComplete();
export const playQuizCorrect = () => audioManager.playQuizCorrect();
export const playQuizWrong = () => audioManager.playQuizWrong();
export const playCombo = (count: number) => audioManager.playCombo(count);
export const playCountdown = (count: number) => audioManager.playCountdown(count);
export const playVictory = () => audioManager.playVictory();
export const startBackgroundMusic = () => audioManager.startBackgroundMusic();
export const stopBackgroundMusic = () => audioManager.stopBackgroundMusic();
export const resumeAudioContext = () => audioManager.resumeAudioContext();