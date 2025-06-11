import { z } from "zod";

export const accountLinesRequestSchema = z.object({
  account: z.string(),
  peer: z.string().optional(),
  ledger_hash: z.string().optional(),
  ledger_index: z.union([z.string(), z.number()]).optional(),
  limit: z.number().optional(),
  marker: z.any().optional(),
  role: z.enum(["gateway", "user"]).optional(),
});

export const accountLinesResponseSchema = z.object({
  account: z.string(),
  ledger_hash: z.string().optional(),
  ledger_index: z.number().optional(),
  lines: z.array(
    z.object({
      account: z.string(),
      balance: z.string(),
      currency: z.string(),
      limit: z.string(),
      limit_peer: z.string(),
      quality_in: z.number().optional(),
      quality_out: z.number().optional(),
      no_ripple: z.boolean().optional(),
      no_ripple_peer: z.boolean().optional(),
      authorized: z.boolean().optional(),
      peer_authorized: z.boolean().optional(),
      freeze: z.boolean().optional(),
      freeze_peer: z.boolean().optional(),
    })
  ),
  marker: z.any().optional(),
  validated: z.boolean(),
});
