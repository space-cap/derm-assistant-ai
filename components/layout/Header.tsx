'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <span className="text-2xl">🏥</span>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-primary">Derm Assistant</span>
                            <span className="text-xs text-gray-500">피부과 온보딩 플랫폼</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                        isActive
                                            ? 'bg-primary text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    )}
                                >
                                    <span className="mr-1">{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="메뉴 열기"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top">
                        <div className="flex flex-col space-y-2">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            'px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                                            isActive
                                                ? 'bg-primary text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        )}
                                    >
                                        <span className="mr-2">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};
