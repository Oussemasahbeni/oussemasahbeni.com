import { Component, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { GITHUB_LINK, LINKEDIN_LINK, X_LINK } from '../../core/constants';

import { lucideMenu, lucideRss } from '@ng-icons/lucide';
import { radixLinkedinLogo } from '@ng-icons/radix-icons';
import { simpleGithub, simpleX } from '@ng-icons/simple-icons';
import { HlmSheet, HlmSheetImports } from '@spartan-ng/helm/sheet';
import { ThemeSwitch } from '../../shared/components/theme-toggle/theme-toggle';
import { SpotifyWidget } from '../../shared/components/spotifty-widget/spotify-widget';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, HlmButtonImports, NgIcon, HlmSheetImports, ThemeSwitch, SpotifyWidget],
  templateUrl: './navbar.html',
  providers: [
    provideIcons({
      lucideMenu,
      simpleGithub,
      radixLinkedinLogo,
      lucideRss,
      simpleX,
    }),
  ],
})
export class Navbar {
  public readonly viewchildSheetRef = viewChild(HlmSheet);

  protected readonly navigation = signal([
    {
      title: 'Home',
      link: '/',
      ariaLabel: 'Home page',
    },
    {
      title: 'Blogs',
      link: '/blog',
      ariaLabel: 'Blogs page',
    },
    {
      title: 'Projects',
      link: '/projects',
      ariaLabel: 'Projects page',
    },
    { title: 'Contact', link: '/contact', ariaLabel: 'Contact page' },
  ]);

  closeMenu() {
    this.viewchildSheetRef()?.close({});
  }

  openGithub() {
    window.open(GITHUB_LINK, '_blank');
  }

  openRss() {
    window.open('/api/rss.xml', '_blank');
  }
  openX() {
    window.open(X_LINK, '_blank');
  }
  openLinkedIn() {
    window.open(LINKEDIN_LINK, '_blank');
  }
}
