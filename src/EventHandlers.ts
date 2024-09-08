/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  GitmoVault,
  GitmoVault_Claimed,
  GitmoVault_Donated,
} from "generated";

GitmoVault.Claimed.handler(async ({ event, context }) => {
  const entity: GitmoVault_Claimed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    username: event.params.username,
    value: event.params.value,
  };

  context.GitmoVault_Claimed.set(entity);
});


GitmoVault.Donated.handler(async ({ event, context }) => {
  const entity: GitmoVault_Donated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    username: event.params.username,
    value: event.params.value,
  };

  context.GitmoVault_Donated.set(entity);
});

