import { HTML } from "./html";
import { MP3Service } from "./mp3";
import { TextToSpeechService } from "./text-to-speech";
import "../styles/screen-reader-style.css";

export class ScreenReader {
  private elements: Element[] = [];
  private index: number = 0;
  private isStop = true;
  private isEnabled = false;

  constructor(
    private readonly html: HTML,
    private readonly txtToSpeechService: TextToSpeechService
  ) {}

  public get domElements(): Element[] {
    return this.elements;
  }

  public get isStopReading(): boolean {
    return this.isStop;
  }

  public get isReaderEnabled(): boolean {
    return this.isEnabled;
  }

  init() {
    this.elements = this.html.getTagsWhichHaveContent();
  }

  async startReading() {
    this.setReaderEnabled();

    while (!this.isStopReading) {
      const currentElement = this.elements[this.index];
      await this.speechContentAndHightlightCurrentElement(currentElement);

      ++this.index;
      if (this.index >= this.domElements.length) this.index = 0;
    }
  }

  jumpToNext() {
    this.txtToSpeechService.cancel();
  }

  jumpToPrevious() {
    this.index = this.index - 2;
    this.txtToSpeechService.cancel();
  }

  stopReading() {
    this.isStop = true;
    this.isEnabled = false;

    this.txtToSpeechService.cancel();
    this.html.unstyleElement();
  }

  private setReaderEnabled() {
    this.isStop = false;
    this.isEnabled = true;
  }

  private async speechContentAndHightlightCurrentElement(element: Element) {
    const content = this.html.getTagContent(element);
    if (content) {
      this.html.styleElement(element);
      await MP3Service.play();
      await this.txtToSpeechService.say(content);
    }
  }
}
