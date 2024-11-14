"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navbar from "../Navbar";

const DynamicProfileContent = dynamic(() => import("./ProfileContent"), {
  ssr: false,
});

export default function Profile() {
  return (
    <Suspense
      fallback={<div className="text-center text-white">Loading...</div>}
    >
      <AuroraBackground className="mb-10 max-h-full">
        <DynamicProfileContent />
      </AuroraBackground>
      <Navbar />
    </Suspense>
  );
}
