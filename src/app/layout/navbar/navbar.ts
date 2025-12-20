import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideRss } from '@ng-icons/lucide';
import { radixHamburgerMenu, radixLinkedinLogo } from '@ng-icons/radix-icons';
import { remixTwitterXFill } from '@ng-icons/remixicon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { GITHUB_LINK, LINKEDIN_LINK, X_LINK } from '../../core/constants';
import { NowPlaying } from '../../shared/components/now-playing/now-playing';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

import { BrnSheet, BrnSheetImports } from '@spartan-ng/brain/sheet';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    HlmButtonImports,
    HlmIconImports,
    BrnSheetImports,
    HlmSheetImports,
    ThemeToggle,
    NowPlaying,
  ],
  templateUrl: './navbar.html',
  providers: [
    provideIcons({
      radixHamburgerMenu,
      lucideGithub,
      lucideRss,
      remixTwitterXFill,
      radixLinkedinLogo,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  public readonly viewchildSheetRef = viewChild(BrnSheet);

  readonly navigation = signal([
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
