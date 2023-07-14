import { formatSchema } from "@helpers/handleSwagger";

export const loginSchema = formatSchema({
  typeSchema: "object",
  properties: [
    { name: "email", type: "string", required: true },
    { name: "password", type: "string", required: true },
  ],
});

export const loginResponseSchema = formatSchema({
  typeSchema: "object",
  properties: [
    { name: "id", type: "string", required: false },
    { name: "token", type: "string", required: false },
  ],
});
