import { HTML } from "./utils/html";
import { ScreenReader } from "./utils/screen-reader";
import { TextToSpeechService } from "./utils/text-to-speech";

function main() {
  const reader = new ScreenReader(new HTML(), new TextToSpeechService());
  reader.init();

  document.addEventListener("keydown", (e) => {
    if (reader.isReaderEnabled) {
      if (e.code === "ArrowRight") reader.jumpToNext();
      else if (e.code === "ArrowLeft") reader.jumpToPrevious();
      else if (e.code === "KeyS") reader.stopReading();
    } else {
      if (e.code === "KeyR" && !e.ctrlKey && !reader.isReaderEnabled) {
        reader.startReading();
      }
    }
  });
}

main();
