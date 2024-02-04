/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_KEY,
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND
  }
}

module.exports = nextConfig
