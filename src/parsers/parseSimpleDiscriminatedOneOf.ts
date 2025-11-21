import { SimpleDiscriminatedOneOfSchema, Refs } from "../Types.js";
import { parseSchema } from "./parseSchema.js";

export const parseSimpleDiscriminatedOneOf = (
  schema: SimpleDiscriminatedOneOfSchema,
  refs: Refs,
) => {
  return schema.oneOf.length
    ? schema.oneOf.length === 1
      ? parseSchema(schema.oneOf[0], {
          ...refs,
          path: [...refs.path, "oneOf", 0],
        })
      : `{"type": "discriminatedUnion", "discriminator": "${schema.discriminator.propertyName}", "options": [${schema.oneOf
      .map((schema, i) =>
        parseSchema(schema, {
          ...refs,
          path: [...refs.path, "oneOf", i],
        }),
      )
      .join(", ")}]}`
    : `{"type": "any"}`;
};
