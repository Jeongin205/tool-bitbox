"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyInput } from "@/components/copy-input";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorValuesSectionProps {
  color: string;
  rgb: { r: number; g: number; b: number };
  error: string | null;
  onHexChange: (value: string) => void;
  onRgbChange: (channel: "r" | "g" | "b", value: string) => void;
}

export function ColorValuesSection({
  color,
  rgb,
  error,
  onHexChange,
  onRgbChange,
}: ColorValuesSectionProps) {
  return (
    <Card className="border-slate-200 shadow-sm transition-all">
      <CardHeader className="pb-4 border-b ">
        <CardTitle className="text-lg">Color Values</CardTitle>
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
            onValueChange={onHexChange}
            className="bg-white hover:border-slate-400 focus:bg-white transition-all"
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
                onChange={(e) => onRgbChange("r", e.target.value)}
                className={cn(
                  "pl-8 bg-white transition-all hover:border-slate-400 focus:bg-white",
                  error && "border-red-500 focus-visible:ring-red-500 bg-red-50"
                )}
              />
              <span
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors",
                  error ? "text-red-600" : "text-red-500"
                )}
              >
                R
              </span>
            </div>
          </div>

          {/* GREEN Input */}
          <div className="space-y-1.5">
            <Label htmlFor="green-input" className="text-xs text-slate-500">
              Green (G)
            </Label>
            <div className="relative">
              <Input
                id="green-input"
                type="number"
                min={0}
                max={255}
                value={rgb.g}
                onChange={(e) => onRgbChange("g", e.target.value)}
                className={cn(
                  "pl-8 bg-white transition-all hover:border-slate-400 focus:bg-white",
                  error && "border-red-500 focus-visible:ring-red-500 bg-red-50"
                )}
              />
              <span
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors",
                  error ? "text-red-600" : "text-green-500"
                )}
              >
                G
              </span>
            </div>
          </div>

          {/* BLUE Input */}
          <div className="space-y-1.5">
            <Label htmlFor="blue-input" className="text-xs text-slate-500">
              Blue (B)
            </Label>
            <div className="relative">
              <Input
                id="blue-input"
                type="number"
                min={0}
                max={255}
                value={rgb.b}
                onChange={(e) => onRgbChange("b", e.target.value)}
                className={cn(
                  "pl-8 bg-white transition-all hover:border-slate-400 focus:bg-white",
                  error && "border-red-500 focus-visible:ring-red-500 bg-red-50"
                )}
              />
              <span
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors",
                  error ? "text-red-600" : "text-blue-500"
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
  );
}
