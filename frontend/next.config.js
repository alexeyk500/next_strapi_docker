/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: `/uploads/:path`,
        destination: `${process.env.API_URI}/uploads/:path`
      }
    ]
  }
}

module.exports = nextConfig
