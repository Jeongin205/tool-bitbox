"use client";

import React, { useRef, useState, useEffect } from "react";
import { Eraser, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizScratchpadProps {
  className?: string;
}

const LINE_WIDTH = 2;

export function QuizScratchpad({ className }: QuizScratchpadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000"); // 기본: 검정
  const [tool, setTool] = useState<"pen" | "eraser">("pen");

  const colorRef = useRef(color);
  const toolRef = useRef(tool);

  useEffect(() => {
    colorRef.current = color;
    toolRef.current = tool;
  }, [color, tool]);

  // 캔버스 초기화 및 리사이징 처리
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      // 컨테이너의 크기에 맞춰 캔버스 해상도 조절 (반응형)
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      // 리사이즈 후 Context 설정 초기화 방지
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = toolRef.current === "eraser" ? "#ffffff" : colorRef.current;
        ctx.lineWidth = toolRef.current === "eraser" ? 20 : LINE_WIDTH;
        ctx.globalCompositeOperation =
          toolRef.current === "eraser" ? "destination-out" : "source-over";
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // 도구/색상 변경 시 Context 업데이트
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? 20 : 2; // 지우개는 좀 더 굵게
    ctx.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over"; // 투명하게 지우기 vs 덮어쓰기
  }, [color, tool]);

  // 그리기 시작
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // 그리기 (Move)
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // 터치 스크롤 방지 (모바일에서 그릴 때 화면이 움직이면 안됨)
    // e.preventDefault()는 passive event listener 이슈가 있을 수 있어 CSS touch-action으로 처리함

    const { x, y } = getCoordinates(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // 그리기 종료
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // 전체 지우기
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // 좌표 계산 (마우스/터치 통합)
  const getCoordinates = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement,
  ) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[300px] border-2 border-dashed border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm",
        "touch-none", // 모바일에서 터치 시 스크롤 방지 (중요!)
        className,
      )}
      style={{
        // 모눈종이 패턴 배경
        backgroundImage:
          "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* 상단 툴바 */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between bg-white/90 backdrop-blur rounded-lg p-2 border shadow-sm z-10">
        <div className="flex items-center gap-2">
          {/* 펜 모드 (색상 선택) */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-md">
            <button
              onClick={() => {
                setTool("pen");
                setColor("#000000");
              }}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all",
                tool === "pen" && color === "#000000"
                  ? "border-blue-500 scale-110"
                  : "border-transparent hover:scale-105",
              )}
              style={{ backgroundColor: "#000000" }}
              aria-label="Black Pen"
            />
            <button
              onClick={() => {
                setTool("pen");
                setColor("#ef4444"); // Red-500
              }}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all",
                tool === "pen" && color === "#ef4444"
                  ? "border-blue-500 scale-110"
                  : "border-transparent hover:scale-105",
              )}
              style={{ backgroundColor: "#ef4444" }}
              aria-label="Red Pen"
            />
            <button
              onClick={() => {
                setTool("pen");
                setColor("#3b82f6"); // Blue-500
              }}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all",
                tool === "pen" && color === "#3b82f6"
                  ? "border-blue-500 scale-110"
                  : "border-transparent hover:scale-105",
              )}
              style={{ backgroundColor: "#3b82f6" }}
              aria-label="Blue Pen"
            />
          </div>

          {/* 지우개 모드 */}
          <Button
            variant={tool === "eraser" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setTool("eraser")}
            className={cn("h-8 w-8", tool === "eraser" && "bg-slate-200")}
            title="지우개"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        </div>

        {/* 전체 삭제 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCanvas}
          className="text-slate-500 hover:text-red-500 hover:bg-red-50 h-8 px-2"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-xs">전체 지우기</span>
        </Button>
      </div>

      {/* 캔버스 영역 */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
}
