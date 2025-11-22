import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmMenu, HlmMenuItem } from '@spartan-ng/helm/menu';

@Component({
  selector: 'app-language',
  imports: [
    HlmButtonImports,
    BrnMenuTrigger,
    HlmMenu,
    HlmMenuItem,
    HlmIconImports,
  ],
  templateUrl: './language.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageComponent {
  public translocoService = inject(TranslocoService);

  public activeLang = signal(
    this.translocoService.getActiveLang().toUpperCase()
  );

  setLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang.set(lang.toUpperCase());
  }
}
