import { NextResponse } from "next/server";

const payload = {
  disclosures: [
    {
      identifier: "cookieyes-consent",
      type: "cookie",
      maxAgeSeconds: 31536000,
      cookieRefresh: false,
      purposes: [1],
      specialPurposes: [3],
      domains: ["broadlab.tv"],
    },
  ],
  domains: ["broadlab.tv"],
  sdks: [],
};

export async function GET() {
  return NextResponse.json(payload, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "false",
    },
  });
}
