"use client";

import React from "react";
import { useSolanaWallet } from "../WalletProvider";
import Navbar from "../Navbar";
import dynamic from "next/dynamic";

const DynamicProfileContent = dynamic(() => import("./save"), {
  ssr: false,
});

function save() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const WalletProvider = useSolanaWallet();
  return (
    <WalletProvider>
      <DynamicProfileContent />
      <Navbar />
    </WalletProvider>
  );
}

export default save;
