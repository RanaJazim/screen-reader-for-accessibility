import { FontFamilyService, fontFamilyListener } from "./font-family";
import { grayScaleListener, GrayScaleService } from "./grayscale";
import { IncreaseFontService, increaseFontListener } from "./increase-font";

export function appBootstrap() {
  const fontService = new IncreaseFontService();
  const fontFamilyService = new FontFamilyService();
  const grayScaleService = new GrayScaleService();

  increaseFontListener(fontService);
  fontFamilyListener(fontFamilyService);
  grayScaleListener(grayScaleService);
}
