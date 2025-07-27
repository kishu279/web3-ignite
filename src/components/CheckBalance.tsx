"use client";

import { getBalance } from "@/lib/utils/actions";
import { useEffect, useState } from "react";
import {
  address,
  airdropFactory,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  devnet,
  lamports,
} from "@solana/kit";

const lamp: bigint = 1000000000n;

const rpc = createSolanaRpc(devnet("http://127.0.0.1:8899"));
const rpcSubscriptions = createSolanaRpcSubscriptions(
  devnet("ws://127.0.0.1:8900")
);

export default function CheckBalance() {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("");

  async function handleClickToGetBalance() {
    // set the balance

    if (!publicKey) {
      throw new Error("Public Key is required");
    }

    try {
      //   const response = await getBalance(publicKey);

      const { value } = await rpc.getBalance(address(publicKey)).send();

      //   console.log("###Balance Enquiry RESPONSE##", { response });
      console.log("###Balance Value", { value });

      //   setBalance(String(response));
      setBalance(String(value / lamports(lamp)));
    } catch (error) {
      console.error("### Error : ", error);
    }
  }

  function getPublicKeyFromLocalStorage() {
    // get the public keyu from the local storage
    const keyPair = localStorage.getItem("keyPair")!;
    const parsedKeyPair = JSON.parse(keyPair);

    try {
      if (parsedKeyPair.publicKey) {
        setPublicKey(parsedKeyPair.publicKey);
        setBalance("0");

        // must validate the public key
      }
    } catch (error) {
      console.error("### Error : ", error);
    }
  }

  useEffect(() => {
    getPublicKeyFromLocalStorage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center border rounded-2xl shadow-2xl shadow-black p-6 space-y-4">
      <h1 className="text-xl">Check Balance</h1>
      <div className="flex items-center justify-center space-x-2">
        <p className="">Public Key:</p>
        <input
          type="text"
          value={publicKey}
          onChange={(e) => {
            setPublicKey(e.target.value);
          }}
        />
      </div>

      <button
        className="border px-2 py-1 rounded-full"
        onClick={() => {
          handleClickToGetBalance();
        }}
      >
        get balance
      </button>

      <div>
        <p>Balance : {balance}</p>
      </div>
    </div>
  );
}
