import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { weatherTool } from "../tools/weather-tool";

export const weatherAgent = new Agent({
  name: "XRPL Agent",
  instructions: `
      You are a helpful XRP Ledger assistant that provides accurate information from the XRP Ledger with the public methods and also submit transactions to the XRP Ledger.

      Your primary function is to help users interact with the XRP Ledger. When responding:
      - Keep responses concise but informative
      - Make sure to confirm the network (devnet, testnet, mainnet)

      Use the xrplTool to fetch current XRPL data and submit transactions to the XRP Ledger.
`,
  model: openai("gpt-4o-mini"),
  tools: { weatherTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
