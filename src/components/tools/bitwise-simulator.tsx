"use client";

import React, { useState, useMemo } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Info, HelpCircle } from "lucide-react";

type BitMode = 8 | 16 | 32;
type Operator = "&" | "|" | "^" | "~" | "<<" | ">>";

export function BitwiseSimulator() {
  const [numA, setNumA] = useState<string>("5");
  const [numB, setNumB] = useState<string>("3");
  const [operator, setOperator] = useState<Operator>("&");
  const [bitMode, setBitMode] = useState<BitMode>(8);

  // 입력을 숫자로 변환
  const valA = useMemo(() => {
    const parsed = parseInt(numA || "0");
    return isNaN(parsed) ? 0 : parsed & (Math.pow(2, bitMode) - 1);
  }, [numA, bitMode]);

  const valB = useMemo(() => {
    const parsed = parseInt(numB || "0");
    return isNaN(parsed) ? 0 : parsed & (Math.pow(2, bitMode) - 1);
  }, [numB, bitMode]);

  // 연산 결과 계산
  const result = useMemo(() => {
    let res = 0;
    const mask = (1 << bitMode) - 1;

    switch (operator) {
      case "&": res = valA & valB; break;
      case "|": res = valA | valB; break;
      case "^": res = valA ^ valB; break;
      case "~": res = ~valA; break;
      case "<<": res = valA << (valB % bitMode); break;
      case ">>": res = valA >> (valB % bitMode); break;
    }
    
    // 비트 모드에 맞게 마스킹 (부호 있는 비트 처리 주의)
    return res & (bitMode === 32 ? 0xFFFFFFFF : (1 << bitMode) - 1);
  }, [valA, valB, operator, bitMode]);

  // 비트 배열 생성 (MSB -> LSB 순서)
  const getBits = (val: number, bits: number) => {
    return val.toString(2).padStart(bits, "0").slice(-bits).split("").map(Number);
  };

  const bitsA = getBits(valA, bitMode);
  const bitsB = getBits(valB, bitMode);
  const bitsResult = getBits(result, bitMode);

  return (
    <div className="space-y-8">
      {/* 1. 설정 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8 border-slate-200 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg">연산 설정</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="num-a">Value A (Decimal)</Label>
                  <Input 
                    id="num-a" 
                    type="number" 
                    value={numA} 
                    onChange={(e) => setNumA(e.target.value)}
                    className="font-mono"
                  />
                </div>
                {operator !== "~" && (
                  <div className="space-y-2">
                    <Label htmlFor="num-b">
                      {operator === "<<" || operator === ">>" ? "Shift Amount" : "Value B (Decimal)"}
                    </Label>
                    <Input 
                      id="num-b" 
                      type="number" 
                      value={numB} 
                      onChange={(e) => setNumB(e.target.value)}
                      className="font-mono"
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
                        "h-12 text-lg font-bold",
                        operator === op ? "bg-blue-600 hover:bg-blue-700" : ""
                      )}
                      onClick={() => setOperator(op as Operator)}
                    >
                      {op}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4 border-slate-200 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg">비트 모드</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={bitMode.toString()} onValueChange={(v) => setBitMode(parseInt(v) as BitMode)}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="8">8-bit</TabsTrigger>
                <TabsTrigger value="16">16-bit</TabsTrigger>
                <TabsTrigger value="32">32-bit</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <Info className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <p>
                  {bitMode === 8 && "8비트 모드 (0 ~ 255)"}
                  {bitMode === 16 && "16비트 모드 (0 ~ 65,535)"}
                  {bitMode === 32 && "32비트 모드 (0 ~ 4,294,967,295)"}
                  <br />
                  범위를 초과하는 입력값은 자동으로 마스킹 처리됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. 비트 시각화 영역 */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-lg">비트 시각화 시뮬레이션</CardTitle>
          <CardDescription>각 비트 단위로 연산이 이루어지는 과정을 확인하세요.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto p-8">
            <div className="min-w-[600px] space-y-1">
              {/* Bit Index Header */}
              <div className="flex justify-end mb-4 pr-12">
                <div className="grid grid-flow-col auto-cols-[32px] gap-1">
                  {Array.from({ length: bitMode }).map((_, i) => (
                    <div key={i} className="text-[10px] text-center font-mono text-slate-400">
                      {bitMode - 1 - i}
                    </div>
                  ))}
                </div>
              </div>

              {/* Operand A */}
              <BitRow label="Value A" bits={bitsA} color="blue" />
              
              {/* Operator & Operand B */}
              {operator !== "~" ? (
                <>
                  <div className="flex items-center justify-between py-1 pr-12">
                    <div className="text-sm font-bold text-slate-400 pl-4">{operator}</div>
                    <div className="h-px bg-slate-100 flex-1 mx-4" />
                  </div>
                  <BitRow label="Value B" bits={bitsB} color="emerald" />
                </>
              ) : (
                <div className="flex items-center justify-between py-4 pr-12">
                  <div className="text-sm font-bold text-slate-400 pl-4">NOT (~)</div>
                  <div className="h-px bg-slate-100 flex-1 mx-4" />
                </div>
              )}

              {/* Result Line */}
              <div className="flex items-center pr-12 pt-2 pb-4">
                <div className="h-0.5 bg-slate-900 w-full ml-24" />
              </div>

              {/* Result */}
              <BitRow label="Result" bits={bitsResult} color="rose" isResult />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. 최종 결과 수치 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultBox label="Decimal" value={result.toString()} />
        <ResultBox label="Hexadecimal" value={`0x${result.toString(16).toUpperCase()}`} />
        <ResultBox label="Binary" value={`${result.toString(2).padStart(bitMode, "0")}`} />
      </div>
    </div>
  );
}

// 비트 행 컴포넌트
function BitRow({ 
  label, 
  bits, 
  color, 
  isResult = false 
}: { 
  label: string; 
  bits: number[]; 
  color: "blue" | "emerald" | "rose";
  isResult?: boolean;
}) {
  const colorMap = {
    blue: "bg-blue-600 text-white",
    emerald: "bg-emerald-600 text-white",
    rose: "bg-rose-600 text-white",
  };

  const bgColorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="flex items-center group">
      <div className={cn(
        "w-24 text-sm font-bold px-3 py-1.5 rounded-l-md border-y border-l transition-colors shrink-0",
        isResult ? "bg-slate-900 text-white border-slate-900" : bgColorMap[color]
      )}>
        {label}
      </div>
      <div className="flex-1 flex justify-end gap-1 p-2 bg-slate-50/50 border-y border-r rounded-r-md min-h-[50px] items-center pr-10">
        <div className="grid grid-flow-col auto-cols-[32px] gap-1">
          {bits.map((bit, i) => (
            <div
              key={i}
              className={cn(
                "h-8 flex items-center justify-center font-mono font-bold rounded-sm transition-all duration-200 border shadow-sm",
                bit === 1 ? colorMap[color] : "bg-white text-slate-300 border-slate-200"
              )}
            >
              {bit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 결과 박스 컴포넌트
function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-1">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-xl font-mono font-bold text-slate-800 break-all">{value}</p>
    </div>
  );
}
