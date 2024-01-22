import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    og_title: z.string(),
    description: z.string(),
    published_date: z.coerce.date(),
  }),
});

const courses = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    published_date: z.coerce.date(),
  }),
});

export const collections = { blog, courses };
