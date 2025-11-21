import { JsonSchemaObject, Refs } from "../Types.js";
import { parseAnyOf } from "./parseAnyOf.js";
import { parseOneOf } from "./parseOneOf.js";
import { its, parseSchema } from "./parseSchema.js";
import { parseAllOf } from "./parseAllOf.js";

export function parseObject(
  objectSchema: JsonSchemaObject & { type: "object" },
  refs: Refs,
): string {
  let properties: string | undefined = undefined;

  if (objectSchema.properties) {
    if (its.an.anyOf(objectSchema) || its.a.oneOf(objectSchema) || its.an.allOf(objectSchema)) {
      properties = `{"type": "intersection", "left": `;
    } else {
      properties = "";
    }
    if (!Object.keys(objectSchema.properties).length) {
      properties += `{"type": "object", "properties": {}`;
    } else {
      properties += `{"type": "object", "properties": {`;

      properties += Object.keys(objectSchema.properties)
        .map((key) => {
          const propSchema = objectSchema.properties![key];

          let result = `${JSON.stringify(key)}: ${parseSchema(propSchema, {
            ...refs,
            path: [...refs.path, "properties", key],
          })}`;

          const hasDefault =
            typeof propSchema === "object" && propSchema.default !== undefined;

          const required = Array.isArray(objectSchema.required)
            ? objectSchema.required.includes(key)
            : typeof propSchema === "object" && propSchema.required === true;

          const optional = !hasDefault && !required;

          return optional ? `${result.slice(0, -1)}, "isOptional": true}` : result;
        })
        .join(", ");

      properties += "}";
    }
  }

  const additionalProperties =
    objectSchema.additionalProperties !== undefined
      ? parseSchema(objectSchema.additionalProperties, {
          ...refs,
          path: [...refs.path, "additionalProperties"],
        })
      : undefined;

  let output = properties
    ? additionalProperties
      ? additionalProperties === `{"type": "never"}`
        ? properties + `, "catchall": {"type": "never"}`
        : properties + `, "catchall": ${additionalProperties}`
      : properties
    : additionalProperties
      ? `{"type": "record", "key": {"type": "string"}, "value": ${additionalProperties}`
      : `{"type": "record", "key": {"type": "string"}, "value": {"type": "any"}`;

  if (its.an.anyOf(objectSchema)) {
    output += `}, "right": ${parseAnyOf(
      {
        ...objectSchema,
        anyOf: objectSchema.anyOf.map((x) =>
          typeof x === "object" &&
          !x.type &&
          (x.properties || x.additionalProperties || x.patternProperties)
            ? { ...x, type: "object" }
            : x,
        ) as any,
      },
      refs,
    )}`;
  }

  if (its.a.oneOf(objectSchema)) {
    output += `}, "right": ${parseOneOf(
      {
        ...objectSchema,
        oneOf: objectSchema.oneOf.map((x) =>
          typeof x === "object" &&
          !x.type &&
          (x.properties || x.additionalProperties || x.patternProperties)
            ? { ...x, type: "object" }
            : x,
        ) as any,
      },
      refs,
    )}`;
  }

  if (its.an.allOf(objectSchema)) {
    output += `}, "right": ${parseAllOf(
      {
        ...objectSchema,
        allOf: objectSchema.allOf.map((x) =>
          typeof x === "object" &&
          !x.type &&
          (x.properties || x.additionalProperties || x.patternProperties)
            ? { ...x, type: "object" }
            : x,
        ) as any,
      },
      refs,
    )}`;
  }

  output += '}';

  return output;
}
