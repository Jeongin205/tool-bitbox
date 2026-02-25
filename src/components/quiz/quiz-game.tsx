"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, XCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { QuizConfig } from "./quiz-setup";
import { QuizScratchpad } from "./quiz-scratchpad";
import { cn } from "@/lib/utils";

// 문제 데이터 타입
interface Question {
  id: number;
  value: number;
  fromBase: number;
  toBase: number;
  questionText: string;
  answerText: string;
}

interface QuizGameProps {
  config: QuizConfig;
  onFinish: (score: number, total: number) => void;
}

export function QuizGame({ config, onFinish }: QuizGameProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">(
    "playing",
  );
  const [score, setScore] = useState(0);
  const [showScratchpad, setShowScratchpad] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // 1. 게임 시작 시 문제 생성
  useEffect(() => {
    const newQuestions: Question[] = [];

    for (let i = 0; i < config.questionCount; i++) {
      const max = Math.pow(2, config.bitDepth);
      const rawValue = Math.floor(Math.random() * max);

      const fromBase =
        config.selectedBases[
          Math.floor(Math.random() * config.selectedBases.length)
        ];
      let toBase =
        config.selectedBases[
          Math.floor(Math.random() * config.selectedBases.length)
        ];

      while (fromBase === toBase) {
        toBase =
          config.selectedBases[
            Math.floor(Math.random() * config.selectedBases.length)
          ];
      }

      const formatValue = (
        val: number,
        base: number,
        isSigned: boolean,
        bits: number,
      ) => {
        if (base === 10 && isSigned) {
          const msb = 1 << (bits - 1);
          if ((val & msb) === msb) {
            return String(val - (1 << bits));
          }
        }

        let str = val.toString(base).toUpperCase();
        if (base === 2) str = str.padStart(bits, "0");
        if (base === 16 && bits === 8) str = str.padStart(2, "0");

        return str;
      };

      newQuestions.push({
        id: i,
        value: rawValue,
        fromBase,
        toBase,
        questionText: formatValue(
          rawValue,
          fromBase,
          config.mode === "signed",
          config.bitDepth,
        ),
        answerText: formatValue(
          rawValue,
          toBase,
          config.mode === "signed",
          config.bitDepth,
        ),
      });
    }

    setQuestions(newQuestions);
  }, [config]);

  const currentQuestion = questions[currentIndex];

  // 다음 문제로 이동
  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      onFinish(score, config.questionCount);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer("");
      setStatus("playing");
      setShowScratchpad(false);
      // 포커스는 key가 바뀌면서 autoFocus가 다시 작동하므로 여기서 강제할 필요가 줄어들지만, 안전하게 유지
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // 정답 제출 및 엔터키 처리
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    // 이미 결과가 나온 상태(정답/오답)에서 엔터를 치면 '다음 문제'로 이동
    if (status !== "playing") {
      handleNext();
      return;
    }

    if (!currentQuestion) return;

    if (userAnswer.trim().toUpperCase() === currentQuestion.answerText) {
      setStatus("correct");
      setScore((prev) => prev + 1);
    } else {
      setStatus("wrong");
    }
  };

  if (questions.length === 0)
    return <div className="p-10 text-center">문제 생성 중...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 1. 상단 정보 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-slate-500">
          <span>
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span>Score: {score}</span>
        </div>
        <Progress
          value={(currentIndex / questions.length) * 100}
          className="h-2"
        />
      </div>

      {/* 2. 문제 카드 (key를 추가하여 문제 변경 시 확실하게 리렌더링) */}
      <div
        key={currentQuestion.id}
        className="bg-white border rounded-2xl p-8 shadow-sm text-center space-y-6 relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300"
      >
        {/* 문제 텍스트 */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-2">
            {currentQuestion.fromBase}진수 → {currentQuestion.toBase}진수 변환
          </span>
          <div className="text-5xl font-mono font-bold tracking-wider text-slate-800">
            {currentQuestion.questionText}
            <sub className="text-lg text-slate-400 ml-2">
              ({currentQuestion.fromBase})
            </sub>
          </div>
        </div>

        {/* 정답 입력 폼 */}
        <div className="space-y-3">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 max-w-md mx-auto relative"
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder={
                currentQuestion.toBase === 2 
                  ? "0".padStart(config.bitDepth, "0") 
                  : currentQuestion.toBase === 16 && config.bitDepth === 8
                  ? "00"
                  : `${currentQuestion.toBase}진수 값 입력...`
              }
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={status !== "playing"}
              className={cn(
                "h-14 text-lg font-mono text-center border-2 transition-all",
                status === "playing" &&
                  "focus-visible:ring-blue-500 focus-visible:border-blue-500",
                status === "correct" &&
                  "border-green-500 bg-green-50 text-green-700",
                status === "wrong" && "border-red-500 bg-red-50 text-red-700",
              )}
              autoFocus
              autoComplete="off"
            />

            {/* 제출/다음 버튼 */}
            {status === "playing" ? (
              <Button type="submit" size="lg" className="h-14 px-6">
                제출
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                size="lg"
                className={cn(
                  "h-14 px-6 animate-in fade-in",
                  status === "correct"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-slate-900",
                )}
              >
                {currentIndex + 1 === questions.length ? "결과" : "다음"}{" "}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </form>

          {/* 자릿수 안내 메시지 */}
          {status === "playing" && (
            <p className="text-xs text-slate-400 animate-pulse">
              {currentQuestion.toBase === 2 && (
                <span>2진수는 <strong>{config.bitDepth}자리</strong>를 모두 채워주세요. (예: {"0".padStart(config.bitDepth, "0")})</span>
              )}
              {currentQuestion.toBase === 16 && config.bitDepth === 8 && (
                <span>16진수는 <strong>2자리</strong>를 채워주세요. (예: 00)</span>
              )}
            </p>
          )}
        </div>

        {/* 정답/오답 피드백 메시지 */}
        {status !== "playing" && (
          <div
            className={cn(
              "p-4 rounded-lg flex items-center justify-center gap-2 animate-in zoom-in-95 duration-200",
              status === "correct"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800",
            )}
          >
            {status === "correct" ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold">정답입니다!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                <span>
                  아쉽네요. 정답은{" "}
                  <span className="font-bold font-mono text-lg mx-1">
                    {currentQuestion.answerText}
                  </span>{" "}
                  입니다.
                </span>
              </>
            )}
          </div>
        )}

        {/* 연습장 토글 버튼 */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowScratchpad(!showScratchpad)}
            className="text-sm text-slate-400 flex items-center justify-center gap-1 mx-auto hover:text-blue-600 transition-colors"
          >
            <Pencil className="w-3 h-3" />
            {showScratchpad ? "연습장 닫기" : "연습장 펴기"}
          </button>
        </div>
      </div>

      {/* 3. 연습장 영역 */}
      {showScratchpad && (
        <div className="animate-in slide-in-from-bottom-4 duration-300">
          <QuizScratchpad />
          <p className="text-center text-xs text-slate-400 mt-2">
            * 이곳에 자유롭게 계산하세요. (정답 제출 시 초기화되지 않습니다)
          </p>
        </div>
      )}
    </div>
  );
}
