import { JsonSchemaObject, JsonSchema, Refs } from "../Types.js";
import { parseSchema } from "./parseSchema.js";

export const parseOneOf = (
  schema: JsonSchemaObject & { oneOf: JsonSchema[] },
  refs: Refs,
) => {
  return schema.oneOf.length
    ? parseSchema(schema.oneOf[0], {
      ...refs,
      path: [...refs.path, "oneOf", 0],
    })
    : `{"type": "any"}`;
};
