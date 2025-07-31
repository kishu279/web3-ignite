import {
  Connection,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";

const connection = new Connection("http://127.0.0.1:8899", "confirmed");

// export async function sendSol() {
//   const formKeyPair = Keypair.generate();
//   const toKeyPair = Keypair.generate();

//   console.log("Form Key Pair:", typeof formKeyPair.secretKey);

//   console.log("Form Key Pair:", formKeyPair.publicKey.toBase58());
//   console.log("To Key Pair:", toKeyPair.publicKey.toBase58());

//   const airdropSignature = await connection.requestAirdrop(
//     formKeyPair.publicKey,
//     LAMPORTS_PER_SOL * 2
//   );

//   await connection.confirmTransaction(airdropSignature);

//   const lamportsToSend = 1_000_000_000;

//   const transferTransaction = new Transaction().add(
//     SystemProgram.transfer({
//       fromPubkey: formKeyPair.publicKey,
//       toPubkey: toKeyPair.publicKey,
//       lamports: lamportsToSend,
//     })
//   );

//   const signature = await sendAndConfirmTransaction(
//     connection,
//     transferTransaction,
//     [formKeyPair]
//   );

//   console.log("Transfer successful with signature:", signature);
// }

interface KeyPair {
  publicKey: string;
  privateKey: Object;
}

export async function sendSolToPublicKey(
  sender: KeyPair,
  reciever: string,
  amount: number = 2
): Promise<string> {
  const amountToSend = amount * 1_000_000_000;

  console.log("Sender Key: ", sender);
  console.log("Reciever Key: ", reciever);
  console.log("Amount : ", amountToSend);

  // convert the object into an array
  const value1 = Object.values(sender.privateKey);

  // convert the array into the uint8array
  const value2 = new Uint8Array(value1);

  const senderKeyPair = Keypair.fromSecretKey(value2);
  const recieverPublicKey = new PublicKey(reciever);

  const program = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey: recieverPublicKey,
    lamports: amountToSend,
  });

  const transaction = new Transaction().add(program);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeyPair,
  ]);

  console.log("Transfer successful with signature:", signature);

  return signature;
}
