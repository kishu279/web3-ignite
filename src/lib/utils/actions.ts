"use server";

import { Keypair } from "@solana/web3.js";
import {
  address,
  airdropFactory,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  devnet,
  lamports,
} from "@solana/kit";

const lamp: bigint = 10000000000n;

interface KeyPair {
  publicKey: string;
  privateKey: Uint8Array<ArrayBufferLike>;
}

const keypair = Keypair.generate();
const rpc = createSolanaRpc(devnet("http://127.0.0.1:8899"));
const rpcSubscriptions = createSolanaRpcSubscriptions(devnet("ws://127.0.0.1:8899"));

const airdrop = airdropFactory({ rpc, rpcSubscriptions });

// function to create a key pair value
export async function generateKeyPair(): Promise<KeyPair> {
  const publicKey = keypair.publicKey.toBase58();
  console.log("Public Key:", publicKey);
  const privateKey = keypair.secretKey;

  return { publicKey, privateKey };
}

export async function airdropSolanaTokens(publicKey: string) {
  //
  const response = await airdrop({
    commitment: "confirmed",
    recipientAddress: address(publicKey),
    lamports: lamports(lamp),
  });

  console.log("####Lamports Added", { response });
}
