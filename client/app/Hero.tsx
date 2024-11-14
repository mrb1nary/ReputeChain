import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Spotlight } from "@/components/ui/spotlight";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import idl from "../../anchor/target/idl/anchor.json"; // Adjust the path if needed
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { Anchor } from "../../anchor/target/types/anchor";
import React, { useState } from "react";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";

function Hero() {
  const auth = async () => {
    window.location.href = "/api/auth/github";
  };

  const [key, setKey] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const wallet = useWallet();
  const opts: web3.ConnectionConfig = { commitment: "processed" };
  const connection = new Connection(clusterApiUrl("devnet"), opts.commitment);

  const programId = new PublicKey(
    "8u2absR3zLEnTcsM542zjMNbeNzf1dpViq9FKPxAiFfd"
  );

  const placeholders = ["Already have a key? Enter it here"];

  type SolanaWallet = WalletContextState & {
    publicKey: PublicKey;
    signTransaction(tx: web3.Transaction): Promise<web3.Transaction>;
    signAllTransactions(txs: web3.Transaction[]): Promise<web3.Transaction[]>;
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setKey(e.target.value);
  }

  async function fetchDataFromSolana(key: string) {
    const provider = new AnchorProvider(
      connection,
      wallet as SolanaWallet,
      opts
    );

    // Instantiate the program
    const program = new Program<Anchor>(idl as Anchor, provider);

    // Generate the PDA
    const [scoreAccountPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from(key)],
      programId
    );
    const account = await program.account.scoreAccount.fetch(scoreAccountPDA);
    setScore(account.score);
    setUsername(account.username);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(key);
    if (!key) {
      setError("Please enter a key to fetch data.");
      return;
    }

    try {
      await fetchDataFromSolana(key);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch score:", err);
      setError("Failed to fetch score. Ensure the key is correct.");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden px-4 sm:px-6 md:px-8">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-orange-200 to-orange-500">
          ReputeChain
        </h1>

        <p className="mt-4 font-bold text-neutral-300 max-w-lg mx-auto">
          Decentralized reputation system built on the Solana blockchain,
          designed to measure and verify a user&apos;s contributions and
          credibility to the community
        </p>
      </div>
      <button className="bg-slate-800 mb-10 group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-1 text-sm font-semibold text-white inline-block mt-4">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-5 ring-1 ring-white/10">
          <span onClick={auth}>{`Login with Github`}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>

      <div className="w-full max-w-md mx-auto">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      {username && <div className="text-white mt-4">User: {username}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {score !== null && (
        <div className="text-white mt-4">Score is: {score.toString()}</div>
      )}
    </div>
  );
}

export default Hero;
