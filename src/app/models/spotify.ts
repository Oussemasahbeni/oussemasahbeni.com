export interface SpotifyTokenResponse {
  access_token: string;
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item: {
    name: string;
    artists: SpotifyArtist[];
    album: {
      name: string;
      images: { url: string }[];
    };
    external_urls: { spotify: string };
  };
}