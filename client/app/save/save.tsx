"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider, web3 } from "@coral-xyz/anchor";
// import idl from "../anchor.json";
import idl from "../../../anchor/target/idl/anchor.json";
// import { Anchor } from "../anchor";
import { Anchor } from "../../../anchor/target/types/anchor";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { motion } from "framer-motion";
import React, { useState } from "react";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";

function Save() {
  const username = localStorage.getItem("github_username");
  const { connected, publicKey } = useWallet();
  const score = Number(localStorage.getItem("github_score")) || 100;
  const [secretKey, setSecretKey] = useState("");
  const programId = new PublicKey(idl.address);

  const placeholders = [
    "Enter your secret key",
    "secretpassword123",
    "jackscore69",
    "ui2189xax981AjjknAM",
    "Come on! Be Quick!",
  ];

  const wallet = useWallet();
  const opts: web3.ConnectionConfig = { commitment: "processed" };
  const connection = new Connection(clusterApiUrl("devnet"), opts.commitment);

  type SolanaWallet = WalletContextState & {
    publicKey: PublicKey;
    signTransaction(tx: web3.Transaction): Promise<web3.Transaction>;
    signAllTransactions(txs: web3.Transaction[]): Promise<web3.Transaction[]>;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(score, secretKey);

    if (!publicKey || !secretKey) {
      console.log("Please connect wallet and enter a secret key.");
      return;
    }

    try {
      await sendScoreToSolana(score, secretKey);
      console.log("Score successfully saved on the blockchain!");
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const sendScoreToSolana = async (score: number, key: string) => {
    if (!connected) throw new Error("Wallet not connected");

    const provider = new AnchorProvider(connection, wallet as SolanaWallet, {
      preflightCommitment: opts.commitment,
      commitment: opts.commitment,
    });

    const program = new Program<Anchor>(idl as Anchor, provider);

    // Generate the PDA for the score account
    const [scoreAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from(key)],
      programId
    );

    // Call the initialize function in the Solana program
    await program.methods
      .initialize(new anchor.BN(score), key)
      .accounts({
        scoreAccount: scoreAccount,
        user: publicKey as PublicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log(`Score sent to Solana account: ${scoreAccount.toBase58()}`);
  };

  return (
    <AuroraBackground className="max-h-full">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-6 items-center justify-center px-4 py-8 md:py-12"
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
          Save To Blockchain
        </div>
        <div className="font-extralight flex items-center text-center text-sm sm:text-lg md:text-xl text-neutral-200 py-4">
          {`GitHub Username: ${username}`}
          <br />
          {`Score: ${score}`}
        </div>

        <div>
          <WalletMultiButton className="text-white" />
        </div>

        {connected && (
          <div>
            <h6 className="text-white text-center py-5">
              This key will be used to access your score. Anyone with this key
              can see your score.
            </h6>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </motion.div>
    </AuroraBackground>
  );
}

export default Save;
