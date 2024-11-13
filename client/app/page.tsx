"use client";

import Hero from "./Hero";
import Navbar from "./Navbar";
import { useSolanaWallet } from "./WalletProvider";

export default function Home() {
  const WalletProvider = useSolanaWallet();
  return (
    <>
      <WalletProvider>
        <Hero />;
        <Navbar />
      </WalletProvider>
    </>
  );
}
