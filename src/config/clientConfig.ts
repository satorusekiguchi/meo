import { ClientConfig } from "./types";
import client01 from "./clients/client-01.json";
import client02 from "./clients/client-02.json";
import client03 from "./clients/client-03.json";
import alegria from "./clients/alegria.json";

const clientConfigs: { [key: string]: ClientConfig } = {
  "client-01": client01,
  "client-02": client02,
  "client-03": client03,
  alegria: alegria,
} as const;

export type ClientId = keyof typeof clientConfigs;

export function getClientConfig(clientId: ClientId): ClientConfig | undefined {
  console.log("getClientConfig called with clientId:", clientId);
  if (!clientId) {
    console.error("Invalid clientId provided");
    return undefined;
  }
  const config = clientConfigs[clientId];
  if (!config) {
    console.error(`No configuration found for clientId: ${clientId}`);
  }
  console.log("Retrieved config:", config);
  return config;
}
