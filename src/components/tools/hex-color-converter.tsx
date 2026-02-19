"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CopyInput } from "@/components/copy-input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Pipette, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn의 cn 유틸리티 사용

// --- 유틸리티 함수 ---

function hexToRgb(hex: string) {
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0822;
}

function getContrastRatio(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// --- 메인 컴포넌트 ---

export function HexColorConverter() {
  const [color, setColor] = useState<string>("#3b82f6");
  const [textColor, setTextColor] = useState<"white" | "black">("white");
  const [error, setError] = useState<string | null>(null);

  // 현재 RGB 값 (렌더링 및 에러 체크용)
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const handleColorChange = useCallback((newHex: string) => {
    setColor(newHex);
    setError(null);
  }, []);

  const handleHexInputChange = useCallback((value: string) => {
    if (value.startsWith("#")) {
      setColor(value);
    } else {
      setColor(`#${value}`);
    }
    setError(null);
  }, []);

  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    // 빈 값 처리 (사용자가 지우는 중일 때)
    if (value === "") return;

    const num = parseInt(value);

    if (isNaN(num)) return;

    if (num < 0 || num > 255) {
      setError("RGB 값은 0 ~ 255 사이의 숫자여야 합니다.");
      // 2초 후 에러 메시지 자동 삭제
      setTimeout(() => setError(null), 2000);
      return;
    }

    setError(null);
    const newRgb = { ...rgb, [channel]: num };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setColor(newHex);
  };

  const contrastRatio = useMemo(() => {
    const targetTextColor = textColor === "white" ? "#FFFFFF" : "#000000";
    return getContrastRatio(color, targetTextColor);
  }, [color, textColor]);

  // 에러 상태일 때 Input에 적용할 클래스
  const getInputClass = (val: number) =>
    cn(
      "pl-8 transition-all duration-200",
      error && (val < 0 || val > 255) // 실제로는 onChange에서 막히지만 시각적 피드백을 위해 유지
        ? "border-red-500 ring-red-500 focus-visible:ring-red-500 bg-red-50 animate-shake"
        : "bg-slate-50",
    );

  return (
    <>
      {/* Shake 애니메이션 정의 (Tailwind config에 없다면 여기서 style로 주입) */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* [LEFT COLUMN] */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200 shadow-sm relative overflow-hidden">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center gap-2">
                <Pipette size={18} className="text-slate-500" />
                <CardTitle className="text-lg">Color Picker</CardTitle>
              </div>
              <CardDescription>
                색상을 시각적으로 선택하고 조정합니다.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="custom-color-picker-wrapper">
                <HexColorPicker
                  color={color}
                  onChange={handleColorChange}
                  style={{ width: "100%" }}
                />
                <div className="flex items-center gap-2 mt-4 p-1 pl-3 border rounded-md bg-slate-50 focus-within:ring-2 ring-slate-950 ring-offset-2 transition-all">
                  <span className="text-slate-400 font-mono select-none">
                    #
                  </span>
                  <HexColorInput
                    color={color}
                    onChange={handleColorChange}
                    prefixed={false}
                    className="flex h-9 w-full bg-transparent py-1 text-sm font-mono uppercase placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">Preview</p>
                <div
                  className="h-32 w-full rounded-lg border flex flex-col items-center justify-center transition-colors duration-200 relative shadow-sm overflow-hidden"
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
                  <div
                    className="z-10 text-center transition-colors"
                    style={{
                      color: textColor === "white" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <p className="text-2xl font-bold font-mono">
                      {color.toUpperCase()}
                    </p>
                    <p className="text-sm font-medium opacity-90">
                      The quick brown fox
                    </p>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm border">
                    <Tabs
                      value={textColor}
                      onValueChange={(v) =>
                        setTextColor(v as "white" | "black")
                      }
                      className="h-7"
                    >
                      <TabsList className="h-7 p-0">
                        <TabsTrigger
                          value="white"
                          className="text-[10px] h-7 px-2 data-[state=active]:bg-slate-200"
                        >
                          White
                        </TabsTrigger>
                        <TabsTrigger
                          value="black"
                          className="text-[10px] h-7 px-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                        >
                          Black
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* [RIGHT COLUMN] */}
        <div className="lg:col-span-7 space-y-6 font-mono">
          <Card className="border-slate-200 shadow-sm transition-all">
            <CardHeader className="pb-4 border-b ">
              <CardTitle className="text-lg">Color Values</CardTitle>
              {/* [수정 포인트] CardDescription을 에러 메시지 영역으로 활용 */}
              <div className="h-5 flex items-center">
                {error ? (
                  <div className="flex items-center gap-1.5 text-red-600 animate-in fade-in slide-in-from-left-1 duration-200">
                    <AlertCircle size={14} />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                ) : (
                  <CardDescription className="transition-all duration-200">
                    다양한 포맷의 색상 코드를 확인하세요.
                  </CardDescription>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-1.5">
                <Label htmlFor="hex-code" className="text-xs text-slate-500">
                  HEX Code
                </Label>
                <CopyInput
                  id="hex-code"
                  value={color.toUpperCase()}
                  onValueChange={handleHexInputChange}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* RED Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="red-input" className="text-xs text-slate-500">
                    Red (R)
                  </Label>
                  <div className="relative">
                    <Input
                      id="red-input"
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.r}
                      onChange={(e) => handleRgbChange("r", e.target.value)}
                      // 에러 시 빨간 테두리 + 흔들림 효과
                      className={cn(
                        "pl-8 bg-slate-50 transition-colors",
                        error &&
                          "border-red-500 focus-visible:ring-red-500 bg-red-50",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors",
                        error ? "text-red-600" : "text-red-500",
                      )}
                    >
                      R
                    </span>
                  </div>
                </div>

                {/* GREEN Input */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="green-input"
                    className="text-xs text-slate-500"
                  >
                    Green (G)
                  </Label>
                  <div className="relative">
                    <Input
                      id="green-input"
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.g}
                      onChange={(e) => handleRgbChange("g", e.target.value)}
                      className={cn(
                        "pl-8 bg-slate-50 transition-colors",
                        error &&
                          "border-red-500 focus-visible:ring-red-500 bg-red-50",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors",
                        error ? "text-red-600" : "text-green-500",
                      )}
                    >
                      G
                    </span>
                  </div>
                </div>

                {/* BLUE Input */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="blue-input"
                    className="text-xs text-slate-500"
                  >
                    Blue (B)
                  </Label>
                  <div className="relative">
                    <Input
                      id="blue-input"
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.b}
                      onChange={(e) => handleRgbChange("b", e.target.value)}
                      className={cn(
                        "pl-8 bg-slate-50 transition-colors",
                        error &&
                          "border-red-500 focus-visible:ring-red-500 bg-red-50",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors",
                        error ? "text-red-600" : "text-blue-500",
                      )}
                    >
                      B
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="css-rgb" className="text-xs text-slate-500">
                  CSS RGB
                </Label>
                <CopyInput
                  id="css-rgb"
                  value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                />
              </div>
            </CardContent>
          </Card>

          {/* 접근성 검사 카드 */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">Contrast Ratio</CardTitle>
                <CardDescription className="font-sans">
                  배경색과 텍스트 간의 명암비를 검사합니다.
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="bg-white font-mono text-base px-3 py-1.5 flex items-center gap-2"
              >
                <span
                  className={cn(
                    "w-3 h-3 rounded-full",
                    contrastRatio >= 4.5
                      ? "bg-green-500"
                      : contrastRatio >= 3
                        ? "bg-yellow-500"
                        : "bg-red-500",
                  )}
                ></span>
                {contrastRatio.toFixed(2)} : 1
              </Badge>
            </CardHeader>

            <CardContent className="pt-0 px-0 font-sans">
              <div className="divide-y">
                <AccessibilityRow
                  label="AA Large Text"
                  sub="18pt 이상 또는 14pt 굵은 텍스트"
                  passed={contrastRatio >= 3.0}
                />
                <AccessibilityRow
                  label="AA Normal Text"
                  sub="일반 크기의 텍스트"
                  passed={contrastRatio >= 4.5}
                />
                <AccessibilityRow
                  label="AAA Large Text"
                  sub="18pt 이상 또는 14pt 굵은 텍스트 (엄격)"
                  passed={contrastRatio >= 4.5}
                />
                <AccessibilityRow
                  label="AAA Normal Text"
                  sub="일반 크기의 텍스트 (엄격)"
                  passed={contrastRatio >= 7.0}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function AccessibilityRow({
  label,
  sub,
  passed,
}: {
  label: string;
  sub: string;
  passed: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 transition-colors",
        passed
          ? "bg-white hover:bg-green-50/30"
          : "bg-red-50/30 hover:bg-red-50/50",
      )}
    >
      <div>
        <p className="font-semibold text-slate-900 flex items-center gap-2">
          {label}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
      </div>
      <div
        className={cn(
          "flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
          passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
        )}
      >
        {passed ? (
          <Check size={14} strokeWidth={3} />
        ) : (
          <X size={14} strokeWidth={3} />
        )}
        <span>{passed ? "Pass" : "Fail"}</span>
      </div>
    </div>
  );
}
