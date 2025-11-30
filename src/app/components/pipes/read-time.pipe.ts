import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readTime',
})
export class ReadTimePipe implements PipeTransform {
  transform(content: unknown): string {
    //  If it's empty or not a string, return 0
    if (!content || typeof content !== 'string') {
      return '0 min read';
    }

    const wordsPerMinute = 200;

    //  Strip HTML tags (if necessary) and count
    const cleanText = content.replace(/<[^>]*>/g, ' ');
    const wordCount = cleanText.split(/\s+/).length;

    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return `${minutes} min read`;
  }
}
