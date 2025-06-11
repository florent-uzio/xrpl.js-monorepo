import { z } from "zod";

export const accountChannelsRequestSchema = z.object({
  account: z.string(),
  destination_account: z.string().optional(),
  ledger_hash: z.string().optional(),
  ledger_index: z.union([z.string(), z.number()]).optional(),
  limit: z.number().optional(),
  marker: z.any().optional(),
});

export const accountChannelsResponseSchema = z.object({
  account: z.string(),
  channels: z.array(
    z.object({
      account: z.string(),
      amount: z.string(),
      balance: z.string(),
      channel_id: z.string(),
      destination_account: z.string(),
      destination_tag: z.number().optional(),
      expiration: z.number().optional(),
      public_key: z.string().optional(),
      public_key_hex: z.string().optional(),
      settle_delay: z.number(),
    })
  ),
  ledger_hash: z.string().optional(),
  ledger_index: z.number().optional(),
  marker: z.any().optional(),
  validated: z.boolean(),
});
