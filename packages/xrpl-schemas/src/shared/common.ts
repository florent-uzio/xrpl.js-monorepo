import { z } from "zod";

export const commonSchemas = z.object({
  command: z.string(),
  id: z.string(),
  api_version: z.number(),
});
