/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

function Calculate() {
  const [score, setScore] = useState<number | null>(null); // State to store the fetched score
  const [username, setUsername] = useState<string>(""); // State to store the GitHub username

  // Function to calculate score
  //@ts-expect-error
  function calculateScore(
    userData: any,
    reposData: any[],
    additionalData: { rejectedPRCount: number }
  ): number {
    const followers = userData.followers || 0;
    const publicRepos = userData.public_repos || 0;
    const repoStars = reposData.reduce(
      (acc, repo) => acc + (repo.stargazers_count || 0),
      0
    );
    const rejectedPRs = additionalData.rejectedPRCount || 0;

    console.log("Followers:", followers);
    console.log("Public Repos:", publicRepos);
    console.log("Repo Stars:", repoStars);
    console.log("Rejected PRs:", rejectedPRs);

    let score =
      followers * 10 + publicRepos * 5 + repoStars * 2 - rejectedPRs * 10;

    // Apply diminishing returns effect for scores over 500
    if (score > 500) {
      score = 500 + (score - 500) * 0.5; // Reduces the value by 50% for points above 500
    }

    return Math.min(score, 1000); // Cap score at 1000
  }



  useEffect(() => {
    const accessToken = localStorage.getItem("github_access_token"); // Get the access token from localStorage

    if (accessToken) {
      let fetchedUserData: any; // To hold the user profile data
      let fetchedReposData: any[] = []; // To hold the repository data
      let rejectedPRCount = 0; // To hold the count of rejected PRs

      // Fetch the GitHub user profile using the access token
      fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          fetchedUserData = userData; // Store user profile data
          if (userData.login) {
            setUsername(userData.login); // Set the username

            // Fetch user repositories
            return fetch(
              `https://api.github.com/users/${userData.login}/repos`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
          } else {
            throw new Error("Failed to fetch GitHub user profile data");
          }
        })
        .then((repoResponse) => repoResponse.json())
        .then((reposData) => {
          fetchedReposData = reposData; // Store repositories data

          // For each repository, fetch pull requests and check for rejected PRs
          const repoPromises = reposData.map((repo) =>
            fetch(
              `https://api.github.com/repos/${fetchedUserData.login}/${repo.name}/pulls?state=closed`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            )
              .then((res) => res.json())
              .then((prs) => {
                // Count PRs that were closed without merging (rejected)
                const rejectedPRs = prs.filter((pr) => pr.merged_at === null);
                rejectedPRCount += rejectedPRs.length;
              })
          );

          // Wait for all PR data fetches to complete
          return Promise.all(repoPromises);
        })
        .then(() => {
          // Calculate and set the score with the collected data
          const userScore = calculateScore(fetchedUserData, fetchedReposData, {
            rejectedPRCount,
          });
          setScore(userScore);
        })
        .catch((error) => {
          console.error("Error fetching GitHub data:", error);
        });
    } else {
      console.error("No access token found in localStorage");
    }
  }, []);


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
          Calculating Your Score!
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
          {`GitHub Username: ${username}`}
        </div>
      </motion.div>


      {score !== null && (
        <div className="mt-4 text-xl font-semibold text-white">
          <div className="text-center mb-4">User Score: {score}</div>
        </div>
      )}
    </AuroraBackground>
  );
}

export default Calculate;
