import { injectContentFiles } from '@analogjs/content';
import { Component } from '@angular/core';
import { BlogPreviewComponent } from '../../components/blog/blog-preview/blog-preview.component';
import { ContentMetadata } from '../../lib/content-metadata/content-metadata';

@Component({
  selector: 'app-blog',
  imports: [BlogPreviewComponent],
  host: {
    class: 'block max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24',
  },
  template: `
    <div class="flex flex-col gap-16">
      <div class="border-b border-border/40 pb-10">
        <h1
          class="text-3xl font-bold tracking-tight sm:text-4xl text-foreground"
        >
          Latest Updates
        </h1>
        <p class="mt-4 text-muted-foreground text-lg">
          Thoughts on Software Engineering.
        </p>
      </div>

      <div class="flex flex-col space-y-20">
        @for (article of articles; track article.attributes.slug) {
        <app-blog-preview [article]="article.attributes"></app-blog-preview>
        }
      </div>
    </div>
  `,
})
export default class Blog {
  readonly articles = injectContentFiles<ContentMetadata>();
}
