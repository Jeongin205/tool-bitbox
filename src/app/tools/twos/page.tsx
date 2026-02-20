import type { Metadata } from "next";
import { TwosCalculator } from "@/components/tools/twos-calculator";
import { ToolPage } from "@/components/tools/tool-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "2의 보수 계산기 (Two's Complement Calculator) | ToolBitBox",
  description:
    "컴퓨터 공학 필수 과정! 4/8/16/32비트 2의 보수 계산 및 변환 학습 도구입니다. 음수 표현 원리, 비트 반전, 1의 보수와의 차이점을 이해하고 시험을 완벽히 대비하세요.",
  keywords: [
    "2의 보수 계산기",
    "Two's Complement",
    "음수 2진수 변환",
    "비트 반전",
    "1의 보수 2의 보수",
    "컴퓨터 구조 음수 표현",
    "정보처리기사 2의 보수",
    "시스템 프로그래밍 2진수",
  ],
};

export default function TwosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ToolBitBox 2의 보수 계산기",
    operatingSystem: "Any",
    applicationCategory: "EducationalApplication",
    description:
      "입력한 숫자를 4/8/16/32비트 기반의 2의 보수(Two's Complement) 형태로 즉시 계산해주는 도구입니다.",
    offers: {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPage
        title="2의 보수 계산기"
        description="컴퓨터가 음수를 저장하는 방식인 2의 보수 형태를 확인해보세요."
      >
        <div className="space-y-12">
          <TwosCalculator />

          {/* SEO 및 정보성 콘텐츠 섹션 */}
          <section className="mt-16 space-y-8">
            <Separator />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  2의 보수(Two's Complement)란?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  2의 보수는 컴퓨터가 <strong className="text-slate-900">음의 정수를 표현</strong>하기 위해 가장 널리 사용하는 방식입니다. 이 방식을 사용하면 덧셈 회로만으로 뺄셈을 처리할 수 있어 CPU 설계가 매우 단순해집니다.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  왜 2의 보수를 쓰나요?
                </h2>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>0의 표현이 유일함:</strong> 1의 보수와 달리 +0과 -0이 나뉘지 않고 하나의 0(0000...)만 존재합니다.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>가산기 활용:</strong> 별도의 감산기 없이 가산기(Adder) 하나로 모든 사칙연산을 효율적으로 수행할 수 있습니다.</span>
                  </li>
                </ul>
              </div>
            </div>

            <Card className="bg-slate-50/50 border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">2의 보수 계산 방법 (3단계)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <h3 className="font-semibold">절댓값 변환</h3>
                  <p className="text-sm text-muted-foreground">
                    해당 숫자의 절댓값을 정해진 비트 수(예: 8비트)의 2진수로 변환합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                  <h3 className="font-semibold">1의 보수 (비트 반전)</h3>
                  <p className="text-sm text-muted-foreground">
                    모든 비트를 반전시킵니다. (0은 1로, 1은 0으로) 이를 1의 보수라고 합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                  <h3 className="font-semibold">1 더하기</h3>
                  <p className="text-sm text-muted-foreground">
                    비트 반전된 결과에 마지막으로 1을 더하면 최종적인 2의 보수가 완성됩니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-center">
                시험에 자주 나오는 포인트
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-5 rounded-xl border bg-white shadow-sm">
                  <h4 className="font-bold mb-2 text-slate-900">
                    Q. 비트 수가 늘어나면 값이 어떻게 되나요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    음수의 경우 가장 앞의 부호 비트(1)를 왼쪽으로 확장(Sign Extension)합니다. 예를 들어 8비트 -5는 16비트가 되어도 여전히 같은 값을 유지하도록 1이 채워집니다.
                  </p>
                </div>
                <div className="p-5 rounded-xl border bg-white shadow-sm">
                  <h4 className="font-bold mb-2 text-slate-900">
                    Q. 오버플로우(Overflow)란 무엇인가요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    계산 결과가 해당 비트 수로 표현할 수 있는 범위를 넘어설 때 발생합니다. 8비트 2의 보수 범위는 -128부터 +127까지입니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ToolPage>
    </>
  );
}
