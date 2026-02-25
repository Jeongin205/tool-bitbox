# ToolBitBox 📦

> **Developer's Smart Toolkit**
> 컴퓨터 공학 전공자와 개발자를 위한 웹 유틸리티 모음집입니다.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 🚀 Introduction

**ToolBitBox**는 복잡한 계산이나 변환 작업을 빠르고 직관적으로 처리하기 위해 만들어진 웹 도구입니다.
기존 공학용 계산기의 복잡한 UI를 개선하고, **shadcn/ui**를 활용하여 모던하고 일관된 사용자 경험(UX)을 제공합니다.

🔗 **Live Demo:** [https://bit-box.vercel.app](https://bit-box.vercel.app)

## ✨ Key Features

### 1. ⚡ 비트 연산 시뮬레이터 (Bitwise Simulator)
- **Visual Learning:** AND, OR, XOR, NOT, Shift 연산의 과정을 비트 단위 애니메이션으로 시각화하여 학습을 돕습니다.
- **Smart Auto-Adjustment:** 입력값의 범위에 따라 4/8/16비트 환경을 자동으로 추천하며, 사용자가 직접 수동 제어할 수도 있습니다.
- **Interactive Control:** 시뮬레이션 일시정지, 다음 단계 실행 기능을 통해 연산 원리를 단계별로 분석할 수 있습니다.

### 2. 🎮 BitBox Challenge (퀴즈 시스템)
- **Practice Mode:** 2진수, 10진수, 16진수 및 2의 보수 변환 문제를 풀며 실전 감각을 익힙니다.
- **Custom Difficulty:** Bit 수(4/8/16-bit)를 조절하여 난이도를 선택할 수 있습니다.
- **Instant Feedback:** 정답 여부를 실시간으로 확인하고, 최종 스코어 리포트를 통해 취약점을 파악합니다.

### 3. 🔄 통합 진법 변환기 (Radix Converter)
- **Multi-Conversion:** 하나의 입력창에 값을 넣으면 2진수, 8진수, 10진수, 16진수로 **동시에 변환**됩니다.
- **Auto Validation:** 각 진법에 맞지 않는 입력(예: 2진수에 '2' 입력)을 실시간으로 차단하고 알려줍니다.
- **Detail UX:** 진법별 고유 테마 컬러와 `0x` 접두사 처리 등 개발자 친화적인 디테일을 제공합니다.

### 4. 🧮 2의 보수 계산기 (Two's Complement)
- **Bit Depth Control:** 4비트부터 32비트까지 다양한 환경을 선택하여 계산할 수 있습니다.
- **Bidirectional:** 10진수(양수/음수)와 2의 보수 비트열 간의 **양방향 실시간 변환**을 지원합니다.
- **Range Awareness:** 선택한 비트 수에 따른 유효 범위를 실시간으로 계산하여 입력 오류를 방지합니다.

### 5. 🎨 HEX 색상 변환기 (Color Converter)
- **Visual Picking:** 슬라이더와 컬러 피커를 통해 색상을 선택하고 즉시 HEX/RGB/HSL 값을 확인합니다.
- **Contrast Check:** 배경색과 글자색 간의 대비비(Contrast Ratio)를 계산하여 웹 접근성을 체크할 수 있습니다.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui, Lucide React
- **Deployment:** Vercel

## 📂 Project Structure

```bash
src/
├── app/
│   ├── quiz/               # BitBox Challenge (퀴즈)
│   ├── tools/              # 도구 페이지 모음
│   │   ├── bitwise/        # 비트 연산 시뮬레이터
│   │   ├── radix/          # 진법 변환기
│   │   ├── color/          # HEX 색상 변환기
│   │   └── twos/           # 2의 보수 계산기
├── components/
│   ├── quiz/               # 퀴즈 엔진 및 게임 로직
│   ├── tools/              # 도구별 핵심 비즈니스 로직
│   │   ├── bitwise-simulator.tsx
│   │   ├── radix-converter.tsx
│   │   ├── twos-calculator.tsx
│   │   └── hex-color-converter.tsx
│   ├── ui/                 # shadcn UI 컴포넌트 (Radix UI 기반)
│   └── tool-page-layout.tsx # 공통 도구 페이지 프레임워크
└── lib/                    # 공통 유틸리티 함수
```
