import type { Metadata } from "next";
import { TwosCalculator } from "@/components/tools/twos-calculator";
import { ToolPage } from "@/components/tools/tool-page-layout";

export const metadata: Metadata = {
  title: "컴퓨터 공학 1학년 2의 보수 계산기 - 시험 대비 (4/8/16/32비트)",
  description:
    "컴퓨터 공학 1학년 학생을 위한 2의 보수(Two's Complement) 학습 및 시험 대비 계산기. 음수 표현 원리를 이해하고 4/8/16/32비트 모드로 변환 연습을 하세요.",
};

export default function TwosPage() {
  return (
    <ToolPage
      title="2의 보수 계산기"
      description="컴퓨터가 음수를 저장하는 방식인 2의 보수 형태를 확인해보세요."
    >
      <TwosCalculator />
    </ToolPage>
  );
}
