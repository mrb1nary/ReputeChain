/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useRouter } from "next/navigation";

function Calculate() {
  const [score, setScore] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");
  const [githubStats, setGithubStats] = useState<any>(null);
  const router = useRouter();

  // Function to calculate score
  function calculateScore(
    userData: any,
    reposData: any[],
    additionalData: {
      rejectedPRCount: number;
      totalCommits: number;
      forksCount: number;
      watchersCount: number;
      accountAge: number;
    }
  ): number {
    const { followers, public_repos } = userData;
    const repoStars = reposData.reduce(
      (acc, repo) => acc + (repo.stargazers_count || 0),
      0
    );
    const {
      rejectedPRCount,
      totalCommits,
      forksCount,
      watchersCount,
      accountAge,
    } = additionalData;

    let score =
      followers * 10 +
      public_repos * 5 +
      repoStars * 2 +
      totalCommits * 2 +
      forksCount * 1 +
      watchersCount * 1;

    score += Math.min(accountAge * 5, 50);
    score -= rejectedPRCount * 10;

    if (score > 500) {
      score = 500 + (score - 500) * 0.5;
    }
    localStorage.setItem("github_score", score.toString());
    return Math.min(score, 1000);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("github_access_token");

    if (accessToken) {
      let fetchedUserData: any;
      let fetchedReposData: any[] = [];
      let rejectedPRCount = 0;
      let totalCommits = 0;
      let forksCount = 0;
      let watchersCount = 0;
      let accountAge = 0;

      fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          fetchedUserData = userData;
          if (userData.login) {
            setUsername(userData.login);
            localStorage.setItem("github_username", userData.login);

            const creationDate = new Date(userData.created_at);
            const currentDate = new Date();
            accountAge = Math.floor(
              (currentDate.getTime() - creationDate.getTime()) /
                (1000 * 3600 * 24 * 365)
            );

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
          fetchedReposData = reposData;

          forksCount = reposData.reduce(
            (total: number, repo: any) => total + (repo.forks_count || 0),
            0
          );
          watchersCount = reposData.reduce(
            (total: number, repo: any) => total + (repo.watchers_count || 0),
            0
          );

          const repoPromises = reposData.map((repo: { name: string }) =>
            Promise.all([
              fetch(
                `https://api.github.com/repos/${fetchedUserData.login}/${repo.name}/pulls?state=closed`,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              )
                .then((res) => res.json())
                .then((prs) => {
                  const rejectedPRs = prs.filter(
                    (pr: { merged_at: null }) => pr.merged_at === null
                  );
                  rejectedPRCount += rejectedPRs.length;
                }),

              fetch(
                `https://api.github.com/repos/${fetchedUserData.login}/${repo.name}/commits`,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              )
                .then((res) => res.json())
                .then((commits) => {
                  totalCommits += commits.length;
                }),
            ])
          );

          return Promise.all(repoPromises);
        })
        .then(() => {
          const userScore = calculateScore(fetchedUserData, fetchedReposData, {
            rejectedPRCount,
            totalCommits,
            forksCount,
            watchersCount,
            accountAge,
          });
          setScore(userScore);

          setGithubStats({
            totalCommits,
            watchersCount,
            forksCount,
            rejectedPRCount,
            accountAge,
          });
        })
        .catch((error) => {
          console.error("Error fetching GitHub data:", error);
        });
    } else {
      console.error("No access token found in localStorage");
    }
  });

  const hoverEffectItems = githubStats
    ? [
        {
          title: "Total Commits",
          description: `${githubStats.totalCommits}`,
          link: "",
          key: "commits",
        },
        {
          title: "Total Watchers",
          description: `${githubStats.watchersCount}`,
          link: "",
          key: "watchers",
        },
        {
          title: "Total Forks",
          description: `${githubStats.forksCount}`,
          link: "",
          key: "forks",
        },
        {
          title: "Rejected PRs",
          description: `${githubStats.rejectedPRCount}`,
          link: "",
          key: "prs",
        },
        {
          title: "Account Age",
          description: `${githubStats.accountAge} years`,
          link: "",
          key: "age",
        },
      ]
    : [];

  return (
    <AuroraBackground className="h-full">
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
          Calculating Your Score!
        </div>
        <div className="font-extralight text-sm sm:text-lg md:text-xl text-neutral-200 py-4">
          {`GitHub Username: ${username}`}
        </div>
      </motion.div>

      {score !== null && (
        <div className="mt-6 text-xl md:text-2xl font-semibold text-white text-center">
          User Score: {score}
        </div>
      )}

      {githubStats && (
        <div className="mt-8">
          <HoverEffect
            className="flex flex-wrap justify-center gap-6"
            items={hoverEffectItems}
          />
        </div>
      )}

      <div>
        <button
          onClick={() => router.push("/save")}
          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-md font-semibold leading-6  text-white inline-block"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span>{`Save Score to Blockchain`}</span>
            <svg
              width="40"
              height="30"
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

      <div className="text-3xl sm:text-4xl md:text-5xl font-bold mt-[200px] mb-[200px] text-white text-center">
        <h3>✨ Score Calculation Recipe ✨</h3>
        <div className="text-base sm:text-lg md:text-xl font-light mt-6 max-w-2xl mx-auto text-neutral-200 text-left space-y-6">
          <p className="pb-4">
            The score is calculated based on various factors that reflect your
            GitHub contributions and reputation. Here’s how each factor
            contributes to your overall score:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>👥 Followers:</strong> Each follower contributes{" "}
              <span className="font-semibold">10 points</span>. This reflects
              your reach and influence.
            </li>
            <li>
              <strong>📂 Public Repositories:</strong> Each public repository
              adds <span className="font-semibold">5 points</span>, representing
              your initiative in sharing code and projects.
            </li>
            <li>
              <strong>⭐ Stars:</strong> Every star on your repositories adds{" "}
              <span className="font-semibold">2 points</span>, showcasing the
              popularity of your projects.
            </li>
            <li>
              <strong>📈 Total Commits:</strong> Each commit adds{" "}
              <span className="font-semibold">2 points</span>, rewarding your
              overall code contributions.
            </li>
            <li>
              <strong>🍴 Forks:</strong> Each fork adds{" "}
              <span className="font-semibold">1 point</span>, indicating your
              project’s utility and community engagement.
            </li>
            <li>
              <strong>👀 Watchers:</strong> Each watcher on your repositories
              contributes <span className="font-semibold">1 point</span>,
              reflecting user interest in your work.
            </li>
            <li>
              <strong>⏳ Account Age:</strong> Every year on GitHub adds up to{" "}
              <span className="font-semibold">5 points</span> (up to a maximum
              of <span className="font-semibold">50 points</span>), rewarding
              long-term commitment.
            </li>
            <li>
              <strong>❌ Rejected Pull Requests:</strong> Each rejected PR
              deducts <span className="font-semibold">10 points</span> from the
              score, emphasizing the importance of high-quality contributions.
            </li>
          </ul>
          <p className="pt-4">
            <strong>📊 Score Cap:</strong> The score has a soft cap of{" "}
            <span className="font-semibold">500 points</span>, after which
            additional points are halved to prevent excessive accumulation. The
            maximum score possible is{" "}
            <span className="font-semibold">1000 points</span>.
          </p>
        </div>
      </div>
    </AuroraBackground>
  );
}

export default Calculate;
