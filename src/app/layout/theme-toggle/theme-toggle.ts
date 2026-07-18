import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggler',
  template: `
    <button
      (click)="toggleTheme($event)"
      [title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      class="cursor-pointer"
      hlmBtn
      size="icon"
      variant="ghost"
    >
      <ng-icon [name]="isDark() ? 'lucideSun' : 'lucideMoon'" />
    </button>
  `,
  providers: [provideIcons({ lucideSun, lucideMoon })],
  imports: [NgIcon, HlmButtonImports],
})
export class ThemeToggle {
  protected readonly themeService = inject(ThemeService);

  protected readonly isDark = computed(
    () => this.themeService.theme() === 'dark',
  );

  protected toggleTheme(event: MouseEvent): void {
    this.themeService.toggleTheme(event);
  }
}
