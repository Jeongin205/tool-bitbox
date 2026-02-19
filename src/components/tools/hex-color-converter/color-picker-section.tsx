"use client";

import { HexColorPicker, HexColorInput } from "react-colorful";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pipette } from "lucide-react";

interface ColorPickerSectionProps {
  color: string;
  textColor: "white" | "black";
  onColorChange: (newHex: string) => void;
  onTextColorChange: (newTextColor: "white" | "black") => void;
}

export function ColorPickerSection({
  color,
  textColor,
  onColorChange,
  onTextColorChange,
}: ColorPickerSectionProps) {
  return (
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
            onChange={onColorChange}
            style={{ width: "100%" }}
          />
          <div className="flex items-center gap-2 mt-4 p-1 pl-3 border rounded-md bg-white hover:border-slate-400 focus-within:ring-2 ring-slate-950 ring-offset-2 transition-all">
            <span className="text-slate-400 font-mono select-none">#</span>
            <HexColorInput
              color={color}
              onChange={onColorChange}
              prefixed={false}
              className="flex h-9 w-full bg-transparent py-1 text-sm font-mono uppercase placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <p className="text-xs text-slate-500 font-medium">Preview</p>
          <div
            className="h-44 w-full rounded-lg border flex flex-col items-center justify-center transition-colors duration-200 relative shadow-sm overflow-hidden"
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
                  onTextColorChange(v as "white" | "black")
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
  );
}
