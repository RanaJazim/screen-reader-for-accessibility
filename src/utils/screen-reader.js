import $ from "jquery";
import audioFile from "./element_sound.mp3";
import "../styles/screen-reader-style.css";

const readerStates = {
  READING: "reading",
  READ_FROM_PREV_ELEM: "reading from prev element",
  READ_FROM_NEXT_ELEM: "reading from next element",
  PAUSE: "pause",
};

const sound = new Audio(audioFile);

function ScreenReader() {
  var currentIndex = 0;
  var domElements = null;
  var utterence;
  var currentState;
  var isEnabled = false;

  function readFromStart() {
    currentIndex = 0;
    domElements = getDomElements();

    console.log(domElements);

    isEnabled = true;
    setTabIndex();
    setReaderCurrentState(readerStates.READING);
    jumpToSpeakableElems();

    speak(domElements[currentIndex]);
  }

  function readFromPrev() {
    setReaderCurrentState(readerStates.READ_FROM_PREV_ELEM);
    speechSynthesis.cancel();
    currentIndex =
      currentIndex === 0 ? domElements.length - 1 : currentIndex - 1;
    speak(domElements[currentIndex]);
  }

  function readFromNext() {
    setReaderCurrentState(readerStates.READ_FROM_NEXT_ELEM);
    speechSynthesis.cancel();
    currentIndex =
      currentIndex >= domElements.length - 1 ? 0 : currentIndex + 1;
    speak(domElements[currentIndex]);
  }

  function stop() {
    isEnabled = false;
    setReaderCurrentState(readerStates.PAUSE);
    speechSynthesis.cancel();
    removingStyleWhenReaderStops();
  }

  function isReaderEnabled() {
    return isEnabled;
  }

  function getDomElements() {
    // const bodyIndex = $("body").index("*");
    // const srcIndex = $("script").index("*");
    // return $("*").slice(bodyIndex + 1, srcIndex);
    return document.querySelectorAll("*");
  }

  function setTabIndex() {
    const elem = getCurrentElem();
    $(elem).attr("tabindex", 0);
  }

  function speak(elem) {
    console.log("element", elem);
    setTabIndex();
    $(elem).focus();
    highlight();
    generateSound();
    utterence = new SpeechSynthesisUtterance(getMsg());
    speechSynthesis.speak(utterence);
    utterence.onend = () => {
      if (currentState === readerStates.READING) {
        nextElement();
      } else {
        setReaderCurrentState(readerStates.READING);
      }
    };
  }

  function getMsg() {
    return getTextWithoutAnyChildNodeText();
  }

  function nextElement() {
    ++currentIndex;
    jumpToSpeakableElems();
    if (domElements[currentIndex]) speak(domElements[currentIndex]);
  }

  function setReaderCurrentState(state) {
    currentState = state;
  }

  function generateSound() {
    // const sound = new Audio(audioFile);
    sound.play();
  }

  function highlight() {
    const className = "screen-reader-border";

    const elem = getCurrentElem();
    $(`.${className}`).removeClass(className);
    $(elem).addClass(className);
  }

  function removingStyleWhenReaderStops() {
    const className = "screen-reader-border";

    $(domElements[currentIndex]).blur();
    $(`.${className}`).removeClass(className);
  }

  function jumpToSpeakableElems() {
    while (true) {
      const current = getCurrentElem();

      if (!current) break;

      const text = getTextWithoutAnyChildNodeText();

      console.log("speakable text", text);

      if (text) break;

      ++currentIndex;
    }
  }

  function getTextWithoutAnyChildNodeText() {
    const currentElem = getCurrentElem();
    return $(currentElem).clone().children().remove().end().text().trim();
  }

  function getCurrentElem() {
    return domElements[currentIndex];
  }

  return { readFromStart, readFromPrev, readFromNext, stop, isReaderEnabled };
}

export default ScreenReader;
