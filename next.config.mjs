/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'standalone', // or remove 'output' entirely
  // Or force SSR for all pages:
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: '2mb',
  //   },
  // },
};

export default nextConfig;
