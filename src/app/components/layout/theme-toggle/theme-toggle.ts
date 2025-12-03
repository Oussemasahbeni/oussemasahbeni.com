import { Component, computed, inject } from '@angular/core';

import { provideIcons } from '@ng-icons/core';
import { radixMoon, radixSun } from '@ng-icons/radix-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { ThemeService } from '../../../lib/theme/theme.service';

@Component({
  selector: 'app-theme-toggler',
  template: `
    <button
      (click)="toggleTheme($event)"
      [title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      hlmBtn
      size="icon"
      variant="ghost"
    >
      <ng-icon [name]="isDark() ? 'radixSun' : 'radixMoon'" hlmIcon size="sm" />
    </button>
  `,
  providers: [provideIcons({ radixSun, radixMoon })],
  imports: [HlmIconImports, HlmButtonImports],
})
export class ThemeToggle {
  protected readonly themeService = inject(ThemeService);

  protected readonly isDark = computed(
    () => this.themeService.theme() === 'dark'
  );

  protected toggleTheme(event: MouseEvent): void {
    this.themeService.toggleTheme(event);
  }
}
