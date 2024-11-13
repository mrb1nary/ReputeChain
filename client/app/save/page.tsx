"use client";

import React from "react";
import Save from "./save";
import { useSolanaWallet } from "../WalletProvider";
import Navbar from "../Navbar";

function save() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const WalletProvider = useSolanaWallet();
  return (
    <WalletProvider>
      <Save />
      <Navbar />
    </WalletProvider>
  );
}

export default save;
