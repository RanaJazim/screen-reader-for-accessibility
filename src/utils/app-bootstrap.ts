import { IncreaseFontService, increaseFontListener } from "./increase-font";

export function appBootstrap() {
  const fontService = new IncreaseFontService();

  increaseFontListener(fontService);
}
