import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: __dirname, 

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cxpqdxdbyccviojjtalg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    domains: [
      "images.unsplash.com",
      "images.pexels.com",
      "assets.lummi.ai",
      "i.postimg.cc",
      "picsum.photos"
    ],
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/dashboard",
  //       destination: "https://dashboard.torqxai.vercel.app",
  //       permanent: true, // 308 redirect
  //     },
  //   ]
  // },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // const fileLoaderRule = config.module.rules.find((rule) =>
    //   rule.test?.test?.(".svg")
    // );

    const fileLoaderRule = config.module.rules.find(
  (rule: any) => rule.test?.test?.(".svg")
);

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  }  
  
};

export default nextConfig;

