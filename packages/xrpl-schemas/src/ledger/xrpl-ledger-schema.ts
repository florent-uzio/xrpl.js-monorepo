import { z } from "zod";

export const ledgerRequestSchema = z.object({
  ledger_hash: z.string().optional(),
  ledger_index: z.union([z.string(), z.number()]).optional(),
  accounts: z.boolean().optional(),
  transactions: z.boolean().optional(),
  expand: z.boolean().optional(),
  owner_funds: z.boolean().optional(),
  binary: z.boolean().optional(),
  queue: z.boolean().optional(),
});

export const ledgerResponseSchema = z.object({
  ledger: z.object({
    accepted: z.boolean(),
    account_hash: z.string(),
    close_flags: z.number(),
    close_time: z.number(),
    close_time_human: z.string(),
    close_time_resolution: z.number(),
    closed: z.boolean(),
    hash: z.string(),
    ledger_hash: z.string(),
    ledger_index: z.string(),
    parent_close_time: z.number(),
    parent_hash: z.string(),
    seqNum: z.string(),
    totalCoins: z.string(),
    transaction_hash: z.string(),
    transactions: z.array(z.any()).optional(),
    accounts: z.array(z.any()).optional(),
  }),
  ledger_hash: z.string(),
  ledger_index: z.number(),
  validated: z.boolean(),
});
