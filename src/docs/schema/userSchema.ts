import { formatSchema } from "@helpers/handleSwagger";

export const createUserSchema = formatSchema({
  typeSchema: "object",
  properties: [
    ["name", "string", true],
    ["email", "string", true],
    ["password", "string", true],
  ],
});
