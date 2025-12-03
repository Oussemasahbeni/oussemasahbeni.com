import {
  injectContent,
  injectContentFiles,
  MarkdownComponent,
} from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideFacebook,
  lucideLinkedin,
  lucideTwitter,
} from '@ng-icons/lucide';
import { radixCalendar, radixClock } from '@ng-icons/radix-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { ReadTimePipe } from '../../components/pipes/read-time.pipe';
import { ShareButton } from '../../components/share-button/share-button';
import { ContentMetadata } from '../../lib/content-metadata/content-metadata';
import {
  postMetaResolver,
  postTitleResolver,
} from '../../lib/resolvers/resolvers';
import { parseToc } from '../../util/toc.util';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
  canActivate: [
    (route) => {
      const router = inject(Router);
      const slug = route.params['slug'];
      const fileExists = injectContentFiles<ContentMetadata>().some(
        (contentFile) =>
          contentFile.slug === slug ||
          contentFile.filename.endsWith(`/${slug}.md`)
      );
      return fileExists || router.createUrlTree(['/not-found']);
    },
  ],
};

@Component({
  imports: [
    ShareButton,
    MarkdownComponent,
    DatePipe,
    ReadTimePipe,
    HlmIconImports,
    HlmSkeletonImports,
    HlmButtonImports,
    HlmIconImports,
  ],
  host: {
    class: 'block max-w-7xl mx-auto px-4 mt-4 py-16 lg:py-24',
    '(window:scroll)': 'onWindowScroll()',
  },
  providers: [
    provideIcons({
      lucideTwitter,
      lucideLinkedin,
      lucideFacebook,
      radixClock,
      radixCalendar,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div
        class="h-full bg-blue-400 transition-transform duration-75 ease-out origin-left"
        [style.transform]="'scaleX(' + readingProgress() / 100 + ')'"
      ></div>
    </div>

    @if (article(); as article) {
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <article class="lg:col-span-9">
        <header>
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
            {{ article.attributes.title }}
          </h1>

          <div class="flex items-center justify-between mt-4 ">
            <div class="flex items-center  gap-4 text-base text-blue-400">
              <div class="flex items-center gap-2">
                <ng-icon name="radixCalendar" hlmIcon />

                <time [attr.datetime]="article.attributes.date | date">
                  {{ article.attributes.date | date }}
                </time>
              </div>
              <div class="flex items-center gap-1">
                <ng-icon name="radixClock" hlmIcon />
                <span> {{ article.content | readTime }}</span>
              </div>
            </div>

            <app-share-button [title]="article.attributes.title" />
          </div>
        </header>

        <div #contentRef>
          <analog-markdown
            class="pt-8 sm:pt-12 prose dark:prose-invert max-w-none"
            [content]="article.content"
          />
        </div>
      </article>

      <aside class="hidden lg:col-span-3 lg:block">
        <div class="sticky top-24 w-full">
          @if (toc().length > 0) {

          <div class="flex flex-row items-stretch">
            <div class="w-px bg-border mr-4"></div>
            <div class="flex flex-col gap-2 pb-4">
              <h3 class="font-semibold mb-4 text-sm">Table of Contents</h3>
              <nav class="flex flex-col gap-2 text-sm text-muted-foreground">
                @for(item of toc(); track item.id) {
                <a
                  (click)="scrollTo(item.id); $event.preventDefault()"
                  [href]="'#' + item.id"
                  class=" hover:text-blue-400 text-xs"
                  [class.pl-4]="item.level === 3"
                  [class.font-medium]="item.level === 2"
                >
                  {{ item.text }}
                </a>
                }
              </nav>
            </div>
          </div>
          }
        </div>
      </aside>
    </div>
    } @else {
    <div class="flex flex-col space-y-3 max-w-7xl mx-auto">
      <div class="flex flex-col gap-5">
        <hlm-skeleton class="h-10 " />
        <hlm-skeleton class="h-10 w-1/2 " />
        <hlm-skeleton class="h-10 " />
        <hlm-skeleton class="h-10 w-1/3 " />
        <hlm-skeleton class="h-10 " />
        <hlm-skeleton class="h-10 w-2/3 " />
      </div>
    </div>
    }
  `,
})
export default class BlogPost {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly article = toSignal(injectContent<ContentMetadata>());

  readonly toc = computed(() => {
    const article = this.article();
    return article ? parseToc(article.content) : [];
  });

  readonly readingProgress = signal(0);

  onWindowScroll(): void {
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
