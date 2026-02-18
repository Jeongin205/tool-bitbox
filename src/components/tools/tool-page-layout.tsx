import React from "react";

interface ToolPageProps {
  title: string; // 페이지 제목
  description: string; // 페이지 설명
  children: React.ReactNode; // 실제 도구 컴포넌트
}

export function ToolPage({ title, description, children }: ToolPageProps) {
  return (
    // 1. 공통 레이아웃
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-8 animate-in fade-in duration-500">
      {/* 2. 공통 제목 영역  */}
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      {/* 3. 실제 도구 컴포넌트 위치 */}
      <div>{children}</div>
    </div>
  );
}
