import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightNegativeCurrency]',
  standalone: false,
})
export class HighlightNegativeCurrencyDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    const text = this.el.nativeElement.textContent.trim();
    const currencyValue = this.parseCurrency(text);

    if (currencyValue < 0) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    }
  }

  private parseCurrency(value: string): number {
    const numberString = value.replace(/[^0-9.-]/g, '');
    return parseFloat(numberString);
  }
}
