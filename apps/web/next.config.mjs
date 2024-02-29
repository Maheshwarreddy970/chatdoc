// next.config.mjs

const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/trpc", "@repo/database"],
  images: {
    domains: ['lh3.googleusercontent.com'], // Add the domain of your external images
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // if (!isServer) {
    //   config.plugins.push(new webpack.IgnorePlugin(/fs/));
    // }
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
