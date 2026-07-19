import { SafeHtml } from '@angular/platform-browser';

export interface ContentMetadata {
  title: string;
  date: string;
  description: string;
  draft: boolean;
  slug: string;
  coverImage: string;
  tags: string[];
}

export interface ContentWithMetadata {
  metadata: ContentMetadata;
  content: SafeHtml;
}
