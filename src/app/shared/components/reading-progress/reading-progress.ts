import { Component } from '@angular/core';

@Component({
  selector: 'app-reading-progress',
  styles: `
    @keyframes grow-progress {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }

    /* Firefox doesn't support animation-timeline yet, so we need to use a fallback */
    .progress-bar {
      transform-origin: left;
      transform: scaleX(0);
    }

    @supports (animation-timeline: scroll()) {
      .progress-bar {
        transform-origin: left;
        animation: grow-progress linear forwards;
        animation-timeline: scroll(root block);
      }
    }
  `,
  template: `
    <div class="fixed inset-0 w-full h-1 z-50 bg-blue-400 progress-bar"></div>
  `,
})
export class ReadingProgress {}
