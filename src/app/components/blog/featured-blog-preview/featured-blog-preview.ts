import { ContentFile } from '@analogjs/content';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { ContentMetadata } from '../../../lib/content-metadata/content-metadata';

@Component({
  selector: 'app-featured-blog-preview',
  imports: [
    RouterLink,
    HlmCardImports,
    HlmBadgeImports,
    DatePipe,
    HlmIconImports,
  ],
  host: {
    class: 'flex flex-1',
  },
  providers: [
    provideIcons({
      lucideArrowRight,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(article(); as article){

    <article>
      <a
        hlmCard
        class="
        group relative w-full  p-1 
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg hover:border-primary/50
      "
        [routerLink]="'/blog/' + article.slug"
      >
        <div
          class="flex flex-col h-full bg-popover rounded-lg p-5 z-10 relative"
        >
          <div class="flex justify-between items-start mb-3">
            <span class="text-xs text-muted-foreground font-mono">
              {{ article.attributes.date | date : 'mediumDate' }}
            </span>

            <ng-icon
              name="lucideArrowRight"
              hlmIcon
              size="base"
              class="text-primary opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </div>

          <h4 class="text-xl font-bold tracking-tight text-foreground">
            {{ article.attributes.title }}
          </h4>

          <p
            class="mt-2 mb-6 text-sm text-muted-foreground leading-relaxed line-clamp-3"
          >
            {{ article.attributes.description }}
          </p>

          <div
            class="mt-auto flex flex-wrap items-center gap-2 pt-4 border-t border-border/50"
          >
            @for(tag of article.attributes.tags; track tag) {
            <span
              hlmBadge
              variant="outline"
              size="sm"
              class="group-hover:bg-secondary/80 transition-colors"
            >
              {{ tag }}
            </span>
            }
          </div>
        </div>
      </a>
    </article>
    }
  `,
})
export class FeaturedBlogPreview {
  readonly article = input<ContentFile<ContentMetadata>>();
}
