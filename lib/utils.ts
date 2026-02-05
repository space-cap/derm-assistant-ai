import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스명을 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 조합하여 조건부 클래스와 중복 제거를 동시에 처리
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * 숫자를 한국 통화 형식으로 포맷팅
 * @param price - 가격 (숫자)
 * @param format - 포맷 형식 ("short" | "long")
 * @returns 포맷팅된 문자열
 * 
 * @example
 * formatPrice(50000) // "5만원"
 * formatPrice(50000, "long") // "50,000원"
 * formatPrice(1200000) // "120만원"
 */
export function formatPrice(price: number, format: "short" | "long" = "short"): string {
    if (format === "long") {
        return `${price.toLocaleString("ko-KR")}원`;
    }

    // 만원 단위로 변환
    if (price >= 10000) {
        const manwon = price / 10000;
        // 소수점이 있으면 표시, 없으면 정수로
        return manwon % 1 === 0 ? `${manwon}만원` : `${manwon.toFixed(1)}만원`;
    }

    return `${price.toLocaleString("ko-KR")}원`;
}

/**
 * 할인율 계산
 * @param originalPrice - 정가
 * @param discountedPrice - 할인가
 * @returns 할인율 (%)
 * 
 * @example
 * calculateDiscount(120, 110) // 8.33
 */
export function calculateDiscount(
    originalPrice: number,
    discountedPrice: number
): number {
    if (originalPrice === 0) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100 * 100) / 100;
}

/**
 * 샷당 가격 계산
 * @param totalPrice - 총 가격
 * @param shots - 샷 수
 * @returns 샷당 가격
 * 
 * @example
 * calculatePricePerShot(1200000, 300) // 4000
 */
export function calculatePricePerShot(totalPrice: number, shots: number): number {
    if (shots === 0) return 0;
    return Math.round(totalPrice / shots);
}

/**
 * 통증 레벨을 별점으로 변환
 * @param level - 통증 레벨 (1-5)
 * @returns 별 문자열
 * 
 * @example
 * getPainStars(3) // "⭐⭐⭐"
 */
export function getPainStars(level: number): string {
    return "⭐".repeat(Math.min(Math.max(level, 0), 5));
}

/**
 * 가격 범위 필터링
 * @param price - 가격
 * @param range - 가격 범위
 * @returns 해당 범위에 포함되는지 여부
 */
export function matchesPriceRange(
    price: number,
    range: "all" | "low" | "medium" | "high"
): boolean {
    if (range === "all") return true;
    if (range === "low") return price < 100000; // 10만원 미만
    if (range === "medium") return price >= 100000 && price < 500000; // 10만원 ~ 50만원
    if (range === "high") return price >= 500000; // 50만원 이상
    return true;
}

/**
 * 검색어로 텍스트 필터링 (대소문자 구분 없음)
 * @param text - 검색 대상 텍스트
 * @param query - 검색어
 * @returns 일치 여부
 */
export function matchesSearchQuery(text: string, query: string): boolean {
    if (!query) return true;
    return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param timestamp - 타임스탬프
 * @returns 포맷팅된 날짜 문자열
 * 
 * @example
 * formatDate(Date.now()) // "2026년 2월 5일"
 */
export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * 배열을 섞는 함수 (Fisher-Yates 알고리즘)
 * @param array - 섞을 배열
 * @returns 섞인 새 배열
 */
export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * 점수에 따른 성적 메시지 반환
 * @param score - 점수 (0-100)
 * @returns 성적 메시지
 */
export function getScoreMessage(score: number): string {
    if (score >= 90) return "🎉 완벽해요! 시술 전문가 수준입니다!";
    if (score >= 80) return "👍 훌륭해요! 대부분의 내용을 잘 이해하고 있어요!";
    if (score >= 70) return "😊 좋아요! 조금만 더 복습하면 완벽할 거예요!";
    if (score >= 60) return "🤔 괜찮아요! 틀린 부분을 다시 확인해보세요!";
    return "💪 다시 도전해보세요! 학습 가이드를 먼저 읽어보는 것을 추천해요!";
}

/**
 * 클립보드에 텍스트 복사
 * @param text - 복사할 텍스트
 * @returns 성공 여부
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error("클립보드 복사 실패:", error);
        return false;
    }
}
