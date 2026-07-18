import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  DOCUMENT,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-reading-progress',
  imports: [],
  styles: `
    @keyframes grow-progess {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
    // Not yet supported in firefox
    #progress-bar {
      animation: grow-progess linear forwards;
      animation-timeline: scroll();
    }
  `,
  template: `
    <div class="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div
        class="h-full bg-blue-400 transition-transform duration-75 ease-out origin-left"
        [style.transform]="'scaleX(' + readingProgress() / 100 + ')'"
      ></div>
    </div>
  `,
})
export class ReadingProgress {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly readingProgress = signal(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(throttleTime(20), takeUntilDestroyed())
        .subscribe(() => {
          this.calculateReadingProgress();
        });
    }
  }

  calculateReadingProgress() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollTop =
        window.scrollY || this.document.documentElement.scrollTop;
      const height =
        this.document.documentElement.scrollHeight -
        this.document.documentElement.clientHeight;

      if (height > 0) {
        const scrolled = (scrollTop / height) * 100;
        this.readingProgress.set(scrolled);
      }
    }
  }
}
