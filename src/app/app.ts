import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { BackToTop } from './components/layout/back-to-top/back-to-top';
import { Footer } from './components/layout/footer/footer';
import { Navbar } from './components/layout/navbar/navbar';

declare const gtag: Function;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, BackToTop],
  host: {
    class: 'flex h-full w-full flex-auto  flex-col',
  },
  template: `
    <app-navbar />
    <main class="flex-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-back-to-top
      variant="glass"
      size="medium"
      position="bottom-right"
      [showAfter]="200"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly platform = inject(PLATFORM_ID);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platform) && typeof gtag !== 'undefined') {
          gtag('config', 'G-42206BJGCL', {
            page_path: event.urlAfterRedirects,
          });
        }
      }
    });
  }
}
