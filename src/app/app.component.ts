import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as AOS from 'aos';
import { HeroComponent } from './pages/hero/hero.component';

import { BackToTopComponent } from './layout/back-to-top/back-to-top.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ProjectsComponent } from './pages/projects/projects.component';

declare const gtag: Function;
@Component({
  selector: 'app-root',
  imports: [
    FooterComponent,
    NavbarComponent,
    HeroComponent,
    AboutMeComponent,
    ExperienceComponent,
    ProjectsComponent,
    BackToTopComponent,
  ],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"
    >
      <app-navbar />
      <app-hero id="hero" />
      <app-about-me id="about_me" />
      <app-experience id="experience" />
      <app-projects id="projects" />

      <app-footer />
    </div>

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
    afterNextRender(() => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
      });
    });

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
