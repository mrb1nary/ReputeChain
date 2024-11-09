import { NextResponse } from "next/server";

export async function GET() {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=read:user`;
  return NextResponse.redirect(githubAuthURL);
}
