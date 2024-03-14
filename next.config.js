/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "localhost" }],
    dangerouslyAllowSVG: true,
  },
};

nextConfig.webpack = (config, context) => {
  config.module.rules.push({
    test: /\.svg$/,
    use: "@svgr/webpack",
  });
  return config;
};

module.exports = nextConfig;
