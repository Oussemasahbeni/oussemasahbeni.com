import { Component, computed, inject } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { radixMoon, radixSun } from '@ng-icons/radix-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-theme-toggler',
  template: `
    <button
      (click)="toggleTheme()"
      [title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      hlmBtn
      size="icon"
      variant="outline"
      class="size-8"
    >
      <ng-icon
        [name]="isDark() ? 'radixSun' : 'radixMoon'"
        aria-hidden="true"
      />
    </button>
  `,
  providers: [provideIcons({ radixSun, radixMoon })],
  imports: [NgIcon, HlmButtonImports],
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  protected readonly isDark = computed(
    () => this.themeService.theme() === 'dark'
  );

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
