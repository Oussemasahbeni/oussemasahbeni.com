import fm from 'front-matter';
import { defineEventHandler, setHeader } from 'h3';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export default defineEventHandler((event) => {
  //  Define your site details
  const SITE_URL = 'https://www.oussemasahbeni.com';
  const BLOG_URL = `${SITE_URL}/blog`;

  // Locate your content folder
  const contentDir = join(process.cwd(), 'src/content');

  // Read all files in the directory
  const files = readdirSync(contentDir).filter((file) => file.endsWith('.md'));

  //  Parse the content
  const posts = files
    .map((file) => {
      const fileContent = readFileSync(join(contentDir, file), 'utf-8');
      const { attributes } = fm(fileContent) as any;

      // Use the slug from frontmatter OR filename
      const slug = attributes.slug || file.replace('.md', '');

      return {
        title: attributes.title,
        date: new Date(attributes.date).toUTCString(),
        rawDate: new Date(attributes.date),
        description: attributes.description || '',
        link: `${BLOG_URL}/${slug}`,
      };
    })
    .filter((post) => !(post as any).draft)
    // Sort by newest first
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

  // Generate XML Items
  const feedItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <guid>${post.link}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.date}</pubDate>
    </item>
  `
    )
    .join('');

  // Return the Full XML
  const feedString = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Oussema Sahbeni</title>
      <link>${SITE_URL}</link>
      <description>Full Stack Developer | Spring Boot And Angular</description>
      <language>en-us</language>
      <atom:link href="${SITE_URL}/api/rss.xml" rel="self" type="application/rss+xml" />
      ${feedItems}
    </channel>
    </rss>`;

  setHeader(event, 'content-type', 'text/xml');
  return feedString;
});
