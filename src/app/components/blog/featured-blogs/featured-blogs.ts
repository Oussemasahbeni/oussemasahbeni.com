import { injectContentFiles } from '@analogjs/content';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentMetadata } from '../../../lib/content-metadata/content-metadata';
import { FeaturedBlogPreview } from '../featured-blog-preview/featured-blog-preview';

@Component({
  selector: 'app-featured-blogs',
  imports: [FeaturedBlogPreview],
  host: {
    class: 'block max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
      Featured Posts
    </h2>

    <div
      class="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      @for(article of articles; track article.slug){
      <app-featured-blog-preview [article]="article" />

      }
    </div>`,
})
export class FeaturedBlogs {
  public articles = injectContentFiles<ContentMetadata>()
    .reverse()
    .filter((_, i) => i < 3);
}
