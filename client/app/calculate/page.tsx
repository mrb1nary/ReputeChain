"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import axios from "axios";

function Calculate() {
  const placeholders = [
    "Enter your Github Username",
    "mrb1nary",
    "jason027",
    "CodeMaster",
    "rustgod",
  ];

  const [score, setScore] = useState<number | null>(null); // State to store the fetched score
  const [username, setUsername] = useState<string>(""); // State to store the input value

  // Function to fetch GitHub score based on username
  async function fetchGitHubUserScore(username: string) {
    const token = process.env.NEXT_PUBLIC_GITHUB_API_KEY;

    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "axios",
    };

    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`,
        { headers }
      );

      const repoResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        { headers }
      );

      const userScore = calculateScore(userResponse.data, repoResponse.data);
      setScore(userScore); // Update score state
      console.log("User Score:", userScore); // Log score in main component
    } catch (error) {
      console.error(
        "Error fetching GitHub data:",
        error.response?.data?.message
      );
    }
  }

  // Mock scoring algorithm
  function calculateScore(userData, reposData): number {
    let score = userData.followers * 10;
    score += reposData.length * 20;
    return Math.min(score, 1000);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value); // Update username state on change
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the username contains a GitHub URL
    const githubUrlRegex = /https:\/\/github\.com\/([a-zA-Z0-9-]+)/;
    let extractedUsername = username;

    // If the username matches the GitHub URL format
    const match = username.match(githubUrlRegex);
    if (match && match[1]) {
      extractedUsername = match[1]; // Extract the username from the URL
    }

    console.log(extractedUsername); // Log the username (whether from URL or direct input)

    fetchGitHubUserScore(extractedUsername); // Trigger fetchGitHubUserScore with the username
  };

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
          Enter Github Username
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4"></div>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit} // Pass the submit handler
        />
      </motion.div>
      {score !== null && (
        <div className="mt-4 text-xl font-semibold text-white">
          User Score: {score}
        </div>
      )}
    </AuroraBackground>
  );
}

export default Calculate;