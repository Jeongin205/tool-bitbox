"use client";

import { SITE_MENU } from "@/config/nav";
import { ToolCard } from "@/components/tool-card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* 1. 히어로 섹션 (Hero Section) */}
      <section className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
          개발자를 위한 <span className="text-blue-600">스마트 도구 상자</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          복잡한 계산과 변환 작업을 ToolBitBox에서 한 번에 해결하세요.
          <br className="hidden sm:inline" />
          공학용 계산기보다 빠르고, 일반 검색보다 정확합니다.
        </p>
      </section>

      {/* 2. 도구 그리드 (Tool Grid) */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_MENU.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </section>
    </div>
  );
}
