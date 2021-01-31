import { unfurl } from 'unfurl.js';

export interface MetadataInterface {
  title?: string;
  description?: string;
  url: string;
  video?: { url: string };
  // audio: ,
  image?: { url: string };
  logo?: string; //url
  site?: string; // site name e.g. Youtube
}

type Unpacked<T> = T extends (infer U)[] ? U : T;

type Unwrap<T> = T extends Promise<infer U> ? U : T;

export type UnfurlMetadata = Unwrap<ReturnType<typeof unfurl>>;

export interface TwitterMetadata extends Unpacked<UnfurlMetadata['twitter_card']> {
  url?: string;
}
export type OEmbedMetadata = UnfurlMetadata['oEmbed'];
export interface OpenGraphMetadata extends Unpacked<UnfurlMetadata['open_graph']> {
  site_name?: string;
}
