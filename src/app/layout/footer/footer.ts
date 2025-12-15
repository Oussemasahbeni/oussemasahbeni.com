import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub, lucidePhone } from '@ng-icons/lucide';

import {
  radixEnvelopeClosed,
  radixGithubLogo,
  radixInstagramLogo,
  radixLinkedinLogo,
  radixTwitterLogo,
} from '@ng-icons/radix-icons';
import { remixTwitterXFill } from '@ng-icons/remixicon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { GITHUB_LINK, X_LINK, LINKEDIN_LINK } from '../../core/constants';

@Component({
  selector: 'app-footer',
  imports: [HlmButtonImports, HlmIconImports],
  providers: [
    provideIcons({
      radixLinkedinLogo,
      lucideGithub,
      radixEnvelopeClosed,
      radixInstagramLogo,
      radixTwitterLogo,
      lucidePhone,
      remixTwitterXFill,
    }),
  ],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
