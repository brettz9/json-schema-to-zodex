import { JsonSchemaObject, Serializable } from "../Types.js";

export const parseConst = (
  schema: JsonSchemaObject & { const: Serializable },
) => {
  return `{"type": "literal", "values": [${JSON.stringify(schema.const)}]}`;
};
