import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: (typeof process !== "undefined" && process.env.NODE_ENV === 'production') ? 'standalone' : undefined,
  webpack: (config, { webpack }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    
    config.resolve.fallback = {
      ...config.resolve?.fallback,
      process: require.resolve("process/browser"),
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      url: require.resolve("url"),
      assert: require.resolve("assert"),
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );

    return config;
  },
};

export default nextConfig;
