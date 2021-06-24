export function fontFamilyListener(fontFamilyService: FontFamilyService) {
  document.getElementById("font-family-service")?.addEventListener(
    "click",
    () => {
      fontFamilyService.changeFontFamily();
    },
    false
  );
}

export class FontFamilyService {
  private index = 0;
  private readonly body = document.body;
  private defaultFontFamily: string;

  constructor() {
    this.defaultFontFamily = this.getDefaultFontFamily();
  }

  private get fontFamilies(): string[] {
    return ["Courier New", "Arial", "monospace"];
  }

  changeFontFamily() {
    if (this.isIndexInRange()) {
      this.body.style.fontFamily = this.fontFamilies[this.index];
      this.index++;
    } else {
      this.resetFontFamily();
    }
  }

  private getDefaultFontFamily() {
    return window.getComputedStyle(document.getElementsByTagName("html")[0])
      .fontFamily;
  }

  private isIndexInRange() {
    return this.index < this.fontFamilies.length;
  }

  private resetFontFamily() {
    this.body.style.fontFamily = this.defaultFontFamily;
    this.index = 0;
  }
}
