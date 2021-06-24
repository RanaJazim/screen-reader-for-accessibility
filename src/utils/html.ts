import $ from "jquery";

export class HTML {
  private prevElement: Element | undefined;
  private styleClassname = "screen-reader-border";

  getTagsWhichHaveContent(): Element[] {
    const tags: Element[] = this.getAllDOMElementsExcludeGeneralTag();
    const elements: Element[] = [];

    tags.forEach((tag) => {
      const tagContent = this.getTagContent(tag);

      if (tagContent) {
        elements.push(tag);
      }
    });

    return elements;
  }

  getTagContent(tag: Element): string | undefined {
    const element = $(tag).contents().get(0);
    if (!element) return undefined;
    return element.nodeValue?.trim();
  }

  styleElement(element: Element): void {
    this.unstyleElement();
    $(element).addClass(this.styleClassname);

    this.prevElement = element;
  }

  unstyleElement(): void {
    if (this.prevElement) {
      $(this.prevElement).removeClass(this.styleClassname);
    }
  }

  private getAllDOMElementsExcludeGeneralTag() {
    const allTags: NodeListOf<Element> = this.getAllDOMElements();

    const elements: Element[] = [];
    const generalTags = [
      "html",
      "head",
      "meta",
      "title",
      "script",
      "body",
      "style",
    ];

    allTags.forEach((tag) => {
      const tagType = tag.nodeName.toLowerCase();

      if (!generalTags.includes(tagType)) {
        elements.push(tag);
      }
    });

    return elements;
  }

  private getAllDOMElements() {
    return document.querySelectorAll("*");
  }
}
