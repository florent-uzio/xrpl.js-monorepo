import { Client } from "xrpl";
import { networks, NetworkType } from "./networks";
import { PinoLogger } from "@mastra/loggers";

class XRPLClient {
  private static instance: XRPLClient;
  private clients: Map<NetworkType, Client> = new Map();
  private logger = new PinoLogger({
    name: "xrpl-client",
  });

  private constructor() {}

  public static getInstance(): XRPLClient {
    if (!XRPLClient.instance) {
      XRPLClient.instance = new XRPLClient();
    }
    return XRPLClient.instance;
  }

  public async getClient(network: NetworkType): Promise<Client> {
    if (!this.clients.has(network)) {
      const client = new Client(networks[network]);
      try {
        await client.connect();
        this.logger.info(`Connected to ${network} network`);
        this.clients.set(network, client);
      } catch (error) {
        this.logger.error(`Error connecting to ${network} network:`, { error });
        throw error;
      }
    }
    return this.clients.get(network)!;
  }

  public async disconnect(network: NetworkType): Promise<void> {
    const client = this.clients.get(network);
    if (client) {
      await client.disconnect();
      this.clients.delete(network);
      this.logger.info(`Disconnected from ${network} network`);
    }
  }

  public async disconnectAll(): Promise<void> {
    for (const [network, client] of this.clients.entries()) {
      await client.disconnect();
      this.logger.info(`Disconnected from ${network} network`);
    }
    this.clients.clear();
  }
}

export const xrplClient = XRPLClient.getInstance();
