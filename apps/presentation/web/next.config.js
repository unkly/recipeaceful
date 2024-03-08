/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui'],
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  experimental: {
    forceSwcTransforms: true
  }
}
