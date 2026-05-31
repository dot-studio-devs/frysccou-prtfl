import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    coverImage: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.object({
      name: z.string(),
      role: z.string(),
      avatar: z.string(),
      social: z.string().optional(),
    }),
    lang: z.enum(["en", "es", "pt", "ja"]).default("en"),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

export const collections = { blog };
