import { HexColorConverter } from "@/components/tools/hex-color-converter";
import { ToolPage } from "@/components/tools/tool-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "HEX 색상 추출기 및 감지기 (RGB 변환기) | ToolBitBox",
  description:
    "웹 디자인과 개발을 위한 필수 HEX 색상 추출기. HEX 코드를 입력하거나 RGB 값을 조절하여 정확한 색상 코드를 찾고, 실시간으로 색상 형식(HEX, RGB, HSL)을 변환하세요.",
  keywords: [
    "헥스 색상 추출기",
    "HEX 코드 감지기",
    "색상 코드 찾기",
    "RGB HEX 변환",
    "16진수 색상 선택기",
    "웹 컬러 코드",
    "색상 식별기",
    "디자인 색상 도구",
  ],
};

export default function ColorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ToolBitBox HEX 색상 추출기",
    operatingSystem: "Any",
    applicationCategory: "DesignApplication",
    description:
      "HEX 코드, RGB, HSL 값을 실시간으로 추출하고 상호 변환해주는 웹 디자인 도구입니다.",
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
        title="HEX 색상 추출 및 변환기"
        description="RGB 값을 조절하거나 HEX 코드를 입력하여 정확한 색상 코드를 식별하고 실시간으로 변환합니다."
      >
        <div className="space-y-12">
          <HexColorConverter />

          {/* SEO 및 정보성 콘텐츠 섹션 */}
          <section className="mt-16 space-y-8">
            <Separator />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  HEX 색상 코드란 무엇인가요?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-slate-900">HEX(Hexadecimal)</strong> 색상 코드는 웹에서 색상을 표현하는 가장 일반적인 방식입니다. 16진수 6자리(#RRGGBB)를 사용하여 빨강(Red), 초록(Green), 파랑(Blue)의 농도를 표현합니다. 각 색상은 00부터 FF까지 256단계로 세밀하게 조절됩니다.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  왜 HEX 코드를 사용하나요?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  HEX 코드는 짧고 직관적이며 모든 최신 웹 브라우저에서 표준으로 지원됩니다. CSS 디자인 시 <code className="bg-slate-100 px-1 rounded">color: #4f46e5;</code>와 같이 간단하게 색상을 지정할 수 있어 개발자와 디자이너 사이의 커뮤니케이션에 필수적입니다.
                </p>
              </div>
            </div>

            <Card className="bg-slate-50/50 border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">주요 색상 형식 요약</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-semibold text-rose-600">
                    HEX (#RRGGBB)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    16진수 기반 표현식. 웹 디자인의 표준이며 가장 널리 사용됩니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-emerald-600">
                    RGB (Red, Green, Blue)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    빛의 삼원색 기반 표현. 0~255 사이의 숫자로 색상을 정의합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-blue-600">
                    HSL (Hue, Saturation, Lightness)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    색상, 채도, 명도 기반. 인간이 인지하기 가장 직관적인 방식입니다.
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
                    Q. HEX 코드에서 "FF"는 무엇을 의미하나요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    16진수에서 FF는 10진수의 255를 의미하며, 해당 색상 채널의 최대 밝기를 나타냅니다. 예를 들어 #FF0000은 순수한 빨간색입니다.
                  </p>
                </div>
                <div className="p-5 rounded-xl border bg-white shadow-sm">
                  <h4 className="font-bold mb-2 text-slate-900">
                    Q. 대비 비율(Contrast Ratio)이 왜 중요한가요?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    웹 접근성(WCAG) 표준에 따르면, 텍스트와 배경의 대비가 충분해야 모든 사용자가 정보를 읽을 수 있습니다. ToolBitBox는 실시간으로 이 대비율을 계산해 줍니다.
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
