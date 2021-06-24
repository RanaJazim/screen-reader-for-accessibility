export function increaseFontListener(increaseFontService: IncreaseFontService) {
  document.getElementById("increase-font-service")?.addEventListener(
    "click",
    () => {
      increaseFontService.increaseFont();
    },
    false
  );
}

export class IncreaseFontService {
  private count = 1;
  private readonly maxCount = 3;
  private readonly body = document.body;
  private defaultFontSize: number;

  constructor() {
    this.defaultFontSize = this.getDefaultFontSizeOfDocument();
  }

  private getDefaultFontSizeOfDocument() {
    const defaultSize = +window
      .getComputedStyle(document.getElementsByTagName("html")[0])
      .fontSize.split("px")[0];

    return defaultSize;
  }

  increaseFont() {
    if (this.count < this.maxCount) {
      this.body.style.fontSize = this.getNewFontSize() + "px";
      ++this.count;
    } else {
      this.resetFont();
    }

    console.log(this.body.style.fontSize);
  }

  private getNewFontSize() {
    return this.count * 5 + this.defaultFontSize;
  }

  private resetFont() {
    this.count = 1;
    this.body.style.fontSize = this.defaultFontSize.toString() + "px";
  }
}
