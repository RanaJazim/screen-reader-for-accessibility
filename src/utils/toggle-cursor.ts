export function toggleCursorListener(toggleCursorService: ToggleCursorService) {
  document.getElementById("toggle-cursor-service")?.addEventListener(
    "click",
    () => {
      toggleCursorService.toggleCursor();
    },
    false
  );
}

export class ToggleCursorService {
  private cursorValue = "default";
  private firstTimeToggle = true;
  private cursorInnerCircle = document.getElementById("inner-cursor");
  private cursorOuterCircle = document.getElementById("outer-cursor");

  toggleCursor() {
    if (this.cursorValue == "default") {
      this.cursorValue = "animated";

      // @ts-ignore
      this.cursorInnerCircle?.style.visibility = "visible";
      // @ts-ignore
      this.cursorOuterCircle?.style.visibility = "visible";
      document.body.style.cursor = "none";

      if (this.firstTimeToggle) {
        this.addScript(
          "./animate-small-dot-cursor.js",
          "animateSmallDotCursor"
        ); //for animating the small dot cursor
        this.addScript(
          "assets/js/set-cursor-on-canvas.js",
          "setCursorOnCanvas"
        ); //for setting the cursor on the canvas
        this.firstTimeToggle = false;
      }
    } else {
      // @ts-ignore
      this.cursorInnerCircle?.style.visibility = "hidden";
      // @ts-ignore
      this.cursorOuterCircle?.style.visibility = "hidden";
      document.body.style.cursor = "default";

      this.cursorValue = "default";
    }
  }

  private addScript(src, id) {
    var s = document.createElement("script");
    s.setAttribute("src", src);
    s.setAttribute("id", id);
    document.body.appendChild(s);
    document.body.style.cursor = "none";
  }
}
