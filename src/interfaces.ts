import { unfurl } from "unfurl.js";

export interface MetadataInterface {
  title?: string
  description?: string
  url: string
  video?: { url: string }
  // audio: ,
  image?: { url: string }
  logo?: string //url
  site?: string // site name e.g. Youtube
}


type Unpacked<T> = T extends (infer U)[] ? U : T;

type Unwrap<T> = T extends Promise<infer U> ? U : T;

export type UnfurlMetadata = Unwrap<ReturnType<typeof unfurl>>;

export type TwitterMetadata = Unpacked<UnfurlMetadata['twitter_card']>;
export type OEmbedMetadata = UnfurlMetadata['oEmbed'];
export type OpenGraphMetadata = Unpacked<UnfurlMetadata['open_graph']>;