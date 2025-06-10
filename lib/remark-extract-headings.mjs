import { visit } from 'unist-util-visit';
import Slugger from 'github-slugger';

/**
 * @typedef {import('unified').Transformer} Transformer
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Heading} Heading
 */

/**
 * Extracts headings from a MDX document and adds them to the file's frontmatter.
 * @returns {Transformer<Root, Root>}
 */
export default function remarkExtractHeadings() {
  return (tree, file) => {
    const headings = [];
    const slugger = new Slugger();

    visit(tree, 'heading', (node) => {
      // We only care about h2 and h3 headings
      if (node.depth === 2 || node.depth === 3) {
        const text = node.children
          .filter(child => child.type === 'text')
          .map(child => child.value)
          .join('');

        headings.push({
          text: text,
          level: node.depth,
          id: slugger.slug(text),
        });
      }
    });

    // Add the headings to the file's frontmatter
    file.data.headings = headings;
  };
}
