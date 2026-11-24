"use client";

import React, { useState } from "react";
import { Play, Check, Binary, Cpu, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 퀴즈 설정 데이터 타입 정의 (다른 파일에서도 쓰일 수 있음)
export interface QuizConfig {
  mode: "unsigned" | "signed"; // 양수만(기본) vs 2의보수(음수)
  bitDepth: 4 | 8; // 4비트 vs 8비트
  questionCount: number; // 5, 10, 20
  selectedBases: number[]; // [2, 8, 10, 16] 중 선택된 진법들
}

interface QuizSetupProps {
  onStart: (config: QuizConfig) => void;
}

export function QuizSetup({ onStart }: QuizSetupProps) {
  // 기본 설정값
  const [config, setConfig] = useState<QuizConfig>({
    mode: "unsigned",
    bitDepth: 8, // 대학생 시험용 기본값 (Byte)
    questionCount: 10,
    selectedBases: [2, 10, 16], // 8진수는 선택 사항으로 둠
  });

  const toggleBase = (base: number) => {
    setConfig((prev) => {
      const exists = prev.selectedBases.includes(base);
      // 최소 2개 이상의 진법이 선택되어야 문제가 성립됨
      if (exists && prev.selectedBases.length <= 2) return prev;

      const newBases = exists
        ? prev.selectedBases.filter((b) => b !== base)
        : [...prev.selectedBases, base].sort((a, b) => a - b);

      return { ...prev, selectedBases: newBases };
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. 훈련 모드 선택 (핵심 기능) */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Binary className="w-5 h-5 text-blue-600" />
          훈련 유형 선택
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unsigned Mode */}
          <div
            onClick={() => setConfig({ ...config, mode: "unsigned" })}
            className={cn(
              "cursor-pointer rounded-xl border-2 p-5 transition-all hover:border-blue-400 relative overflow-hidden",
              config.mode === "unsigned"
                ? "border-blue-600 bg-blue-50/50"
                : "border-slate-200 bg-white",
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-lg">기본 변환 (Unsigned)</span>
              {config.mode === "unsigned" && (
                <div className="bg-blue-600 text-white rounded-full p-1">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </div>
            <p className="text-sm text-slate-500">
              0 이상의 양수만 다룹니다. 진법 간의 변환 속도를 높이는 훈련입니다.
            </p>
          </div>

          {/* Signed Mode (2의 보수) */}
          <div
            onClick={() => setConfig({ ...config, mode: "signed" })}
            className={cn(
              "cursor-pointer rounded-xl border-2 p-5 transition-all hover:border-purple-400 relative overflow-hidden",
              config.mode === "signed"
                ? "border-purple-600 bg-purple-50/50"
                : "border-slate-200 bg-white",
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-lg text-purple-700">
                2의 보수 (Signed)
              </span>
              {config.mode === "signed" && (
                <div className="bg-purple-600 text-white rounded-full p-1">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </div>
            <p className="text-sm text-slate-500">
              음수 표현을 포함합니다. 컴퓨터 구조 시험 대비에 필수적인
              모드입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 비트 범위 & 진법 선택 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 난이도 (Bit Depth) */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-slate-600" />
            비트 범위 (난이도)
          </h3>
          <div className="flex gap-3">
            {[4, 8].map((bits) => (
              <button
                key={bits}
                onClick={() =>
                  setConfig({ ...config, bitDepth: bits as 4 | 8 })
                }
                className={cn(
                  "flex-1 py-3 px-4 rounded-lg border font-medium transition-all text-sm",
                  config.bitDepth === bits
                    ? "border-slate-900 bg-slate-900 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                )}
              >
                {bits}비트 ({bits === 4 ? "0~15" : "0~255"})
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 px-1">
            * 8비트는 네트워크/ASCII 등 실무 범위입니다.
          </p>
        </section>

        {/* 포함할 진법 (다중 선택) */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-slate-600" />
            포함할 진법
          </h3>
          <div className="flex gap-2">
            {[2, 8, 10, 16].map((base) => {
              const isActive = config.selectedBases.includes(base);
              // 2의 보수 모드일 땐 2진수, 10진수 필수 (UI 비활성화 처리 가능하지만 여기선 자유도 부여)
              return (
                <button
                  key={base}
                  onClick={() => toggleBase(base)}
                  className={cn(
                    "flex-1 h-12 rounded-lg border font-bold transition-all",
                    isActive
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white text-slate-400 hover:border-slate-300",
                  )}
                >
                  {base}
                  <span className="text-[10px] font-normal block text-slate-400">
                    진수
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* 3. 문제 수 선택 */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">문제 수</h3>
          <span className="text-sm font-medium text-slate-500">
            {config.questionCount}문제
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="30"
          step="5"
          value={config.questionCount}
          onChange={(e) =>
            setConfig({ ...config, questionCount: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>5개 (가볍게)</span>
          <span>30개 (빡세게)</span>
        </div>
      </section>

      {/* 시작 버튼 */}
      <div className="pt-6">
        <Button
          size="lg"
          className="w-full text-lg h-14 font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all"
          onClick={() => onStart(config)}
        >
          <Play className="w-5 h-5 mr-2 fill-current" />
          챌린지 시작하기
        </Button>
      </div>
    </div>
  );
}
