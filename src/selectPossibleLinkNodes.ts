import { selectAll } from 'unist-util-select';
import { Node } from 'unist';

export const selectPossibleLinkNodes = (markdownAST): Node[] => {
  return selectAll('paragraph:has(link:only-child)', markdownAST);
};
