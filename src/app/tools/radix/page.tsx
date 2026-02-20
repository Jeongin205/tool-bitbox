import { RadixConverter } from "@/components/tools/radix-converter";
import { ToolPage } from "@/components/tools/tool-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "진법 변환기 (2, 8, 10, 16진수 계산) | ToolBitBox",
  description:
    "컴퓨터 공학 1학년 학생을 위한 필수 진법 변환기. 2진수, 8진수, 10진수, 16진수를 실시간으로 상호 변환하고 학습하세요. 시험 대비 및 개념 정리에 최적화되어 있습니다.",
  keywords: [
    "진법 변환기",
    "2진수 10진수 변환",
    "16진수 계산",
    "8진수 변환",
    "컴퓨터 구조 진법",
    "진법 변환 방법",
    "진법 계산기",
  ],
};

export default function RadixPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ToolBitBox 진법 변환기",
    operatingSystem: "Any",
    applicationCategory: "EducationalApplication",
    description:
      "2진수, 8진수, 10진수, 16진수를 실시간으로 상호 변환해주는 도구입니다.",
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
        title="진법 변환기"
        description="하나의 숫자를 입력하면 모든 진법(2, 8, 10, 16)으로 자동 변환됩니다."
      >
        <div className="space-y-12">
          <RadixConverter />

          {/* SEO 및 정보성 콘텐츠 섹션 */}
          <section className="mt-16 space-y-8">
            <Separator />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  진법 변환이란?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  진법 변환은 하나의 수를 다른 진법의 수로 바꾸어 표현하는
                  과정입니다. 컴퓨터 공학에서는 주로{" "}
                  <strong className="text-slate-900">2진수(Binary)</strong>,{" "}
                  <strong className="text-slate-900">8진수(Octal)</strong>,
                  <strong className="text-slate-900">10진수(Decimal)</strong>,{" "}
                  <strong className="text-slate-900">
                    16진수(Hexadecimal)
                  </strong>
                  가 널리 사용됩니다.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  왜 중요한가요?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  컴퓨터는 모든 데이터를 0과 1인 2진수로 처리합니다. 하지만
                  사람이 2진수를 읽기는 어렵기 때문에, 이를 더 간결하게 표현하기
                  위해 8진수나 16진수를 사용합니다. 특히 16진수는
                  1바이트(8비트)를 두 자리로 표현할 수 있어 시스템
                  프로그래밍에서 필수적입니다.
                </p>
              </div>
            </div>

            <Card className="bg-slate-50/50 border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">주요 진법 요약</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-blue-600">
                    2진수 (Binary)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    0과 1만 사용. 컴퓨터 하드웨어의 기본 동작 단위입니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-emerald-600">
                    8진수 (Octal)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    0~7 사용. 2진수 3자리를 한 번에 간결하게 표현합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900">
                    10진수 (Decimal)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    0~9 사용. 우리가 일상 생활에서 가장 흔히 사용하는
                    진법입니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-violet-600">
                    16진수 (Hexadecimal)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    0~F 사용. 메모리 주소나 색상 코드(HEX) 표현에 필수적입니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-center">
                자주 묻는 질문 (FAQ)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-5 rounded-xl border bg-white shadow-sm">
                  <h4 className="font-bold mb-2 text-slate-900">
                    Q. 16진수에서 A~F는 무엇인가요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    10진수의 10부터 15까지를 한 자리로 표현하기 위해 알파벳
                    A(10), B(11), C(12), D(13), E(14), F(15)를 사용합니다.
                  </p>
                </div>
                <div className="p-5 rounded-xl border bg-white shadow-sm">
                  <h4 className="font-bold mb-2 text-slate-900">
                    Q. 진법 변환을 쉽게 하는 팁이 있나요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    2진수를 4자리씩 끊어서 읽으면 16진수로, 3자리씩 끊어서 읽으면
                    8진수로 쉽게 변환할 수 있어 실수를 줄일 수 있습니다.
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
