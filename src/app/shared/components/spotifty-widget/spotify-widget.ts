import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMusic } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { SpotifyService } from '../../../core/services/spotify.service';

@Component({
  selector: 'app-spotify-widget',
  imports: [NgOptimizedImage, NgIcon, HlmBadgeImports],
  providers: [
    provideIcons({
      lucideMusic,
    }),
  ],
  styleUrl: './spotify-widget.css',
  template: `
    <div class="border-border bg-card relative flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5">
      <!-- Spotify Green Accent Line -->
      @if (nowPlaying().isPlaying) {
        <div
          class="absolute top-1/2 left-0 h-6 w-0.5 -translate-y-1/2 animate-pulse rounded-r-full bg-linear-to-b from-green-400 to-green-600"
        ></div>
      }

      <!-- Album Art / Icon -->
      @if (nowPlaying().isPlaying && nowPlaying().albumImageUrl) {
        <img
          width="32"
          height="32"
          class="object-cover"
          priority
          [alt]="nowPlaying().album"
          [ngSrc]="nowPlaying().albumImageUrl!"
        />
      } @else {
        <ng-icon name="lucideMusic" />
      }

      <!-- Song Info -->
      <div class="flex max-w-40 min-w-0 flex-col">
        @if (nowPlaying().isPlaying) {
          <a
            target="_blank"
            rel="noopener noreferrer"
            class="text-foreground truncate text-xs font-semibold transition-colors duration-200 hover:text-green-600 dark:hover:text-green-400"
            [href]="nowPlaying().songUrl"
            >{{ nowPlaying().title }}</a
          >
          <span class="text-muted-foreground flex items-center gap-1 truncate text-[10px]">
            <span class="inline-block size-1 animate-pulse rounded-full bg-green-500"></span>
            {{ nowPlaying().artist }}
          </span>
        } @else {
          <span hlmBadge> Not playing</span>
        }
      </div>

      <!-- Animated Equalizer Bars -->
      @if (nowPlaying().isPlaying) {
        <div class="ml-auto flex h-4 items-end gap-0.5">
          @for (bar of [1, 2, 3]; track bar) {
            <div
              class="equalizer-bar w-0.5 origin-bottom rounded-full bg-linear-to-t from-green-600 to-green-400"
              [style.height.px]="6 + bar * 2"
              [style.animation-delay]="bar * 0.1 + 's'"
            ></div>
          }
        </div>
      }
    </div>
  `,
})
export class SpotifyWidget {
  private readonly spotifyService = inject(SpotifyService);

  protected readonly nowPlaying = this.spotifyService.nowPlaying;
}
