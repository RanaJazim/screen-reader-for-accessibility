import { FontFamilyService, fontFamilyListener } from "./font-family";
import { grayScaleListener, GrayScaleService } from "./grayscale";
import { highlightLinkListener, HighlightLinkService } from "./highlight-link";
import { HTML } from "./html";
import { IncreaseFontService, increaseFontListener } from "./increase-font";
import { readPageContentListenter } from "./read-web-content";
import { TextToSpeechService } from "./text-to-speech";
import { wordSpacingListener, WordSpacingService } from "./word-spacing";
// import { toggleCursorListener, ToggleCursorService } from "./toggle-cursor";

export function appBootstrap() {
  const fontService = new IncreaseFontService();
  const fontFamilyService = new FontFamilyService();
  const grayScaleService = new GrayScaleService();
  const wordSpacingService = new WordSpacingService();
  const highlightLinkService = new HighlightLinkService();

  readPageContentListenter(new HTML(), new TextToSpeechService());
  increaseFontListener(fontService);
  fontFamilyListener(fontFamilyService);
  grayScaleListener(grayScaleService);
  wordSpacingListener(wordSpacingService);
  highlightLinkListener(highlightLinkService);
}
