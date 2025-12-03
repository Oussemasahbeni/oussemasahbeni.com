import { Clipboard } from '@angular/cdk/clipboard';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy, lucideShare2 } from '@ng-icons/lucide';
import { radixLinkedinLogo } from '@ng-icons/radix-icons';
import { remixFacebookBoxFill, remixTwitterXFill } from '@ng-icons/remixicon';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';

@Component({
  selector: 'app-share-button',
  providers: [
    provideIcons({
      lucideCopy,
      remixFacebookBoxFill,
      radixLinkedinLogo,
      remixTwitterXFill,
      lucideCheck,
      lucideShare2,
    }),
  ],
  imports: [
    HlmButton,
    BrnPopoverImports,
    HlmPopoverImports,
    HlmIconImports,
    HlmInputImports,
  ],
  templateUrl: './share-button.html',
})
export class ShareButton {
  private readonly _clipboard = inject(Clipboard);
  private readonly platformId = inject(PLATFORM_ID);

  public readonly title = input.required<string>();

  public readonly currentUrl = computed(() => {
    return isPlatformBrowser(this.platformId) ? window.location.href : '';
  });
  public copied = signal<boolean>(false);

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

    if (success) {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    }
  }
}
