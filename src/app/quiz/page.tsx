import { Metadata } from "next";
import { QuizContainer } from "@/components/quiz/quiz-container";

export const metadata: Metadata = {
  title: "BitBox Challenge - 컴퓨터 공학 1학년 진법 변환 시험 대비 퀴즈",
  description: "2진수, 16진수, 2의 보수 변환 문제를 풀며 컴퓨터 구조 및 시스템 프로그래밍 시험 실력을 테스트하고 개념을 학습하세요.",
};

export default function QuizPage() {
  return <QuizContainer />;
}
