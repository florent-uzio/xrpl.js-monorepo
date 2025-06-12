import { z } from "zod";

export const accountCurrenciesRequestSchema = z.object({
  account: z.string(),
  ledger_hash: z.string().optional(),
  ledger_index: z.union([z.string(), z.number()]).optional(),
  strict: z.boolean().optional(),
});

export const accountCurrenciesResponseSchema = z.object({
  ledger_hash: z.string().optional(),
  ledger_index: z.number().optional(),
  receive_currencies: z.array(z.string()),
  send_currencies: z.array(z.string()),
  validated: z.boolean(),
});
