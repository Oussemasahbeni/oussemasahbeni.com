import { Component, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';

import { lucideMenu, lucideRss } from '@ng-icons/lucide';
import { radixLinkedinLogo } from '@ng-icons/radix-icons';
import { simpleGithub, simpleX } from '@ng-icons/simple-icons';
import { HlmSheet, HlmSheetImports } from '@spartan-ng/helm/sheet';
import { SpotifyWidget } from '../../shared/components/spotifty-widget/spotify-widget';
import { ThemeSwitch } from '../../shared/components/theme-toggle/theme-toggle';

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
  ]);

  closeMenu() {
    this.viewchildSheetRef()?.close({});
  }
}
