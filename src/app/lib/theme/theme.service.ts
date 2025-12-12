import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>('dark');

  constructor() {
    this.initializeTheme();
  }

  /**
   * Toggles the theme between light and dark.
   * If a MouseEvent is provided and the browser supports View Transitions,
   * it triggers a circular reveal animation from the click location.
   * * @param event - The mouse event from the button click (optional)
   */
  toggleTheme(event?: MouseEvent): void {
    const x = event?.clientX;
    const y = event?.clientY;

    // - Must be in a browser (not SSR)
    // - Browser must support View Transitions API
    // - Coordinates (x, y) must exist
    if (
      !isPlatformBrowser(this._platformId) ||
      !document.startViewTransition ||
      x === undefined ||
      y === undefined
    ) {
      this.executeToggle();
      return;
    }

    this.animateThemeSwitch(x, y);
  }

  /**
   * Logic to flip the theme state.
   * This is separated so it can be called inside the View Transition callback.
   */
  private executeToggle(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Handles the "Circular Reveal" animation using View Transitions and WAAPI.
   */
  private animateThemeSwitch(x: number, y: number) {
    // Calculate distance to the farthest corner of the screen to ensure
    // the circle covers the entire viewport.
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    this.document.documentElement.classList.add('theme-transition');

    // Start the View Transition.
    const transition = document.startViewTransition(() => {
      this.executeToggle();
    });

    // Once the pseudo-elements are ready, animate the "New" view
    // expanding from a small dot to the full screen.
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in',
          // We animate the ::view-transition-new pseudo-element
          // because we want the NEW theme to reveal itself on top.
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    // CLEANUP: Remove the marker class when animation finishes.
    // This returns the View Transition behavior to normal (for Router).
    transition.finished.finally(() => {
      this.document.documentElement.classList.remove('theme-transition');
    });
  }

  /**
   * Initializes the theme based on LocalStorage or System Preference.
   * Runs only on the browser side.
   */
  private initializeTheme(): void {
    if (isPlatformBrowser(this._platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      // Default to dark if saved is dark OR (no save AND system is dark)
      const theme =
        savedTheme === 'dark' || (!savedTheme && prefersDark)
          ? 'dark'
          : 'light';

      this.theme.set(theme);

      if (theme === 'dark') {
        this.document.documentElement.classList.add('dark');
      }
    }
  }

  /**
   * Updates the Signal, LocalStorage, and DOM Class.
   */
  private setTheme(theme: Theme): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    this.theme.set(theme);

    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      this.document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      this.document.documentElement.classList.remove('dark');
    }
  }
}
