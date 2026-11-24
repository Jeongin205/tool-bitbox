"use client";

import { Box, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* 브랜드 섹션 */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-bold">
                ToolBit<span className="text-blue-600">Box</span>
              </span>
            </div>
            <p className="text-sm text-slate-500">
              개발자와 학생을 위한 스마트한 도구 상자
            </p>
          </div>

          {/* 링크 섹션 */}
          <div className="flex gap-8 text-sm font-medium text-slate-600">
            {/* <a href="/tools" className="hover:text-blue-600">
              Tools
            </a>*/}
            <a href="/about" className="hover:text-blue-600">
              About
            </a>
          </div>

          {/* 소셜/링크 아이콘 */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://github.com/Jeongin205/toolbitbox"
              target="_blank"
              className="hover:text-slate-900"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-xs text-slate-400">
          <p>© 2026 ToolBitBox. Built by Ji-in in Software Engineering.</p>
        </div>
      </div>
    </footer>
  );
}
