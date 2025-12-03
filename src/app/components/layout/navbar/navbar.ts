import {
  ChangeDetectionStrategy,
  Component,
  model,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { radixHamburgerMenu, radixLinkedinLogo } from '@ng-icons/radix-icons';
import { remixTwitterXFill } from '@ng-icons/remixicon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { GITHUB_LINK, LINKEDIN_LINK, X_LINK } from '../../../lib/constants';
import { ClickOutsideDirective } from '../../directives/click-outisde.directive';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    HlmButtonImports,
    HlmIconImports,
    ThemeToggle,
    ClickOutsideDirective,
  ],
  templateUrl: './navbar.html',
  providers: [
    provideIcons({
      radixHamburgerMenu,
      lucideGithub,
      remixTwitterXFill,
      radixLinkedinLogo,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  /**
   * Whether the mobile menu is open.
   */
  readonly menuOpen = model(false);

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
  ]);

  onClickOutside(): void {
    this.menuOpen.set(false);
  }

  toggle(): void {
    this.menuOpen.update((open) => !open);
  }

  openGithub() {
    window.open(GITHUB_LINK, '_blank');
  }
  openX() {
    window.open(X_LINK, '_blank');
  }
  openLinkedIn() {
    window.open(LINKEDIN_LINK, '_blank');
  }
}
