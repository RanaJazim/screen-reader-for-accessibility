import { ScreenReader } from "./screen-reader";

export function readWebPageContent(reader: ScreenReader) {
  return (event: KeyboardEvent) => {
    if (reader.isReaderEnabled) {
      if (event.code === "ArrowRight") reader.jumpToNext();
      else if (event.code === "ArrowLeft") reader.jumpToPrevious();
      else if (event.code === "KeyS") reader.stopReading();
    } else {
      if (event.code === "KeyR" && !event.ctrlKey && !reader.isReaderEnabled) {
        reader.startReading();
      }
    }
  };
}
