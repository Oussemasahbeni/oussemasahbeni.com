import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { play } from 'cuelume';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-switch',
  providers: [provideIcons({ lucideSun, lucideMoon })],
  imports: [NgIcon, HlmButtonImports],
  host: {
    '(window:keydown)': 'onKeydown($event)',
  },
  template: `
    <button
      #toggleBtn
      data-cuelume-toggle="bloom"
      type="button"
      hlmBtn
      size="icon"
      variant="ghost"
      title="Toggle theme"
      (click)="toggleTheme()"
    >
      <ng-icon name="lucideSun" class="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <ng-icon name="lucideMoon" class="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </button>
  `,
})
export class ThemeSwitch {
  protected readonly _themeService = inject(ThemeService);

  private readonly _toggleBtn = viewChild.required<ElementRef<HTMLButtonElement>>('toggleBtn');

  protected toggleTheme(): void {
    const rect = this._toggleBtn().nativeElement.getBoundingClientRect();
    this._themeService.toggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable]')) return;

    if (event.key.toLowerCase() === 'd' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      play('bloom');
      this.toggleTheme();
    }
  }
}
