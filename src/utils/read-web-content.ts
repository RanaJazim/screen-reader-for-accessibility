import { ScreenReader } from "./screen-reader";
import { ReaderKeys } from "./reader-keys";
import { HTML } from "./html";
import { TextToSpeechService } from "./text-to-speech";

export function readPageContentListenter(
  html: HTML,
  txtToSpeechService: TextToSpeechService
) {
  const reader = new ScreenReader(html, txtToSpeechService);
  reader.init();

  document.addEventListener("keydown", shortKeysToNavigateScreenReader(reader));
  document.getElementById("on-screen-reader-activate")?.addEventListener(
    "click",
    () => {
      console.log("clicked screen reader");

      if (reader.isReaderEnabled) {
        reader.stopReading();
      } else {
        reader.startReading();
      }
    },
    false
  );
}

export function shortKeysToNavigateScreenReader(reader: ScreenReader) {
  return (event: KeyboardEvent) => {
    if (reader.isReaderEnabled) {
      if (event.code === ReaderKeys.NEXT) reader.jumpToNext();
      else if (event.code === ReaderKeys.PREV) reader.jumpToPrevious();
      else if (event.code === ReaderKeys.STOP) reader.stopReading();
    } else {
      if (
        event.code === ReaderKeys.START &&
        !event.ctrlKey &&
        !reader.isReaderEnabled
      ) {
        reader.startReading();
      }
    }
  };
}
