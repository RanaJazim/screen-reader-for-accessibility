export function highlightLinkListener(
  higlightLinkService: HighlightLinkService
) {
  document.getElementById("highlight-link-service")?.addEventListener(
    "click",
    () => {
      higlightLinkService.highlight();
    },
    false
  );
}

export class HighlightLinkService {
  private isClicked = false;

  highlight() {
    let link = document.getElementsByTagName("a");

    // loop through it, since its an  HTMLCollection
    if (!this.isClicked) {
      for (let i = 0; i < link.length; i++) {
        if (link[i].href.includes("")) {
          //link[i].classList.add("highlight");

          // change the link background color
          link[i].style.backgroundColor = "#1560bd";

          // change the text color
          link[i].style.color = "#ffffff";

          // change the font weight
          link[i].style.fontWeight = "bold";
        }
      }
      this.isClicked = !this.isClicked;
    } else {
      for (let i = 0; i < link.length; i++) {
        if (link[i].href.includes("")) {
          //link[i].classList.add("highlight");

          // change the link background color
          link[i].style.backgroundColor = "";

          // change the text color
          link[i].style.color = "";

          // change the font weight
          link[i].style.fontWeight = "";
        }
      }
      this.isClicked = !this.isClicked;
    }
  }
}
