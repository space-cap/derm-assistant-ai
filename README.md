# 🏥 Derm Assistant AI

**신입 피부과 직원을 위한 지능형 온보딩 & 업무 지원 플랫폼**

Derm Assistant AI는 피부과 신입 직원들이 복잡한 시술 수가, 주의사항, 비용 계산 등의 실무를 쉽고 빠르게 익히고 처리할 수 있도록 돕는 웹 애플리케이션입니다.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8)

---

## 📖 목차 (Table of Contents)

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [설치 및 실행 방법](#설치-및-실행-방법)
- [폴더 구조](#폴더-구조)
- [기여 방법](#기여-방법)
- [라이선스](#라이선스)

---

## ✨ 프로젝트 소개

피부과 실무에서는 수많은 시술 종류, 복잡한 가격 체계(국산/수입/리터치/패키지 등), 그리고 시술별 주의사항을 정확하게 숙지해야 합니다. 신입 직원에게는 이 방대한 정보를 단기간에 외우고 응대하는 것이 큰 부담이 됩니다.

**Derm Assistant AI**는 이러한 문제를 해결하기 위해 다음과 같은 가치를 제공합니다:

- **즉각적인 정보 접근**: 필요한 시술 정보를 검색 한 번으로 확인
- **정확한 비용 산출**: 실수 없는 패키지 할인 및 총액 계산
- **체계적인 학습**: 단계별 퀴즈를 통한 자가 학습 및 실력 점검
- **고객 응대 가이드**: 사후 관리 및 주의사항의 표준화된 안내

---

## 🚀 주요 기능

### 1. 📊 스마트 수가 조회
- 시술명, 효과, 별칭 등으로 빠른 검색
- 국산/수입 제품 가격 비교
- 시술 시간, 통증 정도, 회복 기간, 마취 방법 등 상세 정보 제공
- 카테고리(보톡스, 필러, 리프팅 등) 및 가격대별 필터링

### 2. 🧮 비용 계산기
- 장바구니 담기 기능을 통한 다중 시술 견적 산출
- **자동 패키지 할인**: 동일 시술 3회 이상 등 특정 조건 만족 시 자동 할인 적용
- 총 시술 금액 실시간 계산 및 예상 결제 금액 확인
- 즐겨찾는 조합 저장 (Local Storage 활용)

### 3. 📚 시술 가이드 & 주의사항
- 시술 전/후 필수 안내 사항 (Do's & Don'ts)
- 시기별 경과 및 관리 방법 타임라인 제공
- 응급 징후(Red Flags) 및 대처 방법 안내
- 고객 문의 응대를 위한 스크립트 가이드

### 4. 📝 학습 퀴즈 시스템
- 카테고리별/난이도별 25개 이상의 실무 퀴즈
- 정답 즉시 확인 및 상세 해설 제공
- 퀴즈 진행률 저장 및 학습 성취도 관리

---

## 🛠 기술 스택

| 분류 | 기술 | 비고 |
|------|------|------|
| **Core** | [Next.js 16](https://nextjs.org/) (App Router) | 최신 React 프레임워크 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 타입 안정성 보장 |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | 유틸리티 퍼스트 CSS |
| **State** | React Hooks (`useState`, `useReducer`) | 클라이언트 상태 관리 |
| **Icons** | [Lucide React](https://lucide.dev/) | 모던하고 가벼운 아이콘 |
| **Linting** | ESLint | 코드 품질 관리 |

---

## 📥 설치 및 실행 방법

이 프로젝트를 로컬 환경에서 실행하려면 Node.js (v18 이상)가 필요합니다.

1. **저장소 클론 (Clone)**
   ```bash
   git clone https://github.com/username/derm-assistant-ai.git
   cd derm-assistant-ai
   ```

2. **의존성 패키지 설치**
   ```bash
   npm install
   # 또는
   yarn install
   # 또는
   pnpm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저 확인**
   웹 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인합니다.

---

## 📂 폴더 구조

```
derm-assistant-ai/
├── app/                  # Next.js App Router 페이지 및 레이아웃
│   ├── calculator/       # 비용 계산기 페이지
│   ├── fees/             # 수가 조회 페이지
│   ├── guide/            # 시술 가이드 페이지
│   ├── quiz/             # 학습 퀴즈 페이지
│   ├── layout.tsx        # 전역 레이아웃
│   └── page.tsx          # 메인 홈페이지
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── ui/               # 기본 UI (Button, Card, Modal 등)
│   ├── layout/           # Header, Footer 등 레이아웃 컴포넌트
│   ├── treatment/        # 시술 관련 컴포넌트 (TreatmentCard 등)
│   ├── calculator/       # 계산기 관련 컴포넌트
│   └── quiz/             # 퀴즈 관련 컴포넌트
├── data/                 # JSON 데이터 (수가, 퀴즈, 가이드 등)
├── lib/                  # 유틸리티 함수 및 상수
├── types/                # TypeScript 타입 정의
└── public/               # 정적 파일 (이미지, 폰트 등)
```

---

## 🤝 기여 방법

이 프로젝트의 발전에 기여하고 싶으신가요? 환영합니다!

1. 이 저장소를 **Fork** 합니다.
2. 새로운 **Branch**를 생성합니다. (`git checkout -b feature/AmazingFeature`)
3. 변경 사항을 **Commit** 합니다. (`git commit -m 'Add some AmazingFeature'`)
4. Branch에 **Push** 합니다. (`git push origin feature/AmazingFeature`)
5. **Pull Request**를 요청합니다.

---

## 📝 라이선스

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.

---

Copyright © 2026 Derm Assistant AI. All Rights Reserved.
