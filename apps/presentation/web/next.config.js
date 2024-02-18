/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  transpilePackages: ['@repo/ui'],
  experimental: {
    forceSwcTransforms: true
  }
}
