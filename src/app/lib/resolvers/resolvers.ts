import { injectContentFiles } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ContentMetadata } from '../content-metadata/content-metadata';

function injectActiveContentMetadata(
  route: ActivatedRouteSnapshot
): ContentMetadata {
  const file = injectContentFiles<ContentMetadata>().find((contentFile) => {
    return (
      contentFile.filename === `/src/content/${route.params['slug']}.md` ||
      contentFile.slug === route.params['slug']
    );
  });

  return file!.attributes;
}

export const postTitleResolver: ResolveFn<string> = (route) =>
  injectActiveContentMetadata(route).title;

export const postMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const meta = injectActiveContentMetadata(route);

  return [
    { name: 'description', content: meta.description },
    { name: 'author', content: 'Oussema Sahbeni' },

    // --- Open Graph (Facebook / LinkedIn) ---
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:type', content: 'article' },
    // { property: 'og:url', content: postUrl },
    // { property: 'og:image', content: imageUrl },
    { property: 'og:site_name', content: 'Oussema Sahbeni Portfolio' },

    // --- Twitter / X ---
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    // { name: 'twitter:image', content: imageUrl },
  ];
};
