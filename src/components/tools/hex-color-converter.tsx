"use client";

import { useState, useMemo, useCallback } from "react";
import { ColorPickerSection } from "./hex-color-converter/color-picker-section";
import { ColorValuesSection } from "./hex-color-converter/color-values-section";
import { ContrastRatioSection } from "./hex-color-converter/contrast-ratio-section";
import { hexToRgb, rgbToHex, getContrastRatio } from "@/lib/color-utils";

export function HexColorConverter() {
  const [color, setColor] = useState<string>("#3b82f6");
  const [textColor, setTextColor] = useState<"white" | "black">("white");
  const [hexError, setHexError] = useState<string | null>(null);
  const [rgbError, setRgbError] = useState<string | null>(null);

  const rgb = useMemo(() => hexToRgb(color), [color]);

  const handleColorChange = useCallback((newHex: string) => {
    setColor(newHex);
    setHexError(null);
    setRgbError(null);
  }, []);

  const handleHexInputChange = useCallback((value: string) => {
    const hex = value.startsWith("#") ? value : `#${value}`;

    // HEX Code validation (Length and valid hex characters)
    if (hex.length > 7) {
      setHexError("HEX 코드는 최대 6자리입니다.");
      setRgbError(null);
      setTimeout(() => setHexError(null), 2000);
      return;
    }

    const hexPattern = /^#([A-Fa-f0-9]*)$/;
    if (!hexPattern.test(hex)) {
      setHexError("HEX 코드는 0-9, A-F 사이의 문자여야 합니다.");
      setRgbError(null);
      setTimeout(() => setHexError(null), 2000);
      return;
    }

    setColor(hex);
    setHexError(null);
    setRgbError(null);
  }, []);

  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    if (value === "") return;
    const num = parseInt(value);
    if (isNaN(num)) return;

    if (num < 0 || num > 255) {
      setRgbError("RGB 값은 0 ~ 255 사이의 숫자여야 합니다.");
      setHexError(null);
      setTimeout(() => setRgbError(null), 2000);
      return;
    }

    setRgbError(null);
    setHexError(null);
    const newRgb = { ...rgb, [channel]: num };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setColor(newHex);
  };

  const contrastRatio = useMemo(() => {
    const targetTextColor = textColor === "white" ? "#FFFFFF" : "#000000";
    return getContrastRatio(color, targetTextColor);
  }, [color, textColor]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* [1] Color Values (Mobile: 1st, Desktop: Right Top) */}
      <div className="order-1 lg:order-2 lg:col-span-7 font-mono">
        <ColorValuesSection
          color={color}
          rgb={rgb}
          hexError={hexError}
          rgbError={rgbError}
          onHexChange={handleHexInputChange}
          onRgbChange={handleRgbChange}
        />
      </div>

      {/* [2] Color Picker (Mobile: 2nd, Desktop: Left Side) */}
      <div className="order-2 lg:order-1 lg:col-span-5 lg:row-span-2 space-y-6">
        <ColorPickerSection
          color={color}
          textColor={textColor}
          onColorChange={handleColorChange}
          onTextColorChange={setTextColor}
        />
      </div>

      {/* [3] Contrast Ratio (Mobile: 3rd, Desktop: Right Bottom) */}
      <div className="order-3 lg:order-3 lg:col-span-7">
        <ContrastRatioSection contrastRatio={contrastRatio} />
      </div>
    </div>
  );
}
