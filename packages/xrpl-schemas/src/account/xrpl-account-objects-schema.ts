import { z } from "zod";

export const accountObjectsRequestSchema = z.object({
  account: z.string(),
  ledger_hash: z.string().optional(),
  ledger_index: z.union([z.string(), z.number()]).optional(),
  limit: z.number().optional(),
  marker: z.any().optional(),
  type: z
    .enum([
      "check",
      "deposit_preauth",
      "directory",
      "escrow",
      "offer",
      "payment_channel",
      "signer_list",
      "state",
    ])
    .optional(),
  deletion_blockers_only: z.boolean().optional(),
});

export const accountObjectsResponseSchema = z.object({
  account: z.string(),
  account_objects: z.array(
    z
      .object({
        Flags: z.number(),
        LedgerEntryType: z.string(),
        index: z.string(),
        OwnerNode: z.string().optional(),
        PreviousTxnID: z.string().optional(),
        PreviousTxnLgrSeq: z.number().optional(),
      })
      .catchall(z.any())
  ),
  ledger_hash: z.string().optional(),
  ledger_index: z.number().optional(),
  marker: z.any().optional(),
  validated: z.boolean(),
});
