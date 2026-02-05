/**
 * 피부과 온보딩 플랫폼 - 상수 정의
 */

// ============================================
// 카테고리 목록
// ============================================

export const CATEGORIES = [
    {
        id: "botox",
        name: "보톡스",
        icon: "💉",
        description: "주름 개선 및 윤곽 교정",
    },
    {
        id: "filler",
        name: "필러",
        icon: "💧",
        description: "볼륨 개선 및 주름 채움",
    },
    {
        id: "skinbooster",
        name: "스킨부스터",
        icon: "✨",
        description: "피부 재생 및 수분 공급",
    },
    {
        id: "lifting",
        name: "리프팅",
        icon: "📈",
        description: "피부 탄력 및 윤곽 개선",
    },
] as const;

// ============================================
// 통증 레벨
// ============================================

export const PAIN_LEVELS = {
    1: { label: "거의 없음", emoji: "😊", color: "text-green-500" },
    2: { label: "약간", emoji: "😐", color: "text-blue-500" },
    3: { label: "보통", emoji: "😣", color: "text-yellow-500" },
    4: { label: "중상", emoji: "😖", color: "text-orange-500" },
    5: { label: "심함", emoji: "😫", color: "text-red-500" },
} as const;

// ============================================
// 가격 범위
// ============================================

export const PRICE_RANGES = [
    { value: "all", label: "전체" },
    { value: "low", label: "10만원 이하" },
    { value: "medium", label: "10만원 ~ 50만원" },
    { value: "high", label: "50만원 이상" },
] as const;

// ============================================
// 제품 타입
// ============================================

export const PRODUCT_TYPES = [
    { value: "all", label: "전체" },
    { value: "domestic", label: "국산" },
    { value: "imported", label: "수입" },
] as const;

// ============================================
// 네비게이션 메뉴
// ============================================

export const NAV_ITEMS = [
    {
        href: "/",
        label: "홈",
        icon: "🏠",
    },
    {
        href: "/fees",
        label: "수가 조회",
        icon: "💰",
    },
    {
        href: "/calculator",
        label: "비용 계산기",
        icon: "🧮",
    },
    {
        href: "/guide",
        label: "시술 가이드",
        icon: "📚",
    },
    {
        href: "/quiz",
        label: "학습 퀴즈",
        icon: "📝",
    },
    {
        href: "/favorites",
        label: "즐겨찾기",
        icon: "⭐",
    },
] as const;

// ============================================
// LocalStorage 키
// ============================================

export const STORAGE_KEYS = {
    FAVORITES: "derm-assistant-favorites",
    CART: "derm-assistant-cart",
    CALCULATOR_CART: "derm-assistant-calculator-cart",
    QUIZ_PROGRESS: "derm-assistant-quiz-progress",
} as const;

// ============================================
// 색상 팔레트
// ============================================

export const COLORS = {
    primary: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
    },
    secondary: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
    },
    accent: {
        50: "#fef3c7",
        100: "#fde68a",
        200: "#fcd34d",
        300: "#fbbf24",
        400: "#f59e0b",
        500: "#d97706",
        600: "#b45309",
        700: "#92400e",
        800: "#78350f",
        900: "#451a03",
    },
} as const;

// ============================================
// 애니메이션 설정
// ============================================

export const ANIMATION = {
    DURATION: {
        fast: 150,
        normal: 300,
        slow: 500,
    },
    EASING: {
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
    },
} as const;

// ============================================
// 반응형 브레이크포인트
// ============================================

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

// ============================================
// 기본 메타데이터
// ============================================

export const SITE_CONFIG = {
    name: "Derm Assistant AI",
    description: "신입 피부과 직원을 위한 온보딩 플랫폼",
    url: "https://derm-assistant.vercel.app",
    ogImage: "/og-image.png",
    keywords: ["피부과", "온보딩", "진료 수가", "시술 가이드"],
} as const;
