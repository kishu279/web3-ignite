"use server";

import { Keypair } from "@solana/web3.js";
import {
  address,
  airdropFactory,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  devnet,
  lamports,
  Signature,
} from "@solana/kit";

const lamp: bigint = 1000000000n;

interface KeyPair {
  publicKey: string;
  privateKey: Uint8Array<ArrayBufferLike>;
}

const keypair = Keypair.generate();
const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
const rpcSubscriptions = createSolanaRpcSubscriptions(
  devnet("wss://api.devnet.solana.com")
);

const airdrop = airdropFactory({ rpc, rpcSubscriptions });

// function to create a key pair value
export async function generateKeyPair(): Promise<KeyPair> {
  const publicKey = keypair.publicKey.toBase58();
  console.log("Public Key:", publicKey);
  const privateKey = keypair.secretKey;

  return { publicKey, privateKey };
}

export async function airdropSolanaTokens(
  publicKey: string
): Promise<Signature> {
  //
  const response = await airdrop({
    commitment: "confirmed",
    recipientAddress: address(publicKey),
    lamports: lamports(lamp),
  });

  console.log("####Lamports Added", { response });

  return response;
}

// get the account balance
export async function getBalance(publicKey: string): Promise<bigint> {
  const { value } = await rpc.getBalance(address(publicKey)).send();

  console.log("###Balance Value", { value });

  return value / lamp; // Convert lamports to SOL
}
