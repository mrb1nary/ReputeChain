import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const { code } = await request.json();

  if (!code) {
    return new NextResponse(
      JSON.stringify({ error: "Authorization code missing" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  try {
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return new NextResponse(
        JSON.stringify({ error: "Access token missing" }),
        {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    const profileResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const profileData = profileResponse.data;

    return new NextResponse(
      JSON.stringify({
        avatar_url: profileData.avatar_url,
        username: profileData.login,
        name: profileData.name,
        accessToken: accessToken,
      }),
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch GitHub profile" }),
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}
