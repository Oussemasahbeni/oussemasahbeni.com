import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideMusic } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { SpotifyService } from '../../lib/spotify/spotify.service';

@Component({
  selector: 'app-now-playing',
  imports: [NgOptimizedImage, HlmIconImports],
  providers: [
    provideIcons({
      lucideMusic,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-linear-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-800/90 dark:to-zinc-900/90 border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm hover:shadow-md dark:shadow-zinc-950/50 transition-all duration-300 backdrop-blur-sm"
    >
      <!-- Spotify Green Accent Line -->
      @if (nowPlaying().isPlaying) {
      <div
        class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-linear-to-b from-green-400 to-green-600 rounded-r-full animate-pulse"
      ></div>
      }

      <!-- Album Art / Icon -->
      @if (nowPlaying().isPlaying && nowPlaying().albumImageUrl) {
      <img
        [ngSrc]="nowPlaying().albumImageUrl!"
        alt="Album cover"
        width="32"
        height="32"
        class="object-cover "
        priority
      />

      } @else {
      <div
        class="w-8 h-8 rounded-md bg-linear-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center shrink-0 shadow-sm"
      >
        <ng-icon
          hlm
          name="lucideMusic"
          size="xs"
          class="text-zinc-500 dark:text-zinc-400"
        />
      </div>
      }

      <!-- Song Info -->
      <div class="flex flex-col min-w-0 max-w-40">
        @if (nowPlaying().isPlaying) {
        <a
          [href]="nowPlaying().songUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
        >
          {{ nowPlaying().title }}
        </a>
        <span
          class="text-[10px] text-zinc-600 dark:text-zinc-400 truncate flex items-center gap-1"
        >
          <span
            class="inline-block w-1 h-1 rounded-full bg-green-500 animate-pulse"
          ></span>
          {{ nowPlaying().artist }}
        </span>
        } @else {
        <span class="text-xs font-medium text-zinc-500 dark:text-zinc-500">
          Not playing
        </span>
        }
      </div>

      <!-- Animated Equalizer Bars -->
      @if (nowPlaying().isPlaying) {
      <div class="flex gap-0.5 items-end ml-auto h-4">
        @for (bar of [1, 2, 3]; track bar) {
        <div
          class="w-0.5 bg-linear-to-t from-green-600 to-green-400 rounded-full origin-bottom equalizer-bar"
          [style.height.px]="6 + bar * 2"
          [style.animation-delay]="bar * 0.1 + 's'"
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
