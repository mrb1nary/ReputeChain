"use client";

import React from "react";
import Save from "./save";
import { useSolanaWallet } from "../WalletProvider";

function save() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const WalletProvider = useSolanaWallet();
  return (
    <WalletProvider>
      <Save />
    </WalletProvider>
  );
}

export default save;
