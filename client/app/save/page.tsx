"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import React from "react";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useWallet } from "@solana/wallet-adapter-react";

function Save() {
  const username = localStorage.getItem("github_username");
  
  const {connected} = useWallet();

  const placeholders = [
    "Enter your secret key",
    "secretpassword123",
    "jackscore69",
    "ui2189xax981AjjknAM",
    "Come on! Be Quick!",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  {
    console.log(connected);
  }

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
          <div className="font-extralight text-sm sm:text-lg md:text-xl text-neutral-200 py-4">
            {`GitHub Username: ${username}`}
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
