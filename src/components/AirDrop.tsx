"use client";

import {
  address,
  airdropFactory,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  devnet,
  lamports,
} from "@solana/kit";
import { airdropSolanaTokens } from "@/lib/utils/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// const rpc = createSolanaRpc(devnet("http://127.0.0.1:8899"));
// const rpcSubscriptions = createSolanaRpcSubscriptions(
//   devnet("ws://127.0.0.1:8900")
// );

// const airdrop = airdropFactory({ rpc, rpcSubscriptions });

// const lamp: bigint = 1000000000n;

export default function AirDrop() {
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    // get the public key from the local storage
    const keyPair = localStorage.getItem("keyPair")!;
    const parsedKeyPair = JSON.parse(keyPair);

    if (parsedKeyPair) {
      setPublicKey(parsedKeyPair.publicKey);
    }
  }, []);

  async function handleClickToGetAirdrop() {
    console.log("Public Key ", publicKey);

    try {
      // const response = await airdrop({
      //   commitment: "confirmed",
      //   recipientAddress: address(publicKey),
      //   lamports: lamports(lamp),
      // });

      const response = await airdropSolanaTokens(publicKey);
      console.log("###DEVNET RESPONSE##", { response });

      if (response) {
        toast.success("Successfully airdropped 1 sol to devnet");
      }
    } catch (error) {
      console.error("### Error : ", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center border rounded-2xl shadow-2xl shadow-black p-6 space-y-4">
      <h1 className="text-xl">Airdrop 1 sol to devnet</h1>
      <p className="">
        Public Key: <span className="underline">{publicKey}</span>
      </p>
      <button
        className="border px-2 py-1 rounded-full"
        onClick={() => {
          handleClickToGetAirdrop();
        }}
      >
        airdrop
      </button>
    </div>
  );
}
