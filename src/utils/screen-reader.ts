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

  getDomElements() {
    // const bodyIndex = $("body").index("*");
    // const srcIndex = $("script").index("*");
    // return $("*").slice(bodyIndex + 1, srcIndex);
    return document.querySelectorAll("*");
  }

  setTabIndex() {
    const elem = this.getCurrentElem();
    $(elem).attr("tabindex", 0);
  }

  speak(elem) {
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

  getMsg() {
    return this.getTextWithoutAnyChildNodeText();
  }

  nextElement() {
    ++this.currentIndex;
    this.jumpToSpeakableElems();
    if (this.domElements[this.currentIndex])
      this.speak(this.domElements[this.currentIndex]);
  }

  setReaderCurrentState(state) {
    this.currentState = state;
  }

  generateSound() {
    // const sound = new Audio(audioFile);
    sound.play();
  }

  highlight() {
    const className = "screen-reader-border";

    const elem = this.getCurrentElem();
    $(`.${className}`).removeClass(className);
    $(elem).addClass(className);
  }

  removingStyleWhenReaderStops() {
    const className = "screen-reader-border";

    $(this.domElements[this.currentIndex]).blur();
    $(`.${className}`).removeClass(className);
  }

  jumpToSpeakableElems() {
    while (true) {
      const current = this.getCurrentElem();

      if (!current) break;

      const text = this.getTextWithoutAnyChildNodeText();

      console.log("speakable text", text);

      if (text) break;

      ++this.currentIndex;
    }
  }

  getTextWithoutAnyChildNodeText() {
    const currentElem = this.getCurrentElem();
    return $(currentElem).clone().children().remove().end().text().trim();
  }

  getCurrentElem() {
    return this.domElements[this.currentIndex];
  }
}

export default Reader;

// function ScreenReader() {
//   var currentIndex = 0;
//   var domElements = null;
//   var utterence;
//   var currentState;
//   var isEnabled = false;

//   function readFromStart() {
//     currentIndex = 0;
//     domElements = getDomElements();

//     console.log(domElements);

//     isEnabled = true;
//     setTabIndex();
//     setReaderCurrentState(readerStates.READING);
//     jumpToSpeakableElems();

//     speak(domElements[currentIndex]);
//   }

//   function readFromPrev() {
//     setReaderCurrentState(readerStates.READ_FROM_PREV_ELEM);
//     speechSynthesis.cancel();
//     currentIndex =
//       currentIndex === 0 ? domElements.length - 1 : currentIndex - 1;
//     speak(domElements[currentIndex]);
//   }

//   function readFromNext() {
//     setReaderCurrentState(readerStates.READ_FROM_NEXT_ELEM);
//     speechSynthesis.cancel();
//     currentIndex =
//       currentIndex >= domElements.length - 1 ? 0 : currentIndex + 1;
//     speak(domElements[currentIndex]);
//   }

//   function stop() {
//     isEnabled = false;
//     setReaderCurrentState(readerStates.PAUSE);
//     speechSynthesis.cancel();
//     removingStyleWhenReaderStops();
//   }

//   function isReaderEnabled() {
//     return isEnabled;
//   }

//   function getDomElements() {
//     // const bodyIndex = $("body").index("*");
//     // const srcIndex = $("script").index("*");
//     // return $("*").slice(bodyIndex + 1, srcIndex);
//     return document.querySelectorAll("*");
//   }

//   function setTabIndex() {
//     const elem = getCurrentElem();
//     $(elem).attr("tabindex", 0);
//   }

//   function speak(elem) {
//     console.log("element", elem);
//     setTabIndex();
//     $(elem).focus();
//     highlight();
//     generateSound();
//     utterence = new SpeechSynthesisUtterance(getMsg());
//     speechSynthesis.speak(utterence);
//     utterence.onend = () => {
//       if (currentState === readerStates.READING) {
//         nextElement();
//       } else {
//         setReaderCurrentState(readerStates.READING);
//       }
//     };
//   }

//   function getMsg() {
//     return getTextWithoutAnyChildNodeText();
//   }

//   function nextElement() {
//     ++currentIndex;
//     jumpToSpeakableElems();
//     if (domElements[currentIndex]) speak(domElements[currentIndex]);
//   }

//   function setReaderCurrentState(state) {
//     currentState = state;
//   }

//   function generateSound() {
//     // const sound = new Audio(audioFile);
//     sound.play();
//   }

//   function highlight() {
//     const className = "screen-reader-border";

//     const elem = getCurrentElem();
//     $(`.${className}`).removeClass(className);
//     $(elem).addClass(className);
//   }

//   function removingStyleWhenReaderStops() {
//     const className = "screen-reader-border";

//     $(domElements[currentIndex]).blur();
//     $(`.${className}`).removeClass(className);
//   }

//   function jumpToSpeakableElems() {
//     while (true) {
//       const current = getCurrentElem();

//       if (!current) break;

//       const text = getTextWithoutAnyChildNodeText();

//       console.log("speakable text", text);

//       if (text) break;

//       ++currentIndex;
//     }
//   }

//   function getTextWithoutAnyChildNodeText() {
//     const currentElem = getCurrentElem();
//     return $(currentElem).clone().children().remove().end().text().trim();
//   }

//   function getCurrentElem() {
//     return domElements[currentIndex];
//   }

//   return { readFromStart, readFromPrev, readFromNext, stop, isReaderEnabled };
// }

// export default ScreenReader;
