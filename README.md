# 🚀 ReputeChain

ReputeChain is a decentralized social reputation system that calculates and stores user reputation scores on the Solana blockchain. By analyzing a user's GitHub contributions, ReputeChain generates a reputation score that reflects their contributions to the developer community. This score can then be easily accessed and shared as proof of their engagement and credibility.


![Screenshot From 2024-11-14 20-22-08](https://github.com/user-attachments/assets/39162a75-3409-43e9-8d58-5d906eefc75e)

**Live Demo**: [ReputeChain - Live Demo](https://repute-chain.vercel.app/)

## 🌟 Features

- **🔍 GitHub Metrics Analysis**: Analyzes various GitHub metrics such as:
  - 📂 Number of public repositories, 👥 followers, ⭐ stars, and 🍴 forks.
  - 🖊️ Total number of commits, PRs, and other contributions.
  - ❌ Rejected PRs, which reduce the overall reputation score.
- **📊 Scoring System**: A complex scoring mechanism that rewards positive contributions and penalizes rejected contributions.
  - 🏆 The scoring has a soft cap at 500 points with a maximum limit of 1000 points.
  - ⚖️ Calculates scores based on various metrics and thresholds, making it harder to reach higher scores.
- **🛠️ Decentralized Storage on Solana**: Reputation scores are saved to the Solana blockchain, ensuring transparency, permanence, and accessibility.
- **🔑 Custom Key for Easy Access**: Users can set a unique key for their reputation score, making it simple to share and look up their score.
- **🔐 User Authentication with GitHub**: Users authenticate via GitHub, allowing the app to retrieve their public profile data and contributions.
  
## ⚙️ How It Works

1. **🔑 User Authentication**: Users authenticate via GitHub to allow ReputeChain to access their public contributions and metrics.
2. **📈 Score Calculation**: Once authenticated, ReputeChain pulls data from GitHub and calculates a reputation score based on contributions and engagement. Key factors include:
   - 👥 Followers, ⭐ stars, 🍴 forks, 🖊️ total commits, and other metrics.
   - ❌ Deduction for rejected pull requests.
3. **📄 Blockchain Storage**: The score is saved to the Solana blockchain under a unique, user-defined key. This key can be shared publicly as proof of reputation.
4. **🔍 Score Access**: Any user can view the score by entering the unique key.

## 🛠️ Getting Started

### ⚙️ Prerequisites

- **Solana CLI**: Set up Solana CLI tools on your development machine.
- **Anchor Framework**: Install the Anchor framework for Solana programs.
- **GitHub Developer Account**: Set up a GitHub OAuth application to enable GitHub authentication.

### 📝 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ReputeChain.git
   cd ReputeChain


2. Install dependencies:

   ```bash
   npm install

3. Set up environment variables for GitHub OAuth and Solana connection in a .env file:

   ```bash
   NEXT_PUBLIC_GITHUB_API_KEY=get this from github developer setting
   GITHUB_CLIENT_SECRET=get this from github developer setting
   NEXT_PUBLIC_GITHUB_CLIENT_ID= get this from github as well
   NEXT_PUBLIC_GITHUB_REDIRECT_URI=https://repute-chain.vercel.app/profile

4. Start the Developement server

  ```bash
  npm run dev
  ```

## 🗂️ Project Structure

- **Solana Program**: Written in Rust using the Anchor framework, this handles the logic for saving and retrieving scores on-chain.
- **Client-Side Application**: Built with Next.js, TypeScript, and Tailwind CSS to provide a user-friendly interface.
- **API Layer**: Connects the client and Solana program, authenticating users and retrieving data from GitHub.


## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, React
- **Blockchain**: Solana, Anchor
- **Data Sources**: GitHub API for retrieving user metrics

   
