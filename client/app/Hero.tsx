import { Spotlight } from "@/components/ui/spotlight";
import React from "react";

function Hero() {
  const auth = async () => {
    window.location.href = "/api/auth/github";
  };
  return (
    <div className="min-h-screen w-full rounded-md flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="md:text-7xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-200 to-orange-500 bg-opacity-50">
          ReputeChain
        </h1>

        <p className="mt-4 font-bold text-neutral-300 max-w-lg text-center mx-auto">
          Decentralized reputation system built on the Solana blockchain,
          designed to measure and verify a user&apos;s contributions and
          credibility to the community
        </p>
      </div>
      <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-1 text-sm font-semibold leading-7 text-white inline-block mt-4">
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
    </div>
  );
}

export default Hero;
