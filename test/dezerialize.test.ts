import { dezerialize } from "zodex";
import { jsonSchemaToZodex } from "../src/jsonSchemaToZodex.js";
import { suite } from "./suite.js";

suite("dezerialize", (test) => {
  test("is usable I guess", (assert) => {
    const zodSchema = dezerialize(
      JSON.parse(jsonSchemaToZodex({ type: "string" })),
    );

    assert(zodSchema.safeParse("Testing"), {
      success: true,
      data: "Testing",
    });
  });
});
