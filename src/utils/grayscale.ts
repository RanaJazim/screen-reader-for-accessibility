export function grayScaleListener(grayScaleService: GrayScaleService) {
  document.getElementById("gray-scale-service")?.addEventListener(
    "click",
    () => {
      grayScaleService.applyGrayScale();
    },
    false
  );
}

export class GrayScaleService {
  private isGrayScale = false;
  private readonly body = document.body;

  applyGrayScale() {
    if (!this.isGrayScale) {
      this.body.style.filter = "grayscale(100%)";
      this.isGrayScale = true;
    } else {
      document.body.style.filter = "";
      this.isGrayScale = false;
    }
  }
}
