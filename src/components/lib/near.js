import { keyStores, connect, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";
export const gas = new BN("70000000000000");

export const getWallet = async () => {
  const near = await connect({
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
  });
  const wallet = new WalletConnection(near, "miguelislas");
  return wallet;
};

export const getUsers = async (wallet) => {
  const response = await wallet.account().functionCall({
    methodName: "getUsers",
    gas,
  });
  return response;
};