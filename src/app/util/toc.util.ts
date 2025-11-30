export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function parseToc(content: string | object | undefined): TocItem[] {
  if (typeof content !== 'string' || !content) return [];

  // Regex breakdown:
  // 1. <h(2|3)      -> Matches <h2> or <h3> (Capture group 1 = level)
  // 2. [^>]*        -> Matches attributes before the ID
  // 3. id=["']      -> Matches id=" or id='
  // 4. ([^"']+)     -> Captures the ID value (Capture group 2 = id)
  // 5. ["']         -> Matches closing quote
  // 6. [^>]*>       -> Matches remaining attributes and closing bracket
  // 7. (.*?)        -> Captures the text content (Capture group 3 = text)
  // 8. <\/h\1>      -> Matches closing tag </h2 or </h3 (Backreference to group 1)
  const regex = /<h(2|3)[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h\1>/gm;

  const toc: TocItem[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = parseInt(match[1], 10); // Group 1: "2" or "3"
    const id = match[2]; // Group 2: The actual ID string
    let text = match[3]; // Group 3: The text content

    // Optional: Strip inner HTML tags from the text (e.g. if title has <code> or <em>)
    // Example: "Intro to <code>NgFor</code>" becomes "Intro to NgFor"
    text = text.replace(/<[^>]*>/g, '').trim();

    // Decode HTML entities if necessary (e.g. &amp; -> &)
    text = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"');

    toc.push({ id, text, level });
  }

  return toc;
}
