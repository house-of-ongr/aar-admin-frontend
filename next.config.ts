const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
        port: "",
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATH_PRIVATE,
        search: "",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
        port: "",
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATH_PUBLIC,
        search: "",
      },
    ],
  },
};

export default nextConfig;
