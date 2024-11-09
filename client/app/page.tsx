"use client";

import { useSolanaWallet } from "./WalletProvider";
import Hero from "./Hero";

export default function Home() {

  const WalletProvider = useSolanaWallet();
  return (
    <WalletProvider>
      <Hero />
    </WalletProvider>
  )
}
