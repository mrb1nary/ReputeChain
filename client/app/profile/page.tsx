"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Profile() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null); // State to store username
  const router = useRouter();

  useEffect(() => {
    if (code) {
      fetch("/api/auth/github/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.avatar_url) {
            setAvatarUrl(data.avatar_url);
          }
          if (data.username) {
            setUsername(data.username); // Set the username
          } else {
            console.error("Failed to fetch GitHub profile data");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [code]);

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          Github Profile Details
        </div>
      </motion.div>

      <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-center justify-center max-w-xs mx-auto p-4 mt-10 relative h-[25rem]">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

        {/* Show loading state or avatar */}
        {!avatarUrl ? (
          <div className="flex justify-center items-center text-white">
            Loading...
          </div>
        ) : (
          <EvervaultCard avatarUrl={avatarUrl} className="mt-10" />
        )}

        {username && (
          <p className="mt-4 text-white text-xl text-bold text-center">
            {username}
          </p>
        )}

        <h2 className="text-bold text-center text-white mt-4 text-sm">
          Let&apos;s calculate your score next
        </h2>

        <div className="mt-8 flex justify-center items-center">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span
              onClick={() => router.push("/calculate")}
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl"
            >
              Next Step!
            </span>
          </button>
        </div>
      </div>
    </AuroraBackground>
  );
}

export default Profile;
