import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { bind } from 'cuelume';
import { Footer } from './layout/footer/footer';
import { Navbar } from './layout/navbar/navbar';
import { BackToTop } from './shared/components/back-to-top/back-to-top';

declare const gtag: (
  command: string,
  targetId: string,
  config?: Record<string, unknown>,
) => void;
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
    <app-back-to-top variant="glass" size="medium" position="bottom-right" [showAfter]="200" />
  `,
})
export class App {
  private readonly router = inject(Router);
  private readonly platform = inject(PLATFORM_ID);

  constructor() {
    bind();

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
