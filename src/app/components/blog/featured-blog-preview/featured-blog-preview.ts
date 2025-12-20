import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { ContentMetadata } from '../../../models/content-metadata';

@Component({
  selector: 'app-featured-blog-preview',
  standalone: true,
  imports: [
    RouterLink,
    HlmCardImports,
    HlmBadgeImports,
    DatePipe,
    HlmIconImports,
  ],
  host: {
    class: 'block h-full',
  },
  providers: [provideIcons({ lucideArrowRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(article(); as article){
    <a
      [routerLink]="['/blog', article.slug]"
      hlmCard
      class="
        group flex flex-col h-full
        transition-all duration-300 
        hover:-translate-y-1 hover:shadow-lg hover:border-primary/50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      "
    >
      <div hlmCardHeader>
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs font-mono text-muted-foreground">
            {{ article.date | date : 'mediumDate' }}
          </span>
          <!-- Mobile: Always visible | Desktop: Animation on hover -->
          <ng-icon
            name="lucideArrowRight"
            hlmIcon
            size="base"
            class="
              text-primary transition-all duration-300
              opacity-100 translate-x-0 
              sm:opacity-0 sm:-translate-x-2 
              group-hover:opacity-100 group-hover:translate-x-0
            "
          />
        </div>

        <h3 hlmCardTitle class="text-xl leading-tight">
          {{ article.title }}
        </h3>
      </div>

      <div hlmCardContent class="flex-1">
        <p class="text-muted-foreground leading-relaxed line-clamp-3">
          {{ article.description }}
        </p>
      </div>

      <div hlmCardFooter class="pt-2">
        <div class="flex flex-wrap gap-2">
          @for(tag of article.tags; track tag) {
          <span hlmBadge variant="outline" class="group-hover:bg-primary/5">
            {{ tag }}
          </span>
          }
        </div>
      </div>
    </a>
    }
  `,
})
export class FeaturedBlogPreview {
  readonly article = input.required<ContentMetadata>();
}
