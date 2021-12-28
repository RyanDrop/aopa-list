interface ComponentOptions {
  selector: string;
  template?: string;
  style?: string;
}

export function Component(options: ComponentOptions) {
  return (constructor) => {
    const { selector, template, style } = options;
    const CustomElement = class extends HTMLElement {
      readonly styleComponent = style;
      public customConstructor;
      connectedCallback(): void {
        this.customConstructor = new constructor();
        this.customConstructor.$component = this;
        this.innerHTML = template ?? "";
        constructor.prototype.OnInit(this);
      }
    };
    customElements.define(selector, CustomElement);
  };
}
