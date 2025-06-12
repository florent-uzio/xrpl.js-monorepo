import { z } from "zod";
import { commonSchemas } from "../shared/index.js";

export const accountInfoRequestSchema = z.union([
  z.object({
    // The unique identifier of an account, typically the account's address
    account: z.string(),
    // The command to execute - must be "account_info"
    command: z.literal("account_info"),
    // A 20-byte hex string for the ledger version to use
    ledger_hash: z.string().optional(),
    // The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically
    ledger_index: z.union([z.string(), z.number()]).optional(),
    // If true, return stats about queued transactions sent by this account. Can only be used when querying for the data from the current open ledger
    queue: z.boolean().optional(),
    // If true, return any SignerList objects associated with this account
    signer_lists: z.boolean().optional(),
  }),
  commonSchemas,
]);

export const accountInfoResponseSchema = z.object({
  account_data: z.object({
    Account: z.string(),
    Balance: z.string(),
    Flags: z.number(),
    LedgerEntryType: z.string(),
    OwnerCount: z.number(),
    PreviousTxnID: z.string(),
    PreviousTxnLgrSeq: z.number(),
    Sequence: z.number(),
    index: z.string(),
  }),
  ledger_current_index: z.number().optional(),
  ledger_index: z.number().optional(),
  queue_data: z
    .object({
      txn_count: z.number(),
      auth_change_queued: z.boolean(),
      lowest_sequence: z.number(),
      highest_sequence: z.number(),
      max_spend_drops_total: z.string(),
      transactions: z.array(
        z.object({
          auth_change: z.boolean(),
          fee: z.string(),
          fee_level: z.string(),
          max_spend_drops: z.string(),
          seq: z.number(),
        })
      ),
    })
    .optional(),
  validated: z.boolean(),
});
