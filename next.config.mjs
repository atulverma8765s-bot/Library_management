/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',

  // GitHub Pages needs this path.
  // Local development will run at http://localhost:3000/
  basePath: isProd ? '/Library_management' : '',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;