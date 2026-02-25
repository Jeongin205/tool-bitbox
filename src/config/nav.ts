import { Binary, Calculator, Palette, Trophy, Cpu } from "lucide-react";

export type SiteConfig = (typeof SITE_MENU)[number];

export const SITE_MENU = [
  {
    id: "binary",
    title: "진법 변환기",
    href: "/tools/radix",
    description:
      "2진수, 8진수, 16진수를 실시간으로 변환하고 비트 패턴을 분석합니다.",
    icon: Binary,
  },
  {
    id: "complement",
    title: "2의 보수 계산기",
    href: "/tools/twos",
    description:
      "컴퓨터 내부의 음수 표현 방식인 2의 보수(2's Complement)를 계산합니다.",
    icon: Calculator,
  },
  {
    id: "bitwise",
    title: "비트 연산 시뮬레이터",
    href: "/tools/bitwise",
    description: "비트 단위 연산(&, |, ^, ~, <<, >>)의 과정을 시각적으로 시뮬레이션합니다.",
    icon: Cpu,
  },
  {
    id: "hex-color",
    title: "HEX 색상 추출기",
    href: "/tools/color",
    description: "RGB 값을 16진수 색상 코드로 변환하거나 반대로 계산합니다.",
    icon: Palette,
  },
  {
    id: "quiz",
    title: "진법 변환 퀴즈",
    href: "/quiz",
    description: "시험 대비! 2의 보수와 진법 변환 실전 모의고사",
    icon: Trophy,
  },
] as const;
