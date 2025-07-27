"use client";

import { airdropSolanaTokens } from "@/lib/utils/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AirDrop() {
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    // get the public key from the local storage
    const keyPair = localStorage.getItem("keyPair")!;
    const parsedKeyPair = JSON.parse(keyPair);

    setPublicKey(parsedKeyPair.publicKey);
  }, []);

  async function handleClickToGetAirdrop() {
    console.log("Public Key ", publicKey);
    await airdropSolanaTokens(publicKey);

    toast.success("added 1 sol");
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
