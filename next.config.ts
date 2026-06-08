import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  env: {
    SES_ACCESS_KEY_ID:     process.env.SES_ACCESS_KEY_ID     ?? "",
    SES_SECRET_ACCESS_KEY: process.env.SES_SECRET_ACCESS_KEY ?? "",
    SES_REGION:            process.env.SES_REGION            ?? "eu-west-2",
    CONTACT_FROM_EMAIL:    process.env.CONTACT_FROM_EMAIL    ?? "",
    CONTACT_TO_EMAIL:      process.env.CONTACT_TO_EMAIL      ?? "",
  },
  async redirects() {
    return [
      {
        source: "/platform",
        destination: "/solutions",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
