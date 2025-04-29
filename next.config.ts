import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  content: [
    // using ./src/ dir
    "./src/**/*.{js,ts,jsx,tsx}",
    // using ./ dir
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add more paths here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default nextConfig;
