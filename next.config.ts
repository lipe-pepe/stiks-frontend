import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Endpoint local no Next.js
        destination: "http://localhost:3030/:path*", // URL do backend
      },
    ];
  },
};

export default withNextIntl(nextConfig);
