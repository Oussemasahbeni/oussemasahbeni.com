import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { ContentMetadata } from '../../../lib/content-metadata/content-metadata';

@Component({
  selector: 'app-blog-preview',
  imports: [
    CommonModule,
    RouterLink,
    HlmIconImports,
    HlmButtonImports,
    HlmBadgeImports,
  ],
  providers: [provideIcons({ lucideArrowRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    class: 'block  ',
  },
  template: `
    @if(article(); as article){
    <article
      class="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-10"
    >
      <div class="hidden md:flex flex-col items-end w-[120px] shrink-0">
        <time
          [attr.datetime]="article.date | date"
          class="text-sm text-muted-foreground font-mono tabular-nums text-right "
        >
          {{ article.date | date : 'MMM d, y' }}
        </time>
      </div>

      <div class=" flex flex-col items-start flex-1">
        <div
          class="md:hidden  flex items-center gap-2 text-xs text-muted-foreground mb-3 pl-1"
        >
          {{ article.date | date : 'longDate' }}
        </div>

        <h2 class="text-xl font-bold tracking-tight text-foreground ">
          <a [routerLink]="'/blog/' + article.slug">
            {{ article.title }}
          </a>
        </h2>

        <p
          class="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-3"
        >
          {{ article.description }}
        </p>

        <div class="  mt-6 flex flex-wrap items-center gap-4 w-full">
          <div class="flex items-center gap-2">
            @for(tag of article.tags; track tag) {
            <span hlmBadge variant="outline"> {{ tag }} </span>
            }
          </div>

          <button
            hlmBtn
            size="sm"
            variant="default"
            [routerLink]="'/blog/' + article.slug"
            class="ml-auto flex items-center "
          >
            Read article
            <ng-icon name="lucideArrowRight" hlmIcon size="sm" />
          </button>
        </div>
      </div>
    </article>
    }
  `,
})
export class BlogPreviewComponent {
  readonly article = input<ContentMetadata>();
}
