import {
  injectContent,
  injectContentFiles,
  MarkdownComponent,
} from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideClock } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { TableOfContent } from '../../components/blog/table-of-content/table-of-content';
import { parseToc } from '../../components/blog/table-of-content/toc.util';

import { simpleFacebook, simpleX } from '@ng-icons/simple-icons';
import {
  postMetaResolver,
  postTitleResolver,
} from '../../core/resolvers/resolvers';
import { ContentMetadata } from '../../models/content-metadata';
import { ReadingProgress } from '../../shared/components/reading-progress/reading-progress';
import { ShareButton } from '../../shared/components/share-button/share-button';
import { ReadTimePipe } from '../../shared/pipes/read-time.pipe';

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
          contentFile.filename.endsWith(`/${slug}.md`),
      );
      return fileExists || router.createUrlTree(['/not-found']);
    },
  ],
};

@Component({
  imports: [
    ShareButton,
    ReadingProgress,
    NgOptimizedImage,
    MarkdownComponent,
    DatePipe,
    ReadTimePipe,
    TableOfContent,
    NgIcon,
    HlmSkeletonImports,
    HlmButtonImports,
  ],
  host: {
    class: 'block max-w-7xl mx-auto px-4 mt-4 py-16 lg:py-24',
  },
  providers: [
    provideIcons({
      simpleX,
      simpleFacebook,
      lucideClock,
      lucideCalendar,
    }),
  ],
  template: `
    <app-reading-progress />

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
                  <ng-icon name="lucideCalendar" />

                  <time [attr.datetime]="article.attributes.date | date">
                    {{ article.attributes.date | date }}
                  </time>
                </div>
                <div class="flex items-center gap-1">
                  <ng-icon name="lucideClock" />
                  <span> {{ article.content | readTime }}</span>
                </div>
              </div>

              <app-share-button [title]="article.attributes.title" />
            </div>
          </header>
          @if (article.attributes.coverImage) {
            <figure class="mt-8">
              <img
                class="w-full object-cover rounded-xl border border-border shadow-sm bg-muted"
                width="1200"
                height="800"
                [ngSrc]="article.attributes.coverImage"
                [alt]="article.attributes.title"
                priority
              />
              <figcaption
                class="mt-2 text-center text-xs text-muted-foreground"
              >
                {{ article.attributes.title }}
              </figcaption>
            </figure>
          }

          <div #contentRef>
            <analog-markdown
              class="pt-8 sm:pt-12 prose dark:prose-invert max-w-none"
              [content]="article.content"
            />
          </div>
        </article>

        <app-table-of-content [tableOfContentItems]="tableOfContentItems()" />
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
  readonly article = toSignal(injectContent<ContentMetadata>());

  readonly tableOfContentItems = computed(() => {
    const article = this.article();
    return article ? parseToc(article.content) : [];
  });
}
