import { ScreenReader } from "./screen-reader";
import { ReaderKeys } from "./reader-keys";

export function readWebPageContent(reader: ScreenReader) {
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
