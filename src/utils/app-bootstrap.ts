import { FontFamilyService, fontFamilyListener } from "./font-family";
import { IncreaseFontService, increaseFontListener } from "./increase-font";

export function appBootstrap() {
  const fontService = new IncreaseFontService();
  const fontFamilyService = new FontFamilyService();

  increaseFontListener(fontService);
  fontFamilyListener(fontFamilyService);
}
