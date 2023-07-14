import { formatSchema } from "@helpers/handleSwagger";

export const errorSchema = formatSchema({
  typeSchema: "object",
  properties: [{ name: "error", type: "string", required: false },
  ],
});
