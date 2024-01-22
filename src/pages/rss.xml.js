import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      const { published_date, ...rest } = post.data;
      const data = { ...rest, pubDate: published_date };
      return { ...data, link: `/blog/${post.slug}/` };
    }),
  });
}
