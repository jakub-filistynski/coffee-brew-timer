/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH,
  output: "export",  // <=== enables static exports
};

export default nextConfig;
