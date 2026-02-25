import { BitwiseSimulator } from "@/components/tools/bitwise-simulator";
import { ToolPage } from "@/components/tools/tool-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "비트 연산 시뮬레이터 (&, |, ^, ~, <<, >>) | ToolBitBox",
  description:
    "컴퓨터 공학 학습을 위한 필수 비트 연산 시뮬레이터. AND, OR, XOR, NOT 및 시프트 연산의 과정을 비트 단위로 시각화하여 쉽게 이해할 수 있습니다.",
  keywords: [
    "비트 연산자",
    "비트 연산 시뮬레이터",
    "AND 연산",
    "OR 연산",
    "XOR 연산",
    "NOT 연산",
    "시프트 연산",
    "bitwise simulator",
    "컴퓨터 구조",
  ],
};

export default function BitwisePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ToolBitBox 비트 연산 시뮬레이터",
    operatingSystem: "Any",
    applicationCategory: "EducationalApplication",
    description:
      "비트 단위 연산(&, |, ^, ~, <<, >>)의 과정을 시각적으로 시뮬레이션해주는 도구입니다.",
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
        title="비트 연산 시뮬레이터"
        description="두 숫자의 비트 단위 연산 과정을 시각적으로 분석하고 이해합니다."
      >
        <div className="space-y-12">
          <BitwiseSimulator />

          {/* 정보성 콘텐츠 섹션 */}
          <section className="mt-16 space-y-8">
            <Separator />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  비트 연산자(Bitwise Operator)란?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  비트 연산자는 정수 데이터를 비트(0과 1) 단위로 조작하는 연산자입니다. 
                  메모리 절약, 고속 연산, 플래그 관리 등 저수준 시스템 프로그래밍에서 매우 중요하게 사용됩니다.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  왜 알아야 하나요?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  임베디드 시스템, 네트워크 프로토콜, 그래픽 처리 등 성능이 중요한 분야에서는 
                  비트 연산을 통해 데이터를 효율적으로 처리합니다. 또한 기술 면접이나 정보처리기사 등 
                  자격증 시험에서도 단골로 출제되는 주제입니다.
                </p>
              </div>
            </div>

            <Card className="bg-slate-50/50 border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">주요 비트 연산자 요약</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-semibold text-blue-600">
                    AND (&)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    두 비트가 모두 1일 때만 1을 반환합니다. 특정 비트를 가릴(Masking) 때 사용합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-emerald-600">
                    OR (|)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    두 비트 중 하나만 1이어도 1을 반환합니다. 특정 비트를 켤(Setting) 때 사용합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-violet-600">
                    XOR (^)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    두 비트가 서로 다를 때 1을 반환합니다. 비트 반전이나 암호화에 사용됩니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-orange-600">
                    NOT (~)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    모든 비트를 반전시킵니다(0은 1로, 1은 0으로). 1의 보수를 만들 때 쓰입니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-rose-600">
                    Shift (&lt;&lt;, &gt;&gt;)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    비트를 왼쪽이나 오른쪽으로 이동시킵니다. 2의 거듭제곱 곱셈이나 나눗셈 효과가 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </ToolPage>
    </>
  );
}
