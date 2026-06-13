import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const showType = defineType({
  name: "show",
  title: "Concert",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location (city)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "DD MMM YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ticketLink",
      title: "Ticket link",
      description: "Optional. Full URL where fans can buy tickets.",
      type: "url",
    }),
    defineField({
      name: "isFeatured",
      title: "Feature this concert",
      description: "Highlights one upcoming concert at the top of the section.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Date, soonest first",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "venue", subtitle: "location", date: "date" },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: [date, subtitle].filter(Boolean).join(" · "),
      };
    },
  },
});
