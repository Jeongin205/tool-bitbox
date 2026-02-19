"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContrastRatioSectionProps {
  contrastRatio: number;
}

export function ContrastRatioSection({
  contrastRatio,
}: ContrastRatioSectionProps) {
  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden font-sans">
      <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Contrast Ratio</CardTitle>
          <CardDescription>
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
                : "bg-red-500"
            )}
          ></span>
          {contrastRatio.toFixed(2)} : 1
        </Badge>
      </CardHeader>

      <CardContent className="pt-0 font-sans">
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
        "flex items-center justify-between py-4 transition-colors",
        passed ? "bg-white hover:bg-green-50/30" : "bg-red-50/30 hover:bg-red-50/50"
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
          passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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
