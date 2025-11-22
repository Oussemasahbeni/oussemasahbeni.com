import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';
import { radixGithubLogo, radixLinkedinLogo } from '@ng-icons/radix-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-hero',
  imports: [TranslocoModule, HlmButtonImports, NgIcon, HlmIconImports],
  templateUrl: './hero.component.html',
  providers: [
    provideIcons({ radixGithubLogo, lucideDownload, radixLinkedinLogo }),
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
