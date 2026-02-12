import type { Metadata } from "next";
import Link from "next/link";
import { Github, Code2, Cpu, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "소개 (About) - 컴퓨터 공학/소프트웨어학과 1학년 학습 도구 ToolBitBox",
  description:
    "컴퓨터 공학/소프트웨어학과 1학년 학습을 돕는 ToolBitBox 프로젝트의 개발 스토리와 활용된 최신 웹 기술 스택을 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      {/* 1. 헤더 섹션 */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900">
          About <span className="text-blue-600">ToolBitBox</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          개발자와 전공생을 위한 웹 유틸리티 도구 상자입니다.
          <br />
          복잡한 계산은 줄이고, 로직에 집중할 수 있도록 돕습니다.
        </p>
      </section>

      {/* 2. 프로젝트 소개 카드 */}
      <section className="mb-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-blue-600" />
              프로젝트 목적
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              ToolBitBox는 컴퓨터 구조와 시스템 프로그래밍을 공부하며 겪었던
              <strong> "진법 변환의 번거로움"</strong>을 해결하기 위해
              시작되었습니다.
            </p>
            <p>
              기존 계산기들의 투박한 UI와 불친절한 경험을 개선하고, 웹 표준
              기술을 활용해 언제 어디서나 접근 가능한
              <strong> 빠르고 아름다운 도구</strong>를 만드는 것을 목표로
              합니다.
            </p>
          </CardContent>
        </Card>

        {/* 3. 기술 스택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-violet-600" />
              기술 스택 (Tech Stack)
            </CardTitle>
            <CardDescription>
              최신 모던 웹 기술을 사용하여 구축되었습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <TechBadge
                name="Next.js 16"
                icon={<Globe className="h-3 w-3" />}
                color="bg-black hover:bg-slate-800"
              />
              <TechBadge
                name="TypeScript"
                icon={<Code2 className="h-3 w-3" />}
                color="bg-blue-600 hover:bg-blue-700"
              />
              <TechBadge
                name="Tailwind CSS"
                color="bg-sky-500 hover:bg-sky-600"
              />
              <TechBadge
                name="shadcn/ui"
                color="bg-slate-900 hover:bg-slate-800"
              />
              <TechBadge
                name="Lucide Icons"
                color="bg-pink-500 hover:bg-pink-600"
              />
              <TechBadge name="Vercel" color="bg-black hover:bg-slate-800" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// 뱃지 컴포넌트 (내부용)
function TechBadge({
  name,
  color,
  icon,
}: {
  name: string;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <Badge
      className={`${color} text-white gap-1 px-3 py-1 text-sm font-medium`}
    >
      {icon}
      {name}
    </Badge>
  );
}
