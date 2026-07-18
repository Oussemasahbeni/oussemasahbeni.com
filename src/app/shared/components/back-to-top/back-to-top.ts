import { ViewportScroller } from '@angular/common';
import {
  Component,
  DOCUMENT,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-back-to-top',
  imports: [HlmButtonImports, NgIcon],
  providers: [provideIcons({ lucideArrowUp })],
  template: `@if (isVisible()) {
    <button
      hlmBtn
      class="fixed z-50 bottom-6 right-6"
      (click)="scrollToTop()"
      title="Back to top"
      size="icon"
      aria-label="Scroll back to top"
    >
      <ng-icon name="lucideArrowUp" />
    </button>
  } `,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class BackToTop {
  // -----------------------------------------------------------------------------------------------------
  // @ Dependencies
  // -----------------------------------------------------------------------------------------------------
  private readonly document = inject(DOCUMENT);
  private readonly viewportScroller = inject(ViewportScroller);

  // -----------------------------------------------------------------------------------------------------
  // @ Inputs
  // -----------------------------------------------------------------------------------------------------
  readonly showAfter = input(300); // Pixels scrolled before showing
  readonly scrollToPosition = input(0); // Position to scroll to
  readonly animationDuration = input(500); // Animation duration in ms

  // -----------------------------------------------------------------------------------------------------
  // @ Signals and State
  // -----------------------------------------------------------------------------------------------------
  readonly isVisible = signal(false);

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  onWindowScroll(): void {
    const scrollPosition =
      this.document.documentElement.scrollTop || this.document.body.scrollTop;
    this.isVisible.set(scrollPosition > this.showAfter());
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
  }
}
