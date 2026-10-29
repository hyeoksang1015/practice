import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 서버 없이 정적 파일(out/)로 내보낸다. 제안서용 초안이라 어디에 올려도 그대로 열린다.
  output: "export",
  trailingSlash: true,
  // 정적 내보내기에는 이미지 최적화 서버가 없다. 이미지는 미리 webp 로 만들어 public/ 에 둔다.
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
