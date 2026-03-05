import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tool-bitbox.vercel.app"; // URL이 바뀌면 여기만 고치면 됨

  return [
    // 1. 메인 페이지
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // 2. 진법 변환기 (Base Converter)
    {
      url: `${baseUrl}/tools/radix`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // 3. 2의 보수 계산기 (Two's Complement)
    {
      url: `${baseUrl}/tools/twos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // 4. HEX 색상 추출기 (Hex Color)
    {
      url: `${baseUrl}/tools/color`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // 5. 비트 연산 시뮬레이터 (Bitwise Simulator)
    {
      url: `${baseUrl}/tools/bitwise`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // 6. 진법 변환 퀴즈 (Quiz)
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
