import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideMusic } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { SpotifyService } from '../../../lib/spotify/spotify.service';

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [NgOptimizedImage, HlmIconImports],
  providers: [
    provideIcons({
      lucideMusic,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 transition-all"
    >
      @if (nowPlaying().isPlaying && nowPlaying().albumImageUrl) {
      <div class="relative w-8 h-8 rounded overflow-hidden shrink-0">
        <img
          [ngSrc]="nowPlaying().albumImageUrl!"
          alt="Album cover"
          width="32"
          height="32"
          class="object-cover"
          priority
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"
        ></div>
      </div>
      } @else {
      <div
        class="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0"
      >
        <ng-icon
          hlm
          name="lucideMusic"
          size="xs"
          class="text-zinc-500 dark:text-zinc-400"
        />
      </div>
      }

      <div class="flex flex-col min-w-0 max-w-[180px]">
        @if (nowPlaying().isPlaying) {
        <a
          [href]="nowPlaying().songUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate hover:underline"
        >
          {{ nowPlaying().title }}
        </a>
        <span class="text-[10px] text-zinc-600 dark:text-zinc-400 truncate">
          {{ nowPlaying().artist }}
        </span>
        } @else {
        <span class="text-xs text-zinc-600 dark:text-zinc-400">
          Not playing
        </span>
        }
      </div>

      @if (nowPlaying().isPlaying) {
      <div class="flex gap-0.5 items-end ml-auto">
        @for (bar of [1, 2, 3]; track bar) {
        <div
          class="w-0.5 bg-green-500 rounded-full animate-pulse"
          [style.height.px]="4 + bar * 2"
          [style.animation-delay]="bar * 0.15 + 's'"
        ></div>
        }
      </div>
      }
    </div>
  `,
})
export class NowPlaying {
  private readonly spotifyService = inject(SpotifyService);

  readonly nowPlaying = this.spotifyService.nowPlaying;
}
