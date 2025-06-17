import { createTool } from "@mastra/core";
import { AccountInfoRequest } from "xrpl";
import { z } from "zod";
import { accountInfoRequestSchema } from "xrpl-schemas";
import { type NetworkType, xrplClient } from "../../helpers";

export const xrplAccountInfo = createTool({
  id: "account-info",
  description:
    "The account_info command retrieves information about an account, its activity, its flags and its XRP balance. All information retrieved is relative to a particular version of the ledger.",
  inputSchema: z.object({
    request: accountInfoRequestSchema,
    network: z.custom<NetworkType>(),
  }),
  execute: async ({ context }) => {
    const client = await xrplClient.getClient(context.network);
    const response = await client.request(
      context.request as AccountInfoRequest
    );
    await xrplClient.disconnect(context.network);
    return response;
  },
});
