import { Metadata } from "next";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "BitBox Challenge - 진법 변환 및 2의 보수 퀴즈 연습 | ToolBitBox",
  description:
    "컴퓨터 공학 1학년 필수 과정! 2진수, 16진수, 2의 보수 변환 문제를 풀며 컴퓨터 구조 및 시스템 프로그래밍 시험 실력을 테스트하세요. 실시간 피드백으로 개념을 확실히 잡을 수 있습니다.",
  keywords: [
    "진법 변환 퀴즈",
    "2진수 퀴즈",
    "16진수 변환 연습",
    "2의 보수 계산 문제",
    "컴퓨터 구조 시험 대비",
    "정보처리기사 진법 문제",
    "디지털 논리 회로 연습",
  ],
};

export default function QuizPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "BitBox Challenge - 진법 변환 실력 테스트",
    "description": "2진수, 8진수, 16진수 및 2의 보수 변환 실력을 테스트하는 인터랙티브 퀴즈입니다.",
    "educationalAlignment": [
      {
        "@type": "AlignmentObject",
        "alignmentType": "educationalLevel",
        "educationalFramework": "Computer Science Curriculum",
        "targetName": "College Freshman",
      },
    ],
    "hasPart": {
      "@type": "Question",
      "eduQuestionType": "MultipleChoice",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pb-20">
        <QuizContainer />

        {/* SEO 및 정보성 콘텐츠 섹션 */}
        <div className="container mx-auto max-w-4xl px-4 mt-20 space-y-16">
          <Separator />

          <section className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold tracking-tight">
                왜 진법 변환 연습이 필요한가요?
              </h2>
              <p className="text-muted-foreground text-lg">
                컴퓨터 공학의 기초는 데이터의 표현 방식을 이해하는 것에서
                시작됩니다.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-none shadow-none bg-blue-50/50">
                <CardHeader className="pb-2">
                  <Brain className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-xl">시험 완벽 대비</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    중간/기말고사에서 빠지지 않고 등장하는 진법 변환 문제를
                    빠르고 정확하게 푸는 능력을 기를 수 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-emerald-50/50">
                <CardHeader className="pb-2">
                  <Target className="w-8 h-8 text-emerald-600 mb-2" />
                  <CardTitle className="text-xl">실전 감각 향상</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    단순 계산을 넘어, 시간 내에 정확한 값을 도출하는 반복
                    연습을 통해 실수를 줄이고 자신감을 높여줍니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-violet-50/50">
                <CardHeader className="pb-2">
                  <BookOpen className="w-8 h-8 text-violet-600 mb-2" />
                  <CardTitle className="text-xl">기초 개념 정립</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    2의 보수, 16진수 주소 체계 등 컴퓨터 구조의 핵심 개념을
                    문제를 통해 자연스럽게 익힐 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">BitBox Challenge 특징</h2>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    난이도 조절 기능 (Bit 수 선택)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    2진수, 10진수, 16진수 상호 변환 문제
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    가장 까다로운 2의 보수 집중 연습
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    실시간 정답 확인 및 최종 스코어 리포트
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm text-center">
                <p className="italic text-slate-200">
                  "시험 전날 10분만 투자해보세요. 진법 변환이 더 이상 두렵지
                  않을 거예요!"
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
