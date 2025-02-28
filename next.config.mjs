/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["picsum.photos", "firebasestorage.googleapis.com","res.cloudinary.com",'lh3.googleusercontent.com'],
  },
};

export default nextConfig;
