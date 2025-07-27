"use client";

import { generateKeyPair } from "@/lib/utils/actions";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GetKeyPair() {
  const [publicKey, setPublicKey] = useState("");

  const handleClickToGenerateKeyPair = async () => {
    const keyPair = await generateKeyPair();

    // set the key pair value on the state on the local storage and on the state value
    const keyPairValue = JSON.stringify(keyPair);
    localStorage.setItem("keyPair", keyPairValue);
    console.log("Key Pair Value:", keyPairValue);

    setPublicKey(keyPair.publicKey);

    toast.success("Key Pair Created Successfully");
  };

  useEffect(() => {
    // get the keypair value if existing pair present
    const keyPairValue = localStorage.getItem("keyPair")!;
    const parsedKeyPair = JSON.parse(keyPairValue);

    if (parsedKeyPair?.publicKey) {
      setPublicKey(parsedKeyPair.publicKey);
      console.log("key pair value: ", keyPairValue);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center border rounded-2xl shadow-2xl shadow-black p-6 space-y-4">
      <h1 className="text-xl">Create a Key Pair</h1>
      <p className="">
        Public Key: <span className="underline">{publicKey}</span>
      </p>
      <button
        className="border px-2 py-1 rounded-full"
        onClick={() => {
          handleClickToGenerateKeyPair();
        }}
      >
        create
      </button>
    </div>
  );
}
