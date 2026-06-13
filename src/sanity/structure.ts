import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("show").title("Concerts"),
      S.documentTypeListItem("release").title("Releases / Songs"),
    ]);
