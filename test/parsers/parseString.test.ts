import { dezerialize } from "zodex";
import { parseString } from "../../src/parsers/parseString";
import { suite } from "../suite";

suite("parseString", (test) => {
  test("email", (assert) => {
    assert(
      parseString({
        type: "string",
        format: "email",
      }),
      `{"type": "string", "kind": "email"}`,
    );
  });

  test("ip", (assert) => {
    assert(
      parseString({
        type: "string",
        format: "ip",
      }),
      `{"type": "string", "kind": "ip", "version": "v4"}`,
    );
    assert(
      parseString({
        type: "string",
        format: "ipv6",
      }),
      `{"type": "string", "kind": "ip", "version": "v6"}`,
    );
  });

  test("uri", (assert) => {
    assert(
      parseString({
        type: "string",
        format: "uri",
      }),
      `{"type": "string", "kind": "url"}`,
    );
  });

  test("uuid", (assert) => {
    assert(
      parseString({
        type: "string",
        format: "uuid",
      }),
      `{"type": "string", "kind": "uuid"}`,
    );
  });

  test("time", (assert) => {
    assert(
      parseString({
        type: "string",
        format: "time",
      }),
      `{"type": "string", "kind": "time"}`,
    );
  });

  test("date", (assert) => {
    assert(
      parseString({
        type: "string",
        format: "date",
      }),
      `{"type": "string", "kind": "date"}`,
    );
  });

  test("duration", (assert) => {
    assert(
      parseString({
        type: "string",
        format: "duration",
      }),
      `{"type": "string", "kind": "duration"}`,
    );
  });

  test("base64", (assert) => {
    assert(
      parseString({
        type: "string",
        contentEncoding: "base64",
      }),
      `{"type": "string", "kind": "base64"}`,
    );

    assert(
      parseString({
        type: "string",
        format: "binary",
      }),
      `{"type": "string", "kind": "base64"}`,
    );
  });
});
