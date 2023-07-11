import { formatSchema } from "@helpers/handleSwagger";

export const errorSchema = formatSchema({
  typeSchema: "object",
  properties: [
    ["error", "string", false],
  ],
});
