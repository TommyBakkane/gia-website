import { groq } from "next-sanity";

export interface ShowDoc {
  _id: string;
  date: string;
  venue: string;
  location: string;
  ticketLink?: string;
  isFeatured?: boolean;
}

export interface ReleaseDoc {
  _id: string;
  title: string;
  spotifyUrl: string;
  isFeatured?: boolean;
}

export const showsQuery = groq`
  *[_type == "show"] | order(date asc) {
    _id, date, venue, location, ticketLink, isFeatured
  }
`;

export const releasesQuery = groq`
  *[_type == "release"] | order(order asc) {
    _id, title, spotifyUrl, isFeatured
  }
`;
