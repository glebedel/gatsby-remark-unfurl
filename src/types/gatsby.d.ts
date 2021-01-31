import { Node } from 'unist';

export interface GatsbyReporter {
  verbose: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string, error?: Error) => void;
  panic: (message: string, error?: Error) => void;
  panicOnBuild: (message: string, error?: Error) => void;
}

export interface GatsbyCache {
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<any>;
}

export interface TransformerOptions {
  marker: string;
  markdownAST: Node;
  markdownNode: any;
  cache: GatsbyCache;
  reporter: GatsbyReporter;
}
