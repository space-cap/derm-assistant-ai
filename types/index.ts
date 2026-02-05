/**
 * 피부과 온보딩 플랫폼 - TypeScript 타입 정의
 */

// ============================================
// 가격 정보
// ============================================

export interface Price {
  price: number; // 가격 (원)
  product: string; // 제품명 (예: "메디톡신", "제오민")
}

export interface PriceInfo {
  domestic?: Price; // 국산 가격
  imported?: Price; // 수입 가격
}

// ============================================
// 시술 정보
// ============================================

export interface Treatment {
  id: string; // 고유 식별자 (예: "botox-forehead")
  name: string; // 시술 이름 (예: "이마 보톡스")
  category: string; // 세부 카테고리 (예: "주름 보톡스")
  prices: PriceInfo; // 가격 정보
  unit: string; // 단위 (예: "1회", "1cc", "100샷")
  description?: string; // 시술 설명
  duration?: string; // 시술 시간 (예: "5-10분")
  painLevel?: number; // 통증 정도 (1-5)
  downtime?: string; // 회복 기간 (예: "즉시 생활 가능")
  anesthesia?: string; // 마취 방법 (예: "연고 마취")
  shots?: number; // 샷 수 (리프팅 장비용)
  pricePerShot?: number; // 샷당 가격
}

// ============================================
// 카테고리
// ============================================

export interface Category {
  id: string; // 카테고리 ID (예: "botox", "filler")
  name: string; // 카테고리 이름 (예: "보톡스", "필러")
  icon?: string; // 아이콘 (이모지 또는 아이콘명)
  treatments: Treatment[]; // 해당 카테고리의 시술 목록
}

export interface FeesData {
  categories: Category[];
}

// ============================================
// 사후 관리
// ============================================

export interface TreatmentAftercareItem {
  id: string; // 시술 ID
  name: string; // 시술 이름
  precautions: string[]; // 주의사항 목록
}

export interface EmergencySign {
  symptom: string; // 증상
  cause: string; // 원인
  action: string; // 대응 방법
}

export interface AftercareData {
  commonPrecautions: string[]; // 공통 금기 사항
  treatments: TreatmentAftercareItem[]; // 시술별 주의사항
  emergencySigns: EmergencySign[]; // 응급 징후
}

// ============================================
// 퀴즈
// ============================================

export interface QuizQuestion {
  id: string; // 문제 ID
  category: string; // 카테고리 (예: "보톡스", "필러")
  question: string; // 문제 텍스트
  options: string[]; // 보기 목록
  correctAnswer: number; // 정답 인덱스 (0부터 시작)
  explanation?: string; // 해설
}

export interface QuizData {
  questions: QuizQuestion[];
}

export interface QuizResult {
  totalQuestions: number; // 전체 문제 수
  correctAnswers: number; // 맞힌 문제 수
  wrongAnswers: number[]; // 틀린 문제 인덱스 배열
  score: number; // 점수 (퍼센트)
}

// ============================================
// 비용 계산기
// ============================================

export interface CartItem {
  treatment: Treatment; // 시술 정보
  quantity: number; // 수량
  selectedType: "domestic" | "imported"; // 선택한 타입 (국산/수입)
  price: number; // 개당 가격
  totalPrice: number; // 총 가격 (수량 × 가격)
}

export interface PackageDiscount {
  id: string; // 패키지 ID
  name: string; // 패키지 이름
  items: {
    id: string; // 시술 ID
    quantity: number; // 수량
  }[];
  originalPrice: number; // 정가
  discountedPrice: number; // 할인가
  discountRate: number; // 할인율 (%)
}

export interface CartSummary {
  items: CartItem[]; // 장바구니 아이템
  subtotal: number; // 소계
  discount: number; // 할인 금액
  total: number; // 최종 금액
  appliedPackages: PackageDiscount[]; // 적용된 패키지 할인
}

// ============================================
// 즐겨찾기
// ============================================

export interface Favorite {
  treatmentId: string; // 시술 ID
  addedAt: number; // 추가된 시간 (timestamp)
}

// ============================================
// 필터 & 검색
// ============================================

export type PriceRange = "all" | "low" | "medium" | "high";
export type ProductType = "all" | "domestic" | "imported";

export interface FilterOptions {
  category?: string; // 카테고리 필터
  priceRange?: PriceRange; // 가격대 필터
  productType?: ProductType; // 국산/수입 필터
  searchQuery?: string; // 검색어
}

// ============================================
// 통증 레벨
// ============================================

export const PAIN_LEVELS = {
  1: { label: "거의 없음", emoji: "😊" },
  2: { label: "약간", emoji: "😐" },
  3: { label: "보통", emoji: "😣" },
  4: { label: "중상", emoji: "😖" },
  5: { label: "심함", emoji: "😫" },
} as const;

export type PainLevel = keyof typeof PAIN_LEVELS;
