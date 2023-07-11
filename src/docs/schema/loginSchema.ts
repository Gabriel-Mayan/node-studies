import { formatSchema } from "@helpers/handleSwagger";

export const loginSchema = formatSchema({
  typeSchema: "object",
  properties: [
    ["email", "string", true],
    ["password", "string", true],
  ],
});

export const loginResponseSchema = formatSchema({
  typeSchema: "object",
  properties: [
    ["id", "string", false],
    ["token", "string", false],
  ],
});
