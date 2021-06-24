export function wordSpacingListener(wordSpacingService: WordSpacingService) {
  document.getElementById("word-spacing-service")?.addEventListener(
    "click",
    () => {
      wordSpacingService.applyWordSpacing();
    },
    false
  );
}

export class WordSpacingService {
  private wordSpaceCount = 1;
  private readonly maxWordSpaceCount = 5;

  applyWordSpacing() {
    if (this.wordSpaceCount < this.maxWordSpaceCount) {
      document.getElementsByTagName("body")[0].style.wordSpacing = `${
        this.wordSpaceCount * 10
      }px`;
      this.wordSpaceCount++;
    } else {
      document.getElementsByTagName("body")[0].style.wordSpacing = "";
      this.wordSpaceCount = 1;
    }
  }
}
