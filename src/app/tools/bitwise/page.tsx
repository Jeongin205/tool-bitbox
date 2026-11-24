import { BitwiseSimulator } from "@/components/tools/bitwise-simulator";
import { ToolPage } from "@/components/tools/tool-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "비트 연산 시뮬레이터 - AND·OR·XOR·시프트 비트 애니메이션",
  description:
    "비트 연산이 헷갈릴 땐 눈으로 직접 확인하세요. AND, OR, XOR, NOT, 시프트(<<, >>) 연산 과정을 한 비트씩 시각적으로 시뮬레이션합니다. 무료 온라인 비트 연산 계산기.",
  keywords: [
    "비트 연산자",
    "비트 연산 시뮬레이터",
    "AND OR XOR 연산",
    "비트 시프트 연산 원리",
    "AND 연산",
    "OR 연산",
    "XOR 연산",
    "NOT 연산",
    "시프트 연산",
    "bitwise simulator",
    "컴퓨터 구조 비트 연산",
  ],
};

export default function BitwisePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "ToolBitBox 비트 연산 시뮬레이터",
        operatingSystem: "Any",
        applicationCategory: "EducationalApplication",
        description:
          "비트 단위 연산(&, |, ^, ~, <<, >>)의 과정을 시각적으로 시뮬레이션해주는 도구입니다.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "XOR(^) 연산은 주로 어디에 활용되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "XOR 연산은 두 값이 서로 다를 때만 1을 반환하는 특성을 이용해 두 변수의 값 맞바꾸기(Swap without temp), 패리티 비트 검사, 단순 데이터 암호화 및 그래픽 반전 효과에 널리 사용됩니다.",
            },
          },
          {
            "@type": "Question",
            name: "시프트 연산자(<<, >>)는 어떤 효과가 있나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "왼쪽 시프트(x << n)는 x에 2의 n제곱을 곱한 것과 같고, 오른쪽 시프트(x >> n)는 x를 2의 n제곱으로 나눈 몫과 같습니다. 일반 곱셈/나눗셈 연산자보다 하드웨어 처리 속도가 매우 빠릅니다.",
            },
          },
          {
            "@type": "Question",
            name: "비트 마스킹(Bit Masking)이란 무엇인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AND(&) 연산자를 이용해 관심 있는 특정 비트만 추출하거나, OR(|) 연산자를 사용해 특정 비트만 1로 켜는 프로그래밍 기법입니다. 플래그(Flag) 관리나 하드웨어 제어에서 필수적입니다.",
            },
          },
        ],
      },
    ],
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

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-center">
                자주 묻는 질문 (FAQ)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-5 rounded-xl border bg-white shadow-sm">
                  <h4 className="font-bold mb-2 text-slate-900">
                    Q. XOR(^) 연산은 주로 어디에 활용되나요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    XOR 연산은 두 값이 서로 다를 때만 1을 반환하는 특성을 이용해 두 변수의 값 맞바꾸기(Swap without temp), 패리티 비트 검사, 단순 데이터 암호화 및 그래픽 반전 효과에 널리 사용됩니다.
                  </p>
                </div>
                <div className="p-5 rounded-xl border bg-white shadow-sm">
                  <h4 className="font-bold mb-2 text-slate-900">
                    Q. 시프트 연산자(&lt;&lt;, &gt;&gt;)는 어떤 효과가 있나요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    왼쪽 시프트(x &lt;&lt; n)는 x에 2의 n제곱을 곱한 것과 같고, 오른쪽 시프트(x &gt;&gt; n)는 x를 2의 n제곱으로 나눈 몫과 같습니다. 일반 곱셈/나눗셈 연산자보다 하드웨어 처리 속도가 매우 빠릅니다.
                  </p>
                </div>
                <div className="p-5 rounded-xl border bg-white shadow-sm sm:col-span-2 lg:col-span-1">
                  <h4 className="font-bold mb-2 text-slate-900">
                    Q. 비트 마스킹(Bit Masking)이란 무엇인가요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AND(&amp;) 연산자를 이용해 관심 있는 특정 비트만 추출하거나, OR(|) 연산자를 사용해 특정 비트만 1로 켜는 프로그래밍 기법입니다. 플래그(Flag) 관리나 하드웨어 제어에서 필수적입니다.
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
