/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  experimental: {
    forceSwcTransforms: true
  }
}
