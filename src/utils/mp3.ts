// @ts-ignore
import audioFile from "./element_sound.mp3";

export class MP3Service {
  private static audio: HTMLAudioElement | undefined;

  private constructor() {}

  static async play() {
    this.init();

    this.audio?.play();
  }

  private static init() {
    if (!this.audio) {
      this.audio = new Audio(audioFile);
    }
  }
}
