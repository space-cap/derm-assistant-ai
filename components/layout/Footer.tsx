import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                            🏥 Derm Assistant AI
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            신입 피부과 직원을 위한 지능형 온보딩 플랫폼입니다.
                            복잡한 진료 수가와 시술 정보를 쉽게 학습하세요.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                            빠른 링크
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/fees" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    📊 수가 조회
                                </Link>
                            </li>
                            <li>
                                <Link href="/calculator" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    🧮 비용 계산기
                                </Link>
                            </li>
                            <li>
                                <Link href="/guide" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    📚 시술 가이드
                                </Link>
                            </li>
                            <li>
                                <Link href="/quiz" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    📝 학습 퀴즈
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                            문의하기
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center">
                                <span className="mr-2">📧</span>
                                <a href="mailto:support@derm-assistant.com" className="hover:text-primary transition-colors">
                                    support@derm-assistant.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📞</span>
                                <span>02-1234-5678</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">⏰</span>
                                <span>평일 09:00 - 18:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-sm text-gray-500">
                            © {currentYear} Derm Assistant AI. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <Link href="/privacy" className="hover:text-primary transition-colors">
                                개인정보처리방침
                            </Link>
                            <span>|</span>
                            <Link href="/terms" className="hover:text-primary transition-colors">
                                이용약관
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
