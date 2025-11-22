import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePhone } from '@ng-icons/lucide';

import {
  radixEnvelopeClosed,
  radixGithubLogo,
  radixInstagramLogo,
  radixLinkedinLogo,
  radixTwitterLogo,
} from '@ng-icons/radix-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-footer',
  imports: [TranslocoModule, HlmButtonImports, HlmIconImports, NgIcon],
  providers: [
    provideIcons({
      radixLinkedinLogo,
      radixGithubLogo,
      radixEnvelopeClosed,
      radixInstagramLogo,
      radixTwitterLogo,
      lucidePhone,
    }),
  ],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  date = signal(new Date().getFullYear());
}
