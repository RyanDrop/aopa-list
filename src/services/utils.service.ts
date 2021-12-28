export class UtilsService {
  constructor() {}
  static elementClassToggleWithCondition($element, className, condition: boolean): void {
    const methodKeyName = condition ? "add" : "remove";
    $element.classList[methodKeyName](className);
  }

  static createElementWithText(tagName: string, text: string): HTMLElement {
    const element = document.createElement(tagName);
    element.textContent = text;
    return element;
  }
}
