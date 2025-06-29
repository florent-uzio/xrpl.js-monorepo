import { createTool } from "@mastra/core";
import { AccountInfoRequest, AccountInfoResponse, Client, Request } from "xrpl";
import { z } from "zod";
import { accountInfoRequestSchema } from "xrpl-schemas";

// https://xrpl.org/public-servers.html
const networks = {
  mainnet: "wss://s2.ripple.com",
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233",
} as const;

export const xrplAccountInfoTool = createTool({
  id: "account-info",
  description:
    "The account_info command retrieves information about an account, its activity, its flags and its XRP balance. All information retrieved is relative to a particular version of the ledger.",
  inputSchema: z.object({
    request: accountInfoRequestSchema,
    network: z.enum(["mainnet", "testnet", "devnet"]),
  }),
  execute: async ({ context }) => {
    const network = networks[context.network];
    const client = new Client(network);
    await client.connect();
    const response = await client.request(
      context.request as AccountInfoRequest
    );
    await client.disconnect();
    return response;
  },
});
