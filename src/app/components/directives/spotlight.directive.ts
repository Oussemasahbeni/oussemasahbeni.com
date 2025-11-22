import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
})
export class SpotlightDirective implements AfterViewInit, OnDestroy {
  private unlistener: (() => void) | undefined;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  ngAfterViewInit() {
    this.unlistener = this.renderer.listen(
      this.el.nativeElement,
      'mousemove',
      (event: MouseEvent) => {
        this.handleMouseMove(event);
      }
    );
  }

  ngOnDestroy() {
    if (this.unlistener) {
      this.unlistener();
    }
  }

  private handleMouseMove(event: MouseEvent) {
    const cards = this.el.nativeElement.children;

    for (const element of cards) {
      const card = element as HTMLElement;
      // getBoundingClientRect() tells us exactly where this specific card
      // is positioned on the user's screen (pixels from top, pixels from left).
      const rect = card.getBoundingClientRect();

      // Calculate mouse position relative to the card
      // event.clientX = Mouse position on the whole screen (e.g., 500px)
      // rect.left     = Card's left edge position (e.g., 400px)
      // Result: x = 100px. The mouse is 100px inside the card.
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Update CSS variables on the card element directly
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  }
}
