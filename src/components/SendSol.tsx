"use client";

import { sendSol, sendSolToPublicKey } from "@/lib/utils/sendSol";
import { lamports } from "@solana/kit";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Key } from "lucide-react";
// import { transferSol } from "@/lib/utils/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface KeyPair {
  publicKey: string;
  privateKey: Object;
}

export default function SendSol() {
  const [sender, senderKey] = useState<KeyPair>();
  const [amount, setAmount] = useState<number>();
  const [recieverPublicKey, setRecieverPublicKey] = useState<string>("");

  async function handleTransferSol() {
    try {
      const signature = await sendSolToPublicKey(
        sender!,
        recieverPublicKey,
        amount!
      );

      if (signature.length > 0) {
        toast.success("Transaction Successful");
      }
    } catch (err) {
      console.error("Error ", err);
    }
  }

  useEffect(() => {
    // get the key pair from the local storage
    const keyPair = localStorage.getItem("keyPair")!;

    if (keyPair) {
      const parsedKeyPair = JSON.parse(keyPair);
      console.log("Parsed Key Pair: ", typeof parsedKeyPair.privateKey);
      senderKey(parsedKeyPair);
    }
  }, []);

  return (
    <div className="flex flex-col items-left justify-center border rounded-2xl shadow-2xl shadow-black p-6 space-y-4">
      <h1 className="text-xl">Create a Key Pair</h1>
      <p>My Public Key: {sender?.publicKey}</p>
      <p className="">
        Sending To{" "}
        <input
          type="text"
          value={recieverPublicKey}
          onChange={(e) => {
            setRecieverPublicKey(e.target.value);
          }}
        />
      </p>
      <p>
        Sending Amount{" "}
        <input
          type="number"
          // value={amount}
          defaultValue={0}
          onChange={(e) => {
            const value = e.target.value;
            console.log("value ", !isNaN(+value));
            setAmount(+value);
          }}
        />
      </p>
      <button
        className="border px-2 py-1 rounded-full"
        onClick={() => {
          handleTransferSol();
        }}
      >
        send
      </button>
    </div>
  );
}
