import { z } from "zod";

export const accountNftsRequestSchema = z.object({
  account: z.string(),
  ledger_hash: z.string().optional(),
  ledger_index: z.union([z.string(), z.number()]).optional(),
  limit: z.number().optional(),
  marker: z.any().optional(),
});

export const accountNftsResponseSchema = z.object({
  account: z.string(),
  account_nfts: z.array(
    z.object({
      Flags: z.number(),
      Issuer: z.string(),
      NFTokenID: z.string(),
      NFTokenTaxon: z.number(),
      URI: z.string().optional(),
      nft_serial: z.number(),
    })
  ),
  ledger_hash: z.string().optional(),
  ledger_index: z.number().optional(),
  marker: z.any().optional(),
  validated: z.boolean(),
});
