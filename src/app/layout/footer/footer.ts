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
  template: `
    <footer class="py-5 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div class="mx-auto px-4 lg:px-8">
        <!-- Social Media Links -->
        <div class="flex justify-center gap-6 mb-6">
          <button
            hlmBtn
            class="cursor-pointer"
            aria-label="Open GitHub Profile"
            size="icon"
            variant="ghost"
            type="button"
            (click)="openGithub()"
          >
            <ng-icon name="simpleGithub" class="text-primary" />
          </button>

          <button
            hlmBtn
            aria-label="Open Twitter X Profile"
            size="icon"
            variant="ghost"
            type="button"
            class="cursor-pointer"
            (click)="openX()"
          >
            <ng-icon name="simpleX" class="text-primary" />
          </button>
          <button
            hlmBtn
            aria-label="Open LinkedIn Profile"
            size="icon"
            variant="ghost"
            type="button"
            class="cursor-pointer"
            (click)="openLinkedIn()"
          >
            <ng-icon name="radixLinkedinLogo" class="text-primary" />
          </button>

          <a
            hlmBtn
            size="icon"
            variant="ghost"
            href="mailto:oussemasahbeni300@gmail.com"
            aria-label="Email"
          >
            <ng-icon name="lucideMail" />
          </a>
          <a
            hlmBtn
            size="icon"
            variant="ghost"
            href="tel:+21654750526"
            aria-label="Phone"
          >
            <ng-icon name="lucidePhone" />
          </a>
        </div>

        <!-- Copyright -->
        <div class="text-center border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            © {{ date() }} Oussema Sahbeni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly date = signal(new Date().getFullYear());

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
