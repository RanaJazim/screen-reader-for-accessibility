import { FontFamilyService, fontFamilyListener } from "./font-family";
import { grayScaleListener, GrayScaleService } from "./grayscale";
import { highlightLinkListener, HighlightLinkService } from "./highlight-link";
import { HTML } from "./html";
import { IncreaseFontService, increaseFontListener } from "./increase-font";
import { shortKeysToNavigateScreenReader } from "./read-web-content";
import { ScreenReader } from "./screen-reader";
import { TextToSpeechService } from "./text-to-speech";
import { wordSpacingListener, WordSpacingService } from "./word-spacing";

export function appBootstrap() {
  const fontService = new IncreaseFontService();
  const fontFamilyService = new FontFamilyService();
  const grayScaleService = new GrayScaleService();
  const wordSpacingService = new WordSpacingService();
  const highlightLinkService = new HighlightLinkService();
  const reader = new ScreenReader(new HTML(), new TextToSpeechService());
  reader.init();

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
  document.addEventListener("keydown", shortKeysToNavigateScreenReader(reader));

  increaseFontListener(fontService);
  fontFamilyListener(fontFamilyService);
  grayScaleListener(grayScaleService);
  wordSpacingListener(wordSpacingService);
  highlightLinkListener(highlightLinkService);
}
