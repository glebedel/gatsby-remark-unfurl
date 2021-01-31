import { MetadataInterface } from './interfaces';
import { Node } from 'unist';
import * as mustache from 'mustache';
export const tranformsLinkNodeToUnfurledNode = (node: Node, card: MetadataInterface, reporter) => {
  node.type = 'html';
  const template = `<a class='gatsby-remark-link-unfurl__container' href='{{card.url}}' target='_blank' title='{{card.title}}'>{{#card.image}}<img class='gatsby-remark-link-unfurl__media' src='{{card.image.url}}'/>{{/card.image}}<div class='gatsby-remark-link-unfurl__content'><header class='gatsby-remark-link-unfurl__title'><p  title='{{card.title}}'>{{card.title}}</p></header><div class='gatsby-remark-link-unfurl__description'><p title='{{card.description}}'>{{card.description}}</p></div><footer><p title='{{card.site}}'>{{card.site}}</p><span title='{{card.site}}' style='background-image: url({{card.logo}}); background-repeat: no-repeat; background-position: center center;'></span></footer></div></a>`;
  node.value = mustache.render(template, { card: card });

  delete node.children;
  reporter.info(node);
  return node;
};
