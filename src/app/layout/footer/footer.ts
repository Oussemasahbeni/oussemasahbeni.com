import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMail, lucidePhone } from '@ng-icons/lucide';

import { radixLinkedinLogo } from '@ng-icons/radix-icons';
import { simpleGithub, simpleInstagram, simpleX } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { GITHUB_LINK, LINKEDIN_LINK, X_LINK } from '../../core/constants';

@Component({
  selector: 'app-footer',
  imports: [HlmButtonImports, NgIcon],
  providers: [
    provideIcons({
      radixLinkedinLogo,
      simpleGithub,
      lucideMail,
      simpleInstagram,
      simpleX,
      lucidePhone,
    }),
  ],
  templateUrl: './footer.html',
})
export class Footer {
  readonly date = signal(new Date().getFullYear());

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
