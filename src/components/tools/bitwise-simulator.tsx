"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

type BitMode = 4 | 8 | 16;
type Operator = "&" | "|" | "^" | "~" | "<<" | ">>";

export function BitwiseSimulator() {
  const [numA, setNumA] = useState<string>("5");
  const [numB, setNumB] = useState<string>("3");
  const [operator, setOperator] = useState<Operator>("&");
  const [bitMode, setBitMode] = useState<BitMode>(8);

  // 시뮬레이션 상태
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1: 대기, 0 ~ bitMode-1: 진행 중
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // 공통 마스크 계산
  const mask = useMemo(() => (1 << bitMode) - 1, [bitMode]);

  // 입력을 숫자로 변환
  const valA = useMemo(() => {
    const parsed = parseInt(numA || "0");
    return isNaN(parsed) ? 0 : parsed & mask;
  }, [numA, mask]);

  const valB = useMemo(() => {
    const parsed = parseInt(numB || "0");
    return isNaN(parsed) ? 0 : parsed & mask;
  }, [numB, mask]);

  // 연산 결과 계산
  const result = useMemo(() => {
    let res = 0;
    const shiftAmt = (parseInt(numB) || 0) % bitMode;

    switch (operator) {
      case "&":
        res = valA & valB;
        break;
      case "|":
        res = valA | valB;
        break;
      case "^":
        res = valA ^ valB;
        break;
      case "~":
        res = ~valA;
        break;
      case "<<":
        res = valA << shiftAmt;
        break;
      case ">>":
        res = valA >> shiftAmt;
        break;
    }

    return res & mask;
  }, [valA, valB, numB, operator, bitMode, mask]);

  // 비트 배열 생성 (MSB -> LSB 순서)
  const getBits = (val: number, bits: number) => {
    return val
      .toString(2)
      .padStart(bits, "0")
      .slice(-bits)
      .split("")
      .map(Number);
  };

  const bitsA = useMemo(() => getBits(valA, bitMode), [valA, bitMode]);
  const bitsB = useMemo(() => getBits(valB, bitMode), [valB, bitMode]);
  const bitsResult = useMemo(() => getBits(result, bitMode), [result, bitMode]);

  // 시뮬레이션 제어 함수
  const handleReset = useCallback(() => {
    setCurrentStep(-1);
    setIsAutoPlaying(false);
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= bitMode - 1) {
        setIsAutoPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [bitMode]);

  const handleStart = useCallback(() => {
    if (currentStep >= bitMode - 1) setCurrentStep(-1);
    setIsAutoPlaying(true);
  }, [currentStep, bitMode]);

  // 자동 재생 Effect
  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= bitMode - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlaying, bitMode]);

  // 현재 단계 메시지 생성
  const stepMessage = useMemo(() => {
    if (currentStep === -1)
      return "시뮬레이션 시작 버튼을 눌러 비트 단위 연산 과정을 확인하세요.";

    const bitIdx = currentStep;
    const arrayIdx = bitMode - 1 - bitIdx;
    const bA = bitsA[arrayIdx];
    const bB = bitsB[arrayIdx];
    const bR = bitsResult[arrayIdx];

    if (operator === "<<") return `${bitIdx}번 비트가 왼쪽으로 이동합니다.`;
    if (operator === ">>") return `${bitIdx}번 비트가 오른쪽으로 이동합니다.`;
    if (operator === "~") return `${bitIdx}번 비트 반전: ~${bA} = ${bR}`;

    return `${bitIdx}번 비트 연산: ${bA} ${operator} ${bB} = ${bR}`;
  }, [currentStep, bitsA, bitsB, bitsResult, operator, bitMode]);

  return (
    <div className="space-y-8">
      {/* 1. 설정 및 제어 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 border-slate-200 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg">연산 설정 및 제어</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="num-a">Value A (10진수)</Label>
                  <Input
                    id="num-a"
                    type="number"
                    value={numA}
                    onChange={(e) => {
                      setNumA(e.target.value);
                      handleReset();
                    }}
                    className="font-mono h-11"
                  />
                </div>
                {operator !== "~" && (
                  <div className="space-y-2">
                    <Label htmlFor="num-b">
                      {operator === "<<" || operator === ">>"
                        ? "Shift Amount"
                        : "Value B (10진수)"}
                    </Label>
                    <Input
                      id="num-b"
                      type="number"
                      value={numB}
                      onChange={(e) => {
                        setNumB(e.target.value);
                        handleReset();
                      }}
                      className="font-mono h-11"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>연산자 선택</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["&", "|", "^", "~", "<<", ">>"].map((op) => (
                    <Button
                      key={op}
                      variant={operator === op ? "default" : "outline"}
                      className={cn(
                        "h-11 text-lg font-bold transition-all",
                        operator === op
                          ? "bg-blue-600 hover:bg-blue-700 shadow-md scale-105"
                          : "",
                      )}
                      onClick={() => {
                        setOperator(op as Operator);
                        handleReset();
                      }}
                    >
                      {op}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={
                  isAutoPlaying ? () => setIsAutoPlaying(false) : handleStart
                }
                variant={isAutoPlaying ? "outline" : "default"}
                className="gap-2 w-32 shadow-sm"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause size={16} /> 일시정지
                  </>
                ) : (
                  <>
                    <Play size={16} /> 시뮬레이션
                  </>
                )}
              </Button>
              <Button
                onClick={handleNextStep}
                variant="secondary"
                disabled={isAutoPlaying || currentStep >= bitMode - 1}
                className="gap-2"
              >
                <SkipForward size={16} /> 다음 단계
              </Button>
              <Button
                onClick={handleReset}
                variant="ghost"
                className="gap-2 text-slate-500"
              >
                <RotateCcw size={16} /> 초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 border-slate-200 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg">비트 모드</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs
              value={bitMode.toString()}
              onValueChange={(v) => {
                setBitMode(parseInt(v) as BitMode);
                handleReset();
              }}
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="4">4-bit</TabsTrigger>
                <TabsTrigger value="8">8-bit</TabsTrigger>
                <TabsTrigger value="16">16-bit</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-8">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
                <MessageSquare className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 leading-relaxed font-medium">
                  {stepMessage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. 비트 시뮬레이션 시각화 */}
      <Card className="border-slate-200 shadow-sm overflow-hidden bg-slate-50/30">
        <CardHeader className="bg-white border-b flex flex-row items-center justify-between py-4">
          <CardTitle className="text-lg">비트 단위 연산 과정</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border rounded-full">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  currentStep === -1
                    ? "bg-slate-400"
                    : currentStep === bitMode - 1
                      ? "bg-green-500"
                      : "bg-blue-500 animate-pulse",
                )}
              />
              <span className="text-[10px] font-bold text-slate-600 uppercase">
                {currentStep === -1
                  ? "IDLE"
                  : currentStep === bitMode - 1
                    ? "FINISHED"
                    : `STEP ${currentStep + 1}`}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-8 overflow-x-auto">
            <div className="min-w-max space-y-1">
              <div className="flex justify-end mb-4 pr-10">
                <div className="flex gap-4">
                  {Array.from({ length: bitMode / 4 }).map((_, groupIdx) => (
                    <div key={groupIdx} className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => {
                        const idx = bitMode - 1 - (groupIdx * 4 + i);
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "w-8 text-[10px] text-center font-mono transition-colors duration-200",
                              currentStep === idx
                                ? "text-blue-600 font-bold scale-125"
                                : "text-slate-400",
                            )}
                          >
                            {idx}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <BitRow
                label="Value A"
                bits={bitsA}
                color="blue"
                currentStep={currentStep}
                bitMode={bitMode}
              />

              {operator !== "~" ? (
                <>
                  <div className="flex items-center justify-between py-1 pr-10">
                    <div className="text-sm font-bold text-slate-400 pl-4 w-24 shrink-0 font-mono">
                      {operator}
                    </div>
                    <div className="h-px bg-slate-200 flex-1 mx-4" />
                  </div>
                  <BitRow
                    label="Value B"
                    bits={bitsB}
                    color="emerald"
                    currentStep={currentStep}
                    bitMode={bitMode}
                  />
                </>
              ) : (
                <div className="flex items-center justify-between py-4 pr-10">
                  <div className="text-sm font-bold text-slate-400 pl-4 w-24 shrink-0 font-mono">
                    NOT (~)
                  </div>
                  <div className="h-px bg-slate-200 flex-1 mx-4" />
                </div>
              )}

              <div className="flex items-center pr-10 pt-2 pb-4">
                <div className="h-0.5 bg-slate-900 w-full ml-24" />
              </div>

              <BitRow
                label="Result"
                bits={bitsResult}
                color="rose"
                isResult
                currentStep={currentStep}
                bitMode={bitMode}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultBox label="10진수 (Decimal)" value={result.toString()} />
        <ResultBox
          label="16진수 (Hex)"
          value={`0x${result.toString(16).toUpperCase()}`}
        />
        <ResultBox label="2진수 (Binary)" value={bitsResult.join("")} />
      </div>
    </div>
  );
}

function BitRow({
  label,
  bits,
  color,
  currentStep,
  bitMode,
  isResult = false,
}: {
  label: string;
  bits: number[];
  color: "blue" | "emerald" | "rose";
  currentStep: number;
  bitMode: number;
  isResult?: boolean;
}) {
  const colorMap = {
    blue: "bg-blue-600 text-white border-blue-700 shadow-blue-100",
    emerald: "bg-emerald-600 text-white border-emerald-700 shadow-emerald-100",
    rose: "bg-rose-600 text-white border-rose-700 shadow-rose-100",
  };

  const bgColorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const bitGroups = [];
  for (let i = 0; i < bits.length; i += 4) {
    bitGroups.push(bits.slice(i, i + 4));
  }

  return (
    <div className="flex items-center group">
      <div
        className={cn(
          "w-24 text-[11px] font-bold px-3 py-2 rounded-l-md border-y border-l transition-all shrink-0 uppercase tracking-tighter",
          isResult
            ? "bg-slate-900 text-white border-slate-900"
            : bgColorMap[color],
          currentStep !== -1 && !isResult && "opacity-60",
        )}
      >
        {label}
      </div>
      <div className="flex-1 flex justify-end gap-4 p-2 bg-white/50 border-y border-r rounded-r-md min-h-[52px] items-center pr-10 shadow-inner">
        <div className="flex gap-4">
          {bitGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex gap-1">
              {group.map((bit, i) => {
                const bitIdx = bitMode - 1 - (groupIdx * 4 + i);
                const isActive = currentStep === bitIdx;
                const isProcessed = currentStep >= bitIdx;
                const shouldShowResultBit = !isResult || isProcessed;

                return (
                  <div
                    key={i}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center font-mono font-bold rounded-sm border shadow-sm transition-all duration-300 relative",
                      bit === 1 && shouldShowResultBit
                        ? colorMap[color]
                        : "bg-white text-slate-200 border-slate-100",
                      isActive &&
                        "ring-2 ring-blue-500 ring-offset-2 z-10 scale-110 shadow-lg text-white",
                      isActive &&
                        bit === 0 &&
                        "bg-blue-100 text-blue-600 border-blue-300",
                      isResult && !shouldShowResultBit && "opacity-0 scale-75",
                      isResult &&
                        isProcessed &&
                        "animate-in zoom-in-50 duration-300",
                    )}
                  >
                    {shouldShowResultBit ? bit : ""}
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-blue-400 rounded-sm animate-ping opacity-20" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-1 hover:border-blue-200 transition-all hover:shadow-md">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        {label}
      </p>
      <p className="text-lg font-mono font-bold text-slate-800 break-all">
        {value}
      </p>
    </div>
  );
}
