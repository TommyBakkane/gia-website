import { type SchemaTypeDefinition } from "sanity";

import { releaseType } from "./releaseType";
import { showType } from "./showType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [showType, releaseType],
};
