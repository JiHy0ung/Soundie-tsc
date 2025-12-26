import type { ExternalUrls, Image } from "./commonType";

export interface Artist {
  external_urls?: ExternalUrls;
  followers?: { href?: string | null; total?: number };
  genres: string[];
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  popularity?: number;
  type?: "artist";
  url?: string;
}
