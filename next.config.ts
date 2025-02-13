import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Certifique-se de que a variável de ambiente está definida
const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_HOST || "http://localhost:3030";

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
