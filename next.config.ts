import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static HTML export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export (GitHub Pages doesn't support Next.js image optimization)
  },
  // If deploying to a project repository (e.g., username.github.io/repo-name),
  // uncomment and set basePath to your repository name:
  // basePath: "/repo-name",
};

export default nextConfig;
