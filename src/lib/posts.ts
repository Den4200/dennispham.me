import { getCollection } from "astro:content";

export async function getPublishedPosts() {
  return (
    await getCollection("blog", ({ data }) => {
      return import.meta.env.DEV || !data.draft;
    })
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
