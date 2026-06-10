import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

type Node = Parameters<typeof toString>[0];

/**
 * Remark plugin that injects `minutesRead` into frontmatter.
 * Used automatically during render() for individual post pages.
 */
export function remarkReadingTime() {
  return function (tree: Node, { data }: { data: Record<string, unknown> }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro = data.astro || {};
    (data.astro as Record<string, unknown>).frontmatter =
      (data.astro as Record<string, unknown>).frontmatter || {};
    (
      (data.astro as Record<string, unknown>).frontmatter as Record<
        string,
        unknown
      >
    ).minutesRead = readingTime.text;
  };
}

/**
 * Simple reading time estimate for listing pages that don't call render().
 */
export function estimateReadingTime(content: string): string {
  return getReadingTime(content).text;
}
