import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  signal,
} from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _renderer = inject(RendererFactory2).createRenderer(
    null,
    null
  );
  private readonly _document = inject(DOCUMENT);

  readonly theme = signal<Theme>('dark');

  constructor() {
    this.initializeTheme();
  }

  toggleTheme(): void {
    const currentTheme = this.theme();

    switch (currentTheme) {
      case 'light':
        this.setTheme('dark');
        break;
      case 'dark':
        this.setTheme('light');
        break;
    }
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.theme.set(
        localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
      );
      return;
    }
  }
  private setTheme(theme: Theme): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    this.theme.set(theme);

    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      this._renderer.addClass(this._document.documentElement, 'dark');
    } else {
      localStorage.setItem('theme', 'light');
      if (this._document.documentElement.className.includes('dark')) {
        this._renderer.removeClass(this._document.documentElement, 'dark');
      }
    }
  }
}
