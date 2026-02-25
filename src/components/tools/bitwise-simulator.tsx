"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolHeader } from "@/components/tools/tool-header";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  MessageSquare,
  MoveRight,
  MoveLeft,
  AlertCircle,
  Binary,
  Copy,
} from "lucide-react";

type BitMode = 4 | 8 | 16;
type Operator = "&" | "|" | "^" | "~" | "<<" | ">>";

export function BitwiseSimulator() {
  const [numA, setNumA] = useState<string>("5");
  const [numB, setNumB] = useState<string>("2");
  const [operator, setOperator] = useState<Operator>("<<");
  const [bitMode, setBitMode] = useState<BitMode>(8);

  // 시뮬레이션 상태
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);

  const isShift = operator === "<<" || operator === ">>";

  // 입력값에 따른 비트 모드 자동 조절
  useEffect(() => {
    if (isManualMode) return; // 수동 모드(탭 클릭 이후)라면 절대 개입하지 않음

    const vA = Math.abs(parseInt(numA) || 0);
    const vB = operator === "~" || isShift ? 0 : Math.abs(parseInt(numB) || 0);
    const maxV = Math.max(vA, vB);

    let nextMode: BitMode = 4;
    if (maxV > 255) nextMode = 16;
    else if (maxV > 15) nextMode = 8;

    if (nextMode !== bitMode) {
      setBitMode(nextMode);
      setCurrentStep(-1);
      setIsAutoPlaying(false);
    }
  }, [numA, numB, operator, isShift, bitMode, isManualMode]);

  const mask = useMemo(() => (1 << bitMode) - 1, [bitMode]);
  const maxVal = useMemo(() => Math.pow(2, bitMode) - 1, [bitMode]);
  const shiftAmt = useMemo(
    () => (parseInt(numB) || 0) % bitMode,
    [numB, bitMode],
  );

  // 입력값 파싱 및 범위 체크
  const rawValA = parseInt(numA || "0");
  const rawValB = parseInt(numB || "0");

  const isOverRangeA = !isNaN(rawValA) && (rawValA > maxVal || rawValA < 0);
  const isOverRangeB =
    !isNaN(rawValB) &&
    operator !== "<<" &&
    operator !== ">>" &&
    (rawValB > maxVal || rawValB < 0);

  const valA = useMemo(
    () => (isNaN(rawValA) ? 0 : rawValA & mask),
    [rawValA, mask],
  );
  const valB = useMemo(
    () => (isNaN(rawValB) ? 0 : rawValB & mask),
    [rawValB, mask],
  );

  // 연산 결과
  const result = useMemo(() => {
    let res = 0;
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
  }, [valA, valB, shiftAmt, operator, mask]);

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

  const handleReset = useCallback(() => {
    setCurrentStep(-1);
    setIsAutoPlaying(false);
  }, []);

  const handleFullReset = useCallback(() => {
    setNumA("5");
    setNumB("2");
    setOperator("<<");
    setBitMode(8);
    setIsManualMode(false);
    handleReset();
  }, [handleReset]);

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
    return () => timer && clearInterval(timer);
  }, [isAutoPlaying, bitMode]);

  const stepMessage = useMemo(() => {
    if (currentStep === -1) {
      if (isOverRangeA || isOverRangeB)
        return "입력값이 범위를 초과하여 하위 비트만 마스킹되었습니다. 시뮬레이션을 시작해 과정을 확인하세요.";
      return "시뮬레이션 시작 버튼을 눌러 과정을 확인하세요.";
    }

    const bitIdx = currentStep;
    const arrayIdx = bitMode - 1 - bitIdx;
    const bA = bitsA[arrayIdx];
    const bR = bitsResult[arrayIdx];

    if (operator === "<<") {
      const sourceIdx = bitIdx - shiftAmt;
      if (sourceIdx < 0)
        return `${bitIdx}번 비트는 오른쪽에서 들어온 0으로 채워집니다.`;
      return `A의 ${sourceIdx}번 비트(${bitsA[bitMode - 1 - sourceIdx]})가 왼쪽으로 ${shiftAmt}칸 이동하여 ${bitIdx}번 자리에 위치합니다.`;
    }
    if (operator === ">>") {
      const sourceIdx = bitIdx + shiftAmt;
      if (sourceIdx >= bitMode)
        return `${bitIdx}번 비트는 왼쪽에서 들어온 0으로 채워집니다.`;
      return `A의 ${sourceIdx}번 비트(${bitsA[bitMode - 1 - sourceIdx]})가 오른쪽으로 ${shiftAmt}칸 이동하여 ${bitIdx}번 자리에 위치합니다.`;
    }
    if (operator === "~") return `${bitIdx}번 비트 반전: ~${bA} = ${bR}`;

    return `${bitIdx}번 비트 연산: ${bA} ${operator} ${bitsB[arrayIdx]} = ${bR}`;
  }, [
    currentStep,
    bitsA,
    bitsB,
    bitsResult,
    operator,
    bitMode,
    shiftAmt,
    isOverRangeA,
    isOverRangeB,
  ]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 border-slate-200 shadow-sm overflow-hidden">
          <ToolHeader
            title="연산 설정 및 제어"
            icon={Binary}
            onReset={handleFullReset}
          />
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="num-a">Value A (10진수)</Label>
                    {isOverRangeA && (
                      <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 animate-pulse">
                        <AlertCircle size={10} /> {bitMode}비트 마스킹됨 (실제:{" "}
                        {valA})
                      </span>
                    )}
                  </div>
                  <Input
                    id="num-a"
                    type="number"
                    value={numA}
                    onChange={(e) => {
                      setNumA(e.target.value);
                      setIsManualMode(false); // 입력 시 다시 자동 모드로 전환
                      handleReset();
                    }}
                    className={cn(
                      "font-mono h-11 transition-colors",
                      isOverRangeA && "border-amber-200 bg-amber-50/50",
                    )}
                  />
                </div>
                {operator !== "~" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="num-b">
                        {isShift ? "Shift Amount" : "Value B (10진수)"}
                      </Label>
                      {isOverRangeB && (
                        <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 animate-pulse">
                          <AlertCircle size={10} /> {bitMode}비트 마스킹됨
                          (실제: {valB})
                        </span>
                      )}
                    </div>
                    <Input
                      id="num-b"
                      type="number"
                      value={numB}
                      onChange={(e) => {
                        setNumB(e.target.value);
                        setIsManualMode(false); // 입력 시 다시 자동 모드로 전환
                        handleReset();
                      }}
                      className={cn(
                        "font-mono h-11 transition-colors",
                        isOverRangeB && "border-amber-200 bg-amber-50/50",
                      )}
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
            <CardTitle className="text-lg">과정 설명</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs
              value={bitMode.toString()}
              onValueChange={(v) => {
                const newMode = parseInt(v) as BitMode;
                setBitMode(newMode);
                setIsManualMode(true); // 사용자가 직접 탭을 누르면 수동 모드 활성화
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
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3 shadow-sm min-h-[100px] animate-in fade-in slide-in-from-top-2">
                <MessageSquare className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 leading-relaxed font-medium">
                  {stepMessage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden bg-slate-50/30">
        <CardHeader className="bg-white border-b flex flex-row items-center justify-between py-4">
          <CardTitle className="text-lg">비트 시뮬레이션</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border rounded-full font-mono text-[10px] font-bold text-slate-600">
              {currentStep === -1
                ? "IDLE"
                : currentStep === bitMode - 1
                  ? "FINISHED"
                  : `STEP ${currentStep + 1}`}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 sm:p-8 overflow-x-auto">
            <div className="min-w-max space-y-1">
              <div className="flex justify-end mb-4 pr-2 sm:pr-10">
                <div className="flex gap-2 sm:gap-4">
                  {Array.from({ length: bitMode / 4 }).map((_, groupIdx) => (
                    <div key={groupIdx} className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => {
                        const idx = bitMode - 1 - (groupIdx * 4 + i);
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "w-7 sm:w-8 text-[10px] text-center font-mono transition-colors",
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
                operator={operator}
                shiftAmt={shiftAmt}
              />

              {!isShift && operator !== "~" && (
                <>
                  <div className="flex items-center justify-between py-1 pr-2 sm:pr-10">
                    <div className="text-sm font-bold text-slate-400 sm:pl-4 w-10 sm:w-24 shrink-0 font-mono text-center sm:text-left">
                      {operator}
                    </div>
                    <div className="h-px bg-slate-200 flex-1 mx-2 sm:mx-4" />
                  </div>
                  <BitRow
                    label="Value B"
                    bits={bitsB}
                    color="emerald"
                    currentStep={currentStep}
                    bitMode={bitMode}
                    operator={operator}
                    shiftAmt={shiftAmt}
                  />
                </>
              )}

              {isShift && (
                <div className="flex items-center py-4 pr-2 sm:pr-10 sm:pl-24">
                  <div className="flex-1 flex items-center justify-center gap-2 text-slate-400 bg-white/50 border border-dashed rounded-lg py-2">
                    {operator === "<<" ? (
                      <>
                        <MoveLeft size={16} />{" "}
                        <span className="text-xs font-bold uppercase">
                          Left Shift {shiftAmt}
                        </span>
                      </>
                    ) : (
                      <>
                        <MoveRight size={16} />{" "}
                        <span className="text-xs font-bold uppercase">
                          Right Shift {shiftAmt}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {operator === "~" && (
                <div className="flex items-center py-4 pr-2 sm:pr-10 sm:pl-24">
                  <div className="flex-1 flex items-center justify-center gap-2 text-slate-400 bg-white/50 border border-dashed rounded-lg py-2">
                    <span className="text-xs font-bold uppercase font-mono">
                      NOT (~) - Bit Inversion
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center pr-2 sm:pr-10 pt-2 pb-4">
                <div className="h-0.5 bg-slate-900 w-full sm:ml-24" />
              </div>

              <BitRow
                label="Result"
                bits={bitsResult}
                color="rose"
                isResult
                currentStep={currentStep}
                bitMode={bitMode}
                operator={operator}
                shiftAmt={shiftAmt}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultBox
          label="10진수 (Decimal)"
          value={result.toString()}
          copyLabel="10진수 결과"
        />
        <ResultBox
          label="16진수 (Hex)"
          value={`0x${result
            .toString(16)
            .toUpperCase()
            .padStart(bitMode / 4, "0")}`}
          copyLabel="16진수 결과"
        />
        <ResultBox
          label="2진수 (Binary)"
          value={bitsResult.join("")}
          copyLabel="2진수 결과"
        />
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
  operator,
  shiftAmt,
  isResult = false,
}: {
  label: string;
  bits: number[];
  color: "blue" | "emerald" | "rose";
  currentStep: number;
  bitMode: number;
  operator: Operator;
  shiftAmt: number;
  isResult?: boolean;
}) {
  const colorMap = {
    blue: "bg-blue-600 text-white border-blue-700 shadow-blue-100",
    emerald: "bg-emerald-600 text-white border-emerald-700 shadow-emerald-100",
    rose: "bg-rose-600 text-white border-rose-700 shadow-rose-100",
  };

  const bitGroups = [];
  for (let i = 0; i < bits.length; i += 4) {
    bitGroups.push(bits.slice(i, i + 4));
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center group">
      <div
        className={cn(
          "w-full sm:w-24 text-[10px] sm:text-[11px] font-bold px-3 py-1 sm:py-2 rounded-t-md sm:rounded-l-md sm:rounded-tr-none border transition-all shrink-0 uppercase tracking-tighter",
          isResult
            ? "bg-slate-900 text-white border-slate-900"
            : "bg-slate-50 text-slate-600 border-slate-200",
        )}
      >
        {label}
      </div>
      <div className="flex-1 flex justify-end gap-2 sm:gap-4 p-2 bg-white/50 border-x border-b sm:border-x-0 sm:border-y sm:border-r rounded-b-md sm:rounded-r-md sm:rounded-bl-none min-h-[44px] sm:min-h-[52px] items-center pr-2 sm:pr-10 shadow-inner">
        <div className="flex gap-2 sm:gap-4">
          {bitGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex gap-1">
              {group.map((bit, i) => {
                const bitIdx = bitMode - 1 - (groupIdx * 4 + i);
                let isActive = currentStep === bitIdx;
                if (!isResult && (operator === "<<" || operator === ">>")) {
                  const targetIdx = currentStep;
                  const sourceIdxForA =
                    operator === "<<"
                      ? targetIdx - shiftAmt
                      : targetIdx + shiftAmt;
                  isActive = bitIdx === sourceIdxForA;
                }

                const isProcessed = currentStep >= bitIdx;
                const shouldShowResultBit = !isResult || isProcessed;

                return (
                  <div
                    key={i}
                    className={cn(
                      "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono font-bold rounded-sm border shadow-sm transition-all duration-300 relative text-xs sm:text-base",
                      bit === 1 && shouldShowResultBit
                        ? colorMap[color]
                        : "bg-white text-slate-200 border-slate-100",
                      isActive &&
                        "ring-2 ring-blue-500 ring-offset-2 z-10 scale-110 shadow-lg",
                      isActive &&
                        bit === 0 &&
                        !isResult &&
                        "bg-blue-100 text-blue-600 border-blue-300",
                      isResult && !shouldShowResultBit && "opacity-0 scale-75",
                      isResult &&
                        isProcessed &&
                        cn(
                          "animate-in duration-500",
                          operator === "<<"
                            ? "slide-in-from-right-4"
                            : operator === ">>"
                              ? "slide-in-from-left-4"
                              : "zoom-in-50",
                        ),
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

function ResultBox({
  label,
  value,
  copyLabel,
}: {
  label: string;
  value: string;
  copyLabel: string;
}) {
  return (
    <div className="group relative bg-white border rounded-xl p-4 shadow-sm space-y-1 hover:border-blue-200 transition-all hover:shadow-md">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-lg font-mono font-bold text-slate-800 break-all">
          {value}
        </p>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-slate-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => {
            navigator.clipboard.writeText(value);
            import("sonner").then(({ toast }) =>
              toast.success(`${copyLabel} 복사 완료!`),
            );
          }}
        >
          <Copy className="h-3.5 w-3.5" />
          <span className="sr-only">복사</span>
        </Button>
      </div>
    </div>
  );
}
