import { JsonSchemaObject } from "../Types.js";

type Opener = string;
type MessagePrefix = string;
type Closer = string;

type Builder = [Opener, Closer] | [Opener, MessagePrefix, Closer];

export function withMessage(
  schema: JsonSchemaObject,
  key: string,
  get: (props: { value: unknown; json: string }) => Builder | void,
) {
  const value = schema[key as keyof typeof schema];

  let r = "";

  if (value !== undefined) {
    const got = get({ value, json: JSON.stringify(value) });

    if (got) {
      const opener = got[0];
      const closer = got[1];

      r += opener;

      r;
      r += closer;
    }
  }

  return r;
}
