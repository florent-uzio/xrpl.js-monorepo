import { z } from "zod";

export const accountOffersRequestSchema = z.object({
  account: z.string(),
  ledger_hash: z.string().optional(),
  ledger_index: z.union([z.string(), z.number()]).optional(),
  limit: z.number().optional(),
  marker: z.any().optional(),
});

export const accountOffersResponseSchema = z.object({
  account: z.string(),
  offers: z.array(
    z.object({
      flags: z.number(),
      quality: z.string(),
      seq: z.number(),
      taker_gets: z.union([
        z.string(), // XRP amount
        z.object({
          currency: z.string(),
          issuer: z.string(),
          value: z.string(),
        }),
      ]),
      taker_pays: z.union([
        z.string(), // XRP amount
        z.object({
          currency: z.string(),
          issuer: z.string(),
          value: z.string(),
        }),
      ]),
      expiration: z.number().optional(),
    })
  ),
  ledger_hash: z.string().optional(),
  ledger_index: z.number().optional(),
  marker: z.any().optional(),
  validated: z.boolean(),
});
