import type { SimplifiedAlbum } from "./album";
import type { ApiResponse } from "./apiResponse";
import type { Artist } from "./artist";
import type { SimplifiedPlaylist } from "./playlist";
import type {
  Show,
  SimplifiedAudiobook,
  SimplifiedEpisode,
  Track,
} from "./track";

export enum SEARCH_TYPE {
  ALBUM = "album",
  ARTIST = "artist",
  PLAYLIST = "playlist",
  TRACK = "track",
  SHOW = "show",
  EPISODE = "episode",
  AUDIOBOOK = "audiobook",
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: "audio";
}

export interface SearchResponse {
  artist?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  tracks?: ApiResponse<Track>;
  playlists?: ApiResponse<SimplifiedPlaylist>;
  shows?: ApiResponse<Show>;
  episodes?: ApiResponse<SimplifiedEpisode>;
  audiobooks?: ApiResponse<SimplifiedAudiobook>;
}
