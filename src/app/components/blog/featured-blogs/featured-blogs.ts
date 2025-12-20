import { injectContentFiles } from '@analogjs/content';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentMetadata } from '../../../models/content-metadata';
import { FeaturedBlogPreview } from '../featured-blog-preview/featured-blog-preview';

@Component({
  selector: 'app-featured-blogs',
  imports: [FeaturedBlogPreview],
  host: {
    class: 'block max-w-7xl mx-auto px-6 sm:px-8 py-8  ',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <!-- Section Header -->
    <div class="text-center space-y-4">
      <div
        class="inline-flex items-center gap-2 text-lg font-mono text-zinc-600 dark:text-zinc-400"
      >
        <span class="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></span>
        <span> Featured Posts </span>
        <span class="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></span>
      </div>
    </div>

    <div class="mt-6 w-full grid grid-cols-1  lg:grid-cols-3 gap-4">
      @for(article of articles; track article.slug){
      <app-featured-blog-preview [article]="article.attributes" />
      }
    </div>`,
})
export class FeaturedBlogs {
  public articles = injectContentFiles<ContentMetadata>()
    .reverse()
    .filter((_, i) => i < 3);
}
