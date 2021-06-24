import { FontFamilyService, fontFamilyListener } from "./font-family";
import { grayScaleListener, GrayScaleService } from "./grayscale";
import { IncreaseFontService, increaseFontListener } from "./increase-font";
import { wordSpacingListener, WordSpacingService } from "./word-spacing";

export function appBootstrap() {
  const fontService = new IncreaseFontService();
  const fontFamilyService = new FontFamilyService();
  const grayScaleService = new GrayScaleService();
  const wordSpacingService = new WordSpacingService();

  increaseFontListener(fontService);
  fontFamilyListener(fontFamilyService);
  grayScaleListener(grayScaleService);
  wordSpacingListener(wordSpacingService);
}
