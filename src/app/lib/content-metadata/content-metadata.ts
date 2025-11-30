import { SafeHtml } from '@angular/platform-browser';

export type ContentMetadata = {
  title: string;
  date: string;
  description: string;
  draft: boolean;
  slug: string;
  tags: string[];
};

export type ContentWithMetadata = {
  metadata: ContentMetadata;
  content: SafeHtml;
};
