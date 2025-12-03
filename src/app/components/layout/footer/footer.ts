import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucidePhone } from '@ng-icons/lucide';

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

@Component({
  selector: 'app-footer',
  imports: [HlmButtonImports, HlmIconImports],
  providers: [
    provideIcons({
      radixLinkedinLogo,
      radixGithubLogo,
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
}
