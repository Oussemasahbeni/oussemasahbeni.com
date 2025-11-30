import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { BackToTopComponent } from './components/layout/back-to-top/back-to-top.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

declare const gtag: Function;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, BackToTopComponent],
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
export class AppComponent {
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
