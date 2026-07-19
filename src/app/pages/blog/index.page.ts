import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { Component, computed, signal } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BlogPreview } from '../../components/blog/blog-preview/blog-preview';
import { ContentMetadata } from '../../models/content-metadata';
import { NoiseBackgroundComponent } from '../../shared/components/noise-background/noise-background';

export const routeMeta: RouteMeta = {
  title: 'Blog - Oussema Sahbeni',
};

@Component({
  selector: 'app-blog',
  imports: [BlogPreview, HlmButtonImports, NoiseBackgroundComponent],
  host: {
    class: 'block max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 py-24',
  },
  template: `
    <app-noise-background />
    <div class="flex flex-col gap-10">
      <!-- HEADER -->
      <div class="border-border/40 border-b pb-8">
        <h1 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">Latest Updates</h1>
        <p class="text-muted-foreground mt-4 text-lg">Thoughts on Software Engineering.</p>

        <!-- TAG FILTER SECTION -->
        <div class="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            hlmBtn
            size="sm"
            class="transition-all"
            [variant]="activeTag() === 'All' ? 'default' : 'secondary'"
            (click)="setTag('All')"
          >
            All
          </button>

          @for (tag of uniqueTags(); track tag) {
            <button
              type="button"
              hlmBtn
              size="sm"
              class="transition-all"
              [variant]="activeTag() === tag ? 'default' : 'secondary'"
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
          <div class="text-muted-foreground py-20 text-center">No articles found for "{{ activeTag() }}"</div>
        }
      </div>
    </div>
  `,
})
export default class Blog {
  protected readonly allArticles = injectContentFiles<ContentMetadata>();

  protected readonly uniqueTags = signal<string[]>(
    [...new Set(this.allArticles.flatMap((article) => article.attributes.tags || []))].sort()
  );
  protected readonly activeTag = signal<string>('All');

  protected readonly filteredArticles = computed(() => {
    const currentTag = this.activeTag();

    // Sort by date (newest first)
    const sorted = this.allArticles.sort(
      (a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
    );

    if (currentTag === 'All') {
      return sorted;
    }

    return sorted.filter((article) => article.attributes.tags?.includes(currentTag));
  });

  setTag(tag: string) {
    this.activeTag.set(tag);
  }
}
