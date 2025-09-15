// Web Audio API 기반 효과음 시스템
class AudioManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private volume: number = 0.7;

  constructor() {
    // 사용자 상호작용 후 AudioContext 초기화
    this.initializeOnInteraction();
  }

  private initializeOnInteraction() {
    const initAudio = () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.generateSounds();
        document.removeEventListener('click', initAudio);
        document.removeEventListener('touchstart', initAudio);
        document.removeEventListener('keydown', initAudio);
      }
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('touchstart', initAudio);
    document.addEventListener('keydown', initAudio);
  }

  private generateSounds() {
    if (!this.audioContext) return;

    // 재료 클릭 소리 (부드러운 팝)
    this.sounds.set('ingredient-click', this.generateTone(800, 0.1, 'sine'));
    
    // 올바른 재료 소리 (상승음)
    this.sounds.set('correct-ingredient', this.generateTone(600, 0.15, 'triangle'));
    
    // 잘못된 재료 소리 (부정적 톤)
    this.sounds.set('wrong-ingredient', this.generateNoise(0.2));
    
    // 주문 완성 소리 (성공음)
    this.sounds.set('order-complete', this.generateChord([523, 659, 784], 0.5));
    
    // 퀴즈 정답 소리 (승리음)
    this.sounds.set('quiz-correct', this.generateMelody([523, 659, 784, 1047], 0.3));
    
    // 퀴즈 오답 소리 (실패음)
    this.sounds.set('quiz-wrong', this.generateDescendingTone(400, 200, 0.4));
    
    // 라운드 시작 카운트다운
    this.sounds.set('countdown', this.generateTone(880, 0.3, 'square'));
    
    // 게임 시작
    this.sounds.set('game-start', this.generateTone(1047, 0.5, 'triangle'));
    
    // 콤보 소리
    this.sounds.set('combo', this.generateRisingMelody([440, 554, 659, 831], 0.4));
    
    // 시간 초과
    this.sounds.set('timeout', this.generateWarningTone(0.6));
  }

  private generateTone(frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const angle = (i / this.audioContext.sampleRate) * frequency * 2 * Math.PI;
      let sample = 0;
      
      switch (type) {
        case 'sine':
          sample = Math.sin(angle);
          break;
        case 'triangle':
          sample = (2 / Math.PI) * Math.asin(Math.sin(angle));
          break;
        case 'square':
          sample = Math.sign(Math.sin(angle));
          break;
        case 'sawtooth':
          sample = (2 / Math.PI) * (angle % (2 * Math.PI) - Math.PI);
          break;
      }
      
      // 볼륨 엔벨로프 적용
      const envelope = Math.exp(-i / (this.audioContext.sampleRate * 0.3));
      data[i] = sample * envelope * 0.3;
    }
    
    return buffer;
  }

  private generateChord(frequencies: number[], duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      let sample = 0;
      frequencies.forEach(freq => {
        const angle = (i / this.audioContext!.sampleRate) * freq * 2 * Math.PI;
        sample += Math.sin(angle) / frequencies.length;
      });
      
      const envelope = Math.exp(-i / (this.audioContext.sampleRate * 0.5));
      data[i] = sample * envelope * 0.4;
    }
    
    return buffer;
  }

  private generateMelody(frequencies: number[], noteDuration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const totalDuration = frequencies.length * noteDuration;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * totalDuration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    const samplesPerNote = Math.floor(this.audioContext.sampleRate * noteDuration);
    
    frequencies.forEach((freq, noteIndex) => {
      const startSample = noteIndex * samplesPerNote;
      for (let i = 0; i < samplesPerNote && startSample + i < data.length; i++) {
        const angle = (i / this.audioContext!.sampleRate) * freq * 2 * Math.PI;
        const envelope = Math.exp(-i / (this.audioContext!.sampleRate * 0.2));
        data[startSample + i] = Math.sin(angle) * envelope * 0.3;
      }
    });
    
    return buffer;
  }

  private generateRisingMelody(frequencies: number[], totalDuration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * totalDuration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    const noteDuration = totalDuration / frequencies.length;
    const samplesPerNote = Math.floor(this.audioContext.sampleRate * noteDuration);
    
    frequencies.forEach((freq, noteIndex) => {
      const startSample = noteIndex * samplesPerNote;
      for (let i = 0; i < samplesPerNote && startSample + i < data.length; i++) {
        const angle = (i / this.audioContext!.sampleRate) * freq * 2 * Math.PI;
        const envelope = 1 - (i / samplesPerNote); // 각 음표가 페이드아웃
        data[startSample + i] = Math.sin(angle) * envelope * 0.4;
      }
    });
    
    return buffer;
  }

  private generateDescendingTone(startFreq: number, endFreq: number, duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const progress = i / data.length;
      const frequency = startFreq + (endFreq - startFreq) * progress;
      const angle = (i / this.audioContext.sampleRate) * frequency * 2 * Math.PI;
      const envelope = Math.exp(-i / (this.audioContext.sampleRate * 0.4));
      data[i] = Math.sin(angle) * envelope * 0.3;
    }
    
    return buffer;
  }

  private generateWarningTone(duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const time = i / this.audioContext.sampleRate;
      const frequency = 220 + Math.sin(time * 8) * 50; // 진동하는 주파수
      const angle = time * frequency * 2 * Math.PI;
      const envelope = Math.sin(time * Math.PI / duration); // 사인파 엔벨로프
      data[i] = Math.sin(angle) * envelope * 0.4;
    }
    
    return buffer;
  }

  private generateNoise(duration: number): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const envelope = Math.exp(-i / (this.audioContext.sampleRate * 0.1));
      data[i] = (Math.random() * 2 - 1) * envelope * 0.2;
    }
    
    return buffer;
  }

  public play(soundName: string, volume: number = 1) {
    if (!this.audioContext || !this.sounds.has(soundName)) return;

    try {
      const buffer = this.sounds.get(soundName)!;
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = this.volume * volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start(0);
    } catch (error) {
      console.warn('오디오 재생 실패:', error);
    }
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  public getVolume(): number {
    return this.volume;
  }
}

// 전역 오디오 매니저 인스턴스
const audioManager = new AudioManager();

// 게임 효과음 재생 함수들
export const playSound = {
  ingredientClick: () => audioManager.play('ingredient-click'),
  correctIngredient: () => audioManager.play('correct-ingredient'),
  wrongIngredient: () => audioManager.play('wrong-ingredient'),
  orderComplete: () => audioManager.play('order-complete'),
  quizCorrect: () => audioManager.play('quiz-correct'),
  quizWrong: () => audioManager.play('quiz-wrong'),
  countdown: () => audioManager.play('countdown'),
  gameStart: () => audioManager.play('game-start'),
  combo: () => audioManager.play('combo'),
  timeout: () => audioManager.play('timeout'),
};

export { audioManager };