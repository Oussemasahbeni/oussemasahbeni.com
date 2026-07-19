import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  DOCUMENT,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, throttleTime } from 'rxjs';
import { TableOfContentItem } from './toc.util';

@Component({
  selector: 'app-table-of-content',
  imports: [],
  host: {
    class: 'hidden lg:col-span-3 lg:block sticky top-24 w-full self-start',
  },
  template: `
    @if (tableOfContentItems().length > 0) {
      <aside class="flex flex-row items-stretch">
        <div class="w-px bg-border mr-4"></div>
        <div class="flex flex-col gap-2 pb-4">
          <h3 class="font-semibold mb-4 text-sm">Table of Contents</h3>
          <nav class="flex flex-col gap-2 text-sm text-muted-foreground">
            @for (item of tableOfContentItems(); track item.id) {
              <a
                class=" hover:text-blue-400 text-xs"
                [href]="'#' + item.id"
                [class.pl-4]="item.level === 3"
                [class.font-medium]="item.level === 2"
                [class.text-blue-400]="currentTocItem() === item.id"
                (click)="scrollTo(item.id); $event.preventDefault()"
              >
                {{ item.text }}
              </a>
            }
          </nav>
        </div>
      </aside>
    }
  `,
})
export class TableOfContent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  public readonly tableOfContentItems = input.required<TableOfContentItem[]>();

  protected readonly currentTocItem = signal<string | null>(null);
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(throttleTime(20), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.calculateActiveTocItem();
        });
    }
  }

  calculateActiveTocItem() {
    const tocItems = this.tableOfContentItems();
    if (!tocItems.length) return;

    // Check if we are at the bottom of the page
    // We use a small buffer (e.g., 50px) to account for mobile browser quirks
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollPosition + windowHeight >= docHeight - 50) {
      // User is at the bottom, activate the last item
      const lastItem = tocItems[tocItems.length - 1];
      if (this.currentTocItem() !== lastItem.id) {
        this.currentTocItem.set(lastItem.id);
      }
      return;
    }

    const offset = 120;
    let currentId: string | null = null;

    for (const item of tocItems) {
      const element = this.document.getElementById(item.id);
      if (element) {
        const elementTop = element.offsetTop;

        if (scrollPosition + offset >= elementTop) {
          currentId = item.id;
        } else {
          break;
        }
      }
    }

    if (this.currentTocItem() !== currentId) {
      this.currentTocItem.set(currentId);
    }
  }

  scrollTo(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = this.document.getElementById(id);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }
}
