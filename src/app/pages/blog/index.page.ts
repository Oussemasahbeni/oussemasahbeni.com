import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { Component, computed, signal } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BlogPreview } from '../../components/blog/blog-preview/blog-preview';
import { ContentMetadata } from '../../lib/content-metadata/content-metadata';

export const routeMeta: RouteMeta = {
  title: 'Blog - Oussema Sahbeni',
};

@Component({
  selector: 'app-blog',
  imports: [BlogPreview, HlmButtonImports],
  host: {
    class: 'block max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24',
  },
  template: `
    <div class="flex flex-col gap-10">
      <!-- HEADER -->
      <div class="border-b border-border/40 pb-8">
        <h1
          class="text-3xl font-bold tracking-tight sm:text-4xl text-foreground"
        >
          Latest Updates
        </h1>
        <p class="mt-4 text-muted-foreground text-lg">
          Thoughts on Software Engineering.
        </p>

        <!-- TAG FILTER SECTION -->
        <div class="flex flex-wrap gap-2 mt-8">
          <button
            hlmBtn
            size="sm"
            [variant]="activeTag() === 'All' ? 'default' : 'secondary'"
            class="transition-all"
            (click)="setTag('All')"
          >
            All
          </button>

          @for (tag of uniqueTags(); track tag) {
          <button
            hlmBtn
            size="sm"
            [variant]="activeTag() === tag ? 'default' : 'secondary'"
            class="transition-all"
            (click)="setTag(tag)"
          >
            {{ tag }}
          </button>
          }
        </div>
      </div>

      <!-- ARTICLE LIST -->
      <div class="flex flex-col gap-10">
        @for (article of filteredArticles(); track article.attributes.slug) {
        <div class="animate-in fade-in slide-in-from-bottom-4 duration-250">
          <app-blog-preview [article]="article.attributes" />
        </div>
        } @empty {
        <div class="py-20 text-center text-muted-foreground">
          No articles found for "{{ activeTag() }}"
        </div>
        }
      </div>
    </div>
  `,
})
export default class Blog {
  readonly allArticles = injectContentFiles<ContentMetadata>();

  readonly uniqueTags = signal<string[]>(
    [
      ...new Set(
        this.allArticles.flatMap((article) => article.attributes.tags || [])
      ),
    ].sort()
  );
  readonly activeTag = signal<string>('All');

  readonly filteredArticles = computed(() => {
    const currentTag = this.activeTag();

    // Sort by date (newest first)
    const sorted = this.allArticles.sort(
      (a, b) =>
        new Date(b.attributes.date).getTime() -
        new Date(a.attributes.date).getTime()
    );

    if (currentTag === 'All') {
      return sorted;
    }

    return sorted.filter((article) =>
      article.attributes.tags?.includes(currentTag)
    );
  });

  setTag(tag: string) {
    this.activeTag.set(tag);
  }
}
