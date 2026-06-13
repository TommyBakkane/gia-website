import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const releaseType = defineType({
  name: "release",
  title: "Release / Song",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Feature this release",
      description: "Shows this song as the large featured release.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description: "Lower numbers appear first. Featured release uses its own slot.",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "cover", featured: "isFeatured" },
    prepare({ title, media, featured }) {
      return {
        title,
        subtitle: featured ? "Featured release" : undefined,
        media,
      };
    },
  },
});
