import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { ContentMetadata } from '../../../models/content-metadata';

@Component({
  selector: 'app-blog-preview',
  imports: [
    DatePipe,
    RouterLink,
    HlmIconImports,
    HlmButtonImports,
    HlmBadgeImports,
    HlmCardImports,
  ],
  providers: [provideIcons({ lucideArrowRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block h-full',
  },
  template: `
    @if(article(); as article){
    <article hlmCard class="h-full flex flex-col hover:shadow-lg ">
      <!-- HEADER -->
      <div hlmCardHeader>
        <h2 hlmCardTitle class="text-xl font-bold tracking-tight">
          <a
            [routerLink]="['/blog', article.slug]"
            class="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
          >
            {{ article.title }}
          </a>
        </h2>

        <p hlmCardDescription>
          {{ article.date | date : 'longDate' }}
        </p>
      </div>

      <!-- CONTENT -->
      <div hlmCardContent class="flex-1">
        <p class="text-muted-foreground leading-relaxed line-clamp-3">
          {{ article.description }}
        </p>
      </div>

      <!-- FOOTER -->
      <div
        hlmCardFooter
        class="flex flex-col sm:flex-row items-start  sm:items-center justify-between gap-4 mt-auto"
      >
        <div class="flex flex-wrap gap-2">
          @for(tag of article.tags; track tag) {
          <span hlmBadge variant="outline" class="text-xs font-normal">
            {{ tag }}
          </span>
          }
        </div>

        <button
          type="button"
          hlmBtn
          size="sm"
          variant="default"
          [routerLink]="['/blog', article.slug]"
          class="group gap-2 pl-0 cursor-pointer transition-colors w-full sm:w-fit"
        >
          Read article
          <ng-icon
            name="lucideArrowRight"
            hlmIcon
            size="sm"
            class="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </article>
    }
  `,
})
export class BlogPreview {
  readonly article = input.required<ContentMetadata>();
}
