/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages:["@repo/ui","@repo/trpc","@repo/database"]
};

export default nextConfig;
