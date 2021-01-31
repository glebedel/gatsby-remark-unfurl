import fs from 'fs';
import path from 'path';
import { unfurl } from 'unfurl.js';
import { selectPossibleLinkNodes } from './selectPossibleLinkNodes';
import logResults from './logResults.js';
import { tranformsLinkNodeToUnfurledNode } from './transformLinkToUnfurledNode';
import { Node } from 'unist';
import { MetadataInterface, OEmbedMetadata, OpenGraphMetadata, TwitterMetadata, UnfurlMetadata } from './interfaces';

export default async (
  { markdownAST, markdownNode, cache, reporter }: { markdownAST: any; markdownNode: any; cache: any; reporter: any },
  rawOptions: any,
) => {
  try {
    const options = rawOptions;

    let processedUrlsJSON = {};

    if (fs.existsSync(options.processedUrlsFile)) {
      const processedUrlsFile = fs.readFileSync(options.processedUrlsFile);
      processedUrlsJSON = JSON.parse(processedUrlsFile.toString('utf8'));
    } else {
      fs.mkdirSync(path.dirname(options.processedUrlsFile), {
        recursive: true,
      });
      fs.writeFileSync(options.processedUrlsFile, '{}');
    }

    const nodes = selectPossibleLinkNodes(markdownAST);
    ƒ;
    if (nodes.length > 0) {
      const results = await Promise.all(
        nodes.map((node: any) => processNode(node, options, processedUrlsJSON, reporter)),
      );
      fs.writeFileSync(options.processedUrlsFile, JSON.stringify(processedUrlsJSON, null, 2));
      logResults(results, markdownNode, reporter);
    }
  } catch (error) {
    // reporter.error(`gatsby-remark-link-unfurl: Error processing links`, error);
  }
};

// For each node this is the process
const processNode = async (
  node: any,
  options: any,
  processedUrl: { [key: string]: MetadataInterface },
  reporter,
): Promise<Node> => {
  try {
    const url = node.children[0].url;
    const metaData: UnfurlMetadata = await unfurl(url);
    reporter.info(node, metaData);

    const twitter: TwitterMetadata = metaData.twitter_card?.[0];
    const openGraph: OpenGraphMetadata = metaData.open_graph?.[0];
    const oEmbed: OEmbedMetadata = metaData.oEmbed;
    if (!processedUrl[url]) {
      processedUrl[url] = {
        title: twitter.title ?? openGraph?.title ?? metaData.title,
        description: twitter?.description ?? openGraph?.description ?? metaData.description,
        url: twitter?.url ?? openGraph?.url ?? url,
        video: openGraph?.videos?.[0] || undefined,
        image: twitter?.images?.[0] || openGraph?.images?.[0] || undefined,
        logo: metaData.favicon,
        site: oEmbed?.provider_name || openGraph?.site_name || twitter?.site || undefined,
      };
    }

    return tranformsLinkNodeToUnfurledNode(node, processedUrl[url], reporter);
  } catch (error) {
    error.url = node.url;
    return error;
  }
};