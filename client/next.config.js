/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    serverUrl: 'http://localhost:9999'
  }
}

module.exports = nextConfig
