/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@repo/db'],
    output: 'standalone',
};

export default nextConfig;
