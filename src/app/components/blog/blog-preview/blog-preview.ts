import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { ContentMetadata } from '../../../models/content-metadata';

@Component({
  selector: 'app-blog-preview',
  imports: [DatePipe, RouterLink, HlmButtonImports, HlmBadgeImports, HlmCardImports, NgIcon],
  providers: [provideIcons({ lucideArrowRight })],
  host: {
    class: 'block h-full',
  },
  template: `
    @if (article(); as article) {
      <article hlmCard class="flex h-full flex-col hover:shadow-lg">
        <!-- HEADER -->
        <div hlmCardHeader>
          <h2 hlmCardTitle class="text-xl font-bold tracking-tight">
            <a
              class="focus:ring-ring rounded-md hover:underline focus:ring-2 focus:outline-none"
              [routerLink]="['/blog', article.slug]"
            >
              {{ article.title }}
            </a>
          </h2>

          <p hlmCardDescription>
            {{ article.date | date: 'longDate' }}
          </p>
        </div>

        <!-- CONTENT -->
        <div hlmCardContent class="flex-1">
          <p class="text-muted-foreground line-clamp-3 leading-relaxed">
            {{ article.description }}
          </p>
        </div>

        <!-- FOOTER -->
        <div hlmCardFooter class="mt-auto flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div class="flex flex-wrap gap-2">
            @for (tag of article.tags; track tag) {
              <span hlmBadge variant="outline" class="text-xs font-normal">
                {{ tag }}
              </span>
            }
          </div>

          <button type="button" hlmBtn size="sm" variant="default" [routerLink]="['/blog', article.slug]">
            Read article
            <ng-icon name="lucideArrowRight" class="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </article>
    }
  `,
})
export class BlogPreview {
  public readonly article = input.required<ContentMetadata>();
}
