import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, interval, of, startWith, switchMap } from 'rxjs';

export interface SpotifyNowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private readonly http = inject(HttpClient);

  readonly nowPlaying = signal<SpotifyNowPlaying>({ isPlaying: false });

  constructor() {
    // Poll Spotify API every 30 seconds
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.fetchNowPlaying()),
        catchError(() => of({ isPlaying: false }))
      )
      .subscribe((data) => this.nowPlaying.set(data));
  }

  private fetchNowPlaying() {
    return this.http.get<SpotifyNowPlaying>('/api/spotify/now-playing');
  }
}
