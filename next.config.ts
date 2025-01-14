const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME_TEST,
        port: process.env.NEXT_PUBLIC_IMAGE_PORT_TEST,
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATH_TEST,
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME_PRIVATE,
        port: "",
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATH_PRIVATE,
        search: "",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME_PUBLIC,
        port: "",
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATH_PUBLIC,
        search: "",
      },
    ],
  },
};

export default nextConfig;
