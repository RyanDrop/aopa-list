export class UtilsService {
  constructor() {}
  static elementClassToggleWithCondition($element, className, condition: boolean): void {
    const methodKeyName = condition ? "add" : "remove";
    $element.classList[methodKeyName](className);
  }
}
