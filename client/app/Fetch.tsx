import axios from "axios";

const token = process.env.NEXT_PUBLIC_GITHUB_API_KEY;
const headers = {
  Authorization: `Bearer ${token}`,
  "User-Agent": "axios",
};

async function fetchGitHubUserScore(username) {
  try {
    // Fetch user profile data
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers }
    );
    const user = userResponse.data;

    // Fetch repositories for the user
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      { headers }
    );
    const repos = reposResponse.data;

    // Basic scoring algorithm
    const followerScore = Math.min(user.followers * 5, 300); // up to 300 points for followers
    const repoCountScore = Math.min(user.public_repos * 10, 200); // up to 200 points for repo count
    const starredReposScore = repos.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0
    ); // star count can reflect credibility
    const adjustedStarredScore = Math.min(starredReposScore * 2, 300); // up to 300 points for stars on repos

    // Aggregate score calculation
    const score = Math.min(
      followerScore + repoCountScore + adjustedStarredScore,
      1000
    );

    console.log(`Credibility Score for ${username}:`, score);
    return score;
  } catch (error) {
    console.error("Error fetching data:", error);
    return 0; // Return 0 in case of an error
  }
}

// Example usage in a Next.js component
export default function Fetch({ username }) {
  fetchGitHubUserScore(username).then((score) => {
    console.log(`User ${username} has a credibility score of:`, score);
  });
  return null;
}
