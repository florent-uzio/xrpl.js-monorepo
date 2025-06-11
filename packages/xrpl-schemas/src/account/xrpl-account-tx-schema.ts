import { z } from "zod";

export const accountTxRequestSchema = z.object({
  account: z.string(),
  ledger_index_min: z.number().optional(),
  ledger_index_max: z.number().optional(),
  ledger_hash: z.string().optional(),
  ledger_index: z.union([z.string(), z.number()]).optional(),
  binary: z.boolean().optional(),
  forward: z.boolean().optional(),
  limit: z.number().optional(),
  marker: z.any().optional(),
});

export const accountTxResponseSchema = z.object({
  account: z.string(),
  ledger_index_min: z.number(),
  ledger_index_max: z.number(),
  limit: z.number(),
  marker: z.any().optional(),
  transactions: z.array(
    z.object({
      meta: z.object({
        AffectedNodes: z.array(z.any()),
        TransactionIndex: z.number(),
        TransactionResult: z.string(),
        delivered_amount: z.string().optional(),
      }),
      tx: z.object({
        Account: z.string(),
        Fee: z.string(),
        Flags: z.number(),
        LastLedgerSequence: z.number(),
        Sequence: z.number(),
        SigningPubKey: z.string(),
        TransactionType: z.string(),
        TxnSignature: z.string(),
        date: z.number(),
        hash: z.string(),
        inLedger: z.number(),
        ledger_index: z.number(),
      }),
      validated: z.boolean(),
    })
  ),
  validated: z.boolean(),
});
