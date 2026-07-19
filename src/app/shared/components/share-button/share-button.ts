import { Clipboard } from '@angular/cdk/clipboard';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy, lucideShare2 } from '@ng-icons/lucide';
import { radixLinkedinLogo } from '@ng-icons/radix-icons';
import { simpleFacebook, simpleX } from '@ng-icons/simple-icons';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { play } from 'cuelume';

@Component({
  selector: 'app-share-button',
  providers: [
    provideIcons({
      lucideCopy,
      simpleFacebook,
      radixLinkedinLogo,
      simpleX,
      lucideCheck,
      lucideShare2,
    }),
  ],
  imports: [HlmButton, NgIcon, HlmPopoverImports, HlmInputImports],
  templateUrl: './share-button.html',
})
export class ShareButton {
  private readonly _clipboard = inject(Clipboard);
  private readonly platformId = inject(PLATFORM_ID);

  public readonly title = input.required<string>();

  public readonly currentUrl = computed(() => {
    return isPlatformBrowser(this.platformId) ? window.location.href : '';
  });
  public readonly copied = signal<boolean>(false);

  public readonly socialUrls = computed(() => {
    const url = this.currentUrl();
    const text = encodeURIComponent(this.title());
    const encodedUrl = encodeURIComponent(url);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
    };
  });

  public onCopy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const success = this._clipboard.copy(this.currentUrl());
    play('success');

    if (success) {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    }
  }
}
