import $ from "jquery";
// @ts-ignore
import audioFile from "./element_sound.mp3";
import "../styles/screen-reader-style.css";
// const audioFile = require("./element_sound.mp3");

const readerStates = {
  READING: "reading",
  READ_FROM_PREV_ELEM: "reading from prev element",
  READ_FROM_NEXT_ELEM: "reading from next element",
  PAUSE: "pause",
};

const sound = new Audio(audioFile);

class Reader {
  private currentIndex = 0;
  private domElements;
  private utterence;
  private currentState;
  private isEnabled = false;

  public readFromStart() {
    this.currentIndex = 0;
    this.domElements = this.getDomElements();

    console.log(this.domElements);

    this.isEnabled = true;
    this.setTabIndex();
    this.setReaderCurrentState(readerStates.READING);
    this.jumpToSpeakableElems();

    this.speak(this.domElements[this.currentIndex]);
  }

  public readFromPrev() {
    this.setReaderCurrentState(readerStates.READ_FROM_PREV_ELEM);
    speechSynthesis.cancel();
    this.currentIndex =
      this.currentIndex === 0
        ? this.domElements.length - 1
        : this.currentIndex - 1;
    this.speak(this.domElements[this.currentIndex]);
  }

  public readFromNext() {
    this.setReaderCurrentState(readerStates.READ_FROM_NEXT_ELEM);
    speechSynthesis.cancel();
    this.currentIndex =
      this.currentIndex >= this.domElements.length - 1
        ? 0
        : this.currentIndex + 1;
    this.speak(this.domElements[this.currentIndex]);
  }

  public stop() {
    this.isEnabled = false;
    this.setReaderCurrentState(readerStates.PAUSE);
    speechSynthesis.cancel();
    this.removingStyleWhenReaderStops();
  }

  public isReaderEnabled() {
    return this.isEnabled;
  }

  private getDomElements() {
    // const bodyIndex = $("body").index("*");
    // const srcIndex = $("script").index("*");
    // return $("*").slice(bodyIndex + 1, srcIndex);
    return document.querySelectorAll("*");
  }

  private setTabIndex() {
    const elem = this.getCurrentElem();
    $(elem).attr("tabindex", 0);
  }

  private speak(elem) {
    console.log("element", elem);
    this.setTabIndex();
    $(elem).focus();
    this.highlight();
    this.generateSound();
    this.utterence = new SpeechSynthesisUtterance(this.getMsg());
    speechSynthesis.speak(this.utterence);
    this.utterence.onend = () => {
      if (this.currentState === readerStates.READING) {
        this.nextElement();
      } else {
        this.setReaderCurrentState(readerStates.READING);
      }
    };
  }

  private getMsg() {
    return this.getTextWithoutAnyChildNodeText();
  }

  private nextElement() {
    ++this.currentIndex;
    this.jumpToSpeakableElems();
    if (this.domElements[this.currentIndex])
      this.speak(this.domElements[this.currentIndex]);
  }

  private setReaderCurrentState(state) {
    this.currentState = state;
  }

  private generateSound() {
    // const sound = new Audio(audioFile);
    sound.play();
  }

  private highlight() {
    const className = "screen-reader-border";

    const elem = this.getCurrentElem();
    $(`.${className}`).removeClass(className);
    $(elem).addClass(className);
  }

  private removingStyleWhenReaderStops() {
    const className = "screen-reader-border";

    $(this.domElements[this.currentIndex]).blur();
    $(`.${className}`).removeClass(className);
  }

  private jumpToSpeakableElems() {
    while (true) {
      const current = this.getCurrentElem();

      if (!current) break;

      const text = this.getTextWithoutAnyChildNodeText();

      console.log("speakable text", text);

      if (text) break;

      ++this.currentIndex;
    }
  }

  private getTextWithoutAnyChildNodeText() {
    const currentElem = this.getCurrentElem();

    const elem = $(currentElem).contents();
    console.log("elem", elem.get(0));
    return elem.get(0).nodeValue.trim();

    // return $(currentElem).clone().children().remove().end().text().trim();
  }

  private getCurrentElem() {
    return this.domElements[this.currentIndex];
  }
}

export default Reader;

export class ScreenReader {
  private elements: Element[] = [];
  private index: number = 0;

  public get domElements(): Element[] {
    return this.elements;
  }

  init() {
    const allElements = this.getAllDOMElements();
    const elementsExcludeGeneralTags =
      this.getAllDOMElementsExcludeGeneralTag(allElements);
    this.elements = this.getTagsWhichHaveContent(elementsExcludeGeneralTags);
  }

  private getAllDOMElements() {
    return document.querySelectorAll("*");
  }

  private getAllDOMElementsExcludeGeneralTag(allTags: NodeListOf<Element>) {
    const elements: Element[] = [];
    const generalTags = [
      "html",
      "head",
      "meta",
      "title",
      "script",
      "body",
      "style",
    ];

    allTags.forEach((tag) => {
      const tagType = tag.nodeName.toLowerCase();

      if (!generalTags.includes(tagType)) {
        elements.push(tag);
      }
    });

    return elements;
  }

  private getTagsWhichHaveContent(tags: Element[]) {
    const elements: Element[] = [];

    tags.forEach((tag) => {
      const tagContent = this.getTagContent(tag);

      if (tagContent) {
        elements.push(tag);
      }
    });

    return elements;
  }

  private getTagContent(tag: Element) {
    const element = $(tag).contents().get(0);
    if (!element) return undefined;
    return element.nodeValue?.trim();
  }
}
