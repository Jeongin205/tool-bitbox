"use client";

import { useState, useMemo, useCallback } from "react";
// [변경] react-colorful 라이브러리 import
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
import { Check, X, Pipette } from "lucide-react";

// --- 유틸리티 함수 ---

function hexToRgb(hex: string) {
  // # 기호 제거 후 계산
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  // 단축 HEX 코드 처리 (예: #FFF -> #FFFFFF)
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
    : { r: 0, g: 0, b: 0 }; // 기본값 반환
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
  // react-colorful은 HEX string을 기본 state로 사용합니다.
  const [color, setColor] = useState<string>("#3b82f6"); // Tailwind Blue-500
  const [textColor, setTextColor] = useState<"white" | "black">("white");

  // RGB 값은 color state에서 파생되도록 수정 (불필요한 state 동기화 제거)
  const rgb = useMemo(() => hexToRgb(color), [color]);

  // 색상 변경 핸들러 (Picker용 - react-colorful은 hex 문자열을 바로 줍니다)
  const handleColorChange = useCallback((newHex: string) => {
    setColor(newHex);
  }, []);

  // Hex 입력 핸들러 (CopyInput용 - # 붙여서 처리)
  const handleHexInputChange = useCallback((value: string) => {
    // 입력값이 유효한 HEX인지 체크하는 로직이 추가되면 좋음.
    // react-colorful의 HexColorInput은 내부적으로 이를 처리함.
    if (value.startsWith("#")) {
      setColor(value);
    } else {
      setColor(`#${value}`);
    }
  }, []);

  // 명암비 계산
  const contrastRatio = useMemo(() => {
    const targetTextColor = textColor === "white" ? "#FFFFFF" : "#000000";
    return getContrastRatio(color, targetTextColor);
  }, [color, textColor]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* [LEFT COLUMN] Visual Zone: 피커 및 미리보기 */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border-slate-200 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Color Picker</CardTitle>
            </div>
            <CardDescription>
              색상을 시각적으로 선택하고 조정합니다.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* [변경] 새로운 Color Picker 영역 */}
            <div className="custom-color-picker-wrapper">
              {/* react-colorful 컴포넌트. 
                    커스텀 CSS(globals.css)가 적용되어 스타일이 변경됩니다.
                */}
              <HexColorPicker color={color} onChange={handleColorChange} />

              {/* 피커 하단 HEX 입력 필드 (동기화됨) */}
              <div className="flex items-center gap-2 mt-4 p-1 pl-3 border rounded-md bg-slate-50 focus-within:ring-2 ring-slate-950 ring-offset-2 transition-all">
                <span className="text-slate-400 font-mono select-none">#</span>
                {/* shadcn Input 스타일을 적용한 Headless Input */}
                <HexColorInput
                  color={color}
                  onChange={handleColorChange}
                  prefixed={false}
                  className="flex h-9 w-full bg-transparent py-1 text-sm font-mono uppercase placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <Separator />

            {/* 대형 미리보기 박스 */}
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">Preview</p>
              <div
                className="h-32 w-full rounded-lg border flex flex-col items-center justify-center transition-colors duration-200 relative shadow-sm overflow-hidden"
                style={{ backgroundColor: color }}
              >
                {/* 배경 패턴 (투명도 확인용) */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

                {/* 미리보기 텍스트 */}
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

                {/* 텍스트 색상 토글 (미리보기 내부 우측 하단) */}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm border">
                  <Tabs
                    value={textColor}
                    onValueChange={(v) => setTextColor(v as "white" | "black")}
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

      {/* [RIGHT COLUMN] Data Zone: 값 변환 및 분석 */}
      <div className="lg:col-span-7 space-y-6 font-mono">
        {/* 1. 변환된 값 정보 */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg">Color Values</CardTitle>
            <CardDescription>
              다양한 포맷의 색상 코드를 확인하세요.
            </CardDescription>
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
              <div className="space-y-1.5">
                <Label htmlFor="red-input" className="text-xs text-slate-500">
                  Red (R)
                </Label>
                <div className="relative">
                  <Input
                    id="red-input"
                    value={rgb.r}
                    readOnly
                    className="bg-slate-50 pl-8"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-red-500 font-bold">
                    R
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="green-input" className="text-xs text-slate-500">
                  Green (G)
                </Label>
                <div className="relative">
                  <Input
                    id="green-input"
                    value={rgb.g}
                    readOnly
                    className="bg-slate-50 pl-8"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-green-500 font-bold">
                    G
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="blue-input" className="text-xs text-slate-500">
                  Blue (B)
                </Label>
                <div className="relative">
                  <Input
                    id="blue-input"
                    value={rgb.b}
                    readOnly
                    className="bg-slate-50 pl-8"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-blue-500 font-bold">
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

        {/* 2. 접근성(WCAG) 검사 */}
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
                className={`w-3 h-3 rounded-full ${contrastRatio >= 4.5 ? "bg-green-500" : contrastRatio >= 3 ? "bg-yellow-500" : "bg-red-500"}`}
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
  );
}

// --- 서브 컴포넌트 (UI 개선) ---

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
      className={`flex items-center justify-between p-4 transition-colors ${passed ? "bg-white hover:bg-green-50/30" : "bg-red-50/30 hover:bg-red-50/50"}`}
    >
      <div>
        <p className="font-semibold text-slate-900 flex items-center gap-2">
          {label}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
      </div>
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
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
