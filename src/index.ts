import { HTML } from "./utils/html";
import { ScreenReader } from "./utils/screen-reader";
import { TextToSpeechService } from "./utils/text-to-speech";
import { readWebPageContent } from "./utils/read-web-content";
import { appBootstrap } from "./utils/app-bootstrap";

function main() {
  const reader = new ScreenReader(new HTML(), new TextToSpeechService());
  reader.init();

  document.addEventListener("keydown", readWebPageContent(reader));
  appBootstrap();
}

main();
