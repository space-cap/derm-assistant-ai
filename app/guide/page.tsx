'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { AfterCareGuide } from '@/components/guide/AfterCareGuide';
import { Select, SelectOption } from '@/components/ui/Select';
import aftercareData from '@/data/aftercare.json';
import { CATEGORIES } from '@/lib/constants';

const CATEGORY_OPTIONS: SelectOption[] = [
    { value: 'all', label: '전체 카테고리' },
    ...CATEGORIES.map((cat) => ({
        value: cat.id,
        label: `${cat.icon} ${cat.name}`,
    })),
];

export default function GuidePage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredGuides = aftercareData.treatments.filter(
        (guide) => selectedCategory === 'all' || guide.id === selectedCategory
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">📚 시술 가이드</h1>
                <p className="text-gray-600 mt-2">
                    시술별 사후 관리 방법과 주의사항을 확인하세요
                </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/fees">
                    <Card hover className="h-full">
                        <CardBody className="text-center space-y-2">
                            <div className="text-3xl">📊</div>
                            <p className="font-semibold text-gray-900">수가 조회</p>
                        </CardBody>
                    </Card>
                </Link>
                <Link href="/calculator">
                    <Card hover className="h-full">
                        <CardBody className="text-center space-y-2">
                            <div className="text-3xl">🧮</div>
                            <p className="font-semibold text-gray-900">비용 계산기</p>
                        </CardBody>
                    </Card>
                </Link>
                <Link href="/quiz">
                    <Card hover className="h-full">
                        <CardBody className="text-center space-y-2">
                            <div className="text-3xl">📝</div>
                            <p className="font-semibold text-gray-900">학습 퀴즈</p>
                        </CardBody>
                    </Card>
                </Link>
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                    <CardBody className="text-center space-y-2">
                        <div className="text-3xl">📚</div>
                        <p className="font-semibold text-gray-900">시술 가이드</p>
                    </CardBody>
                </Card>
            </div>

            {/* Category Filter */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{filteredGuides.length}</span>개 가이드
                </p>
                <div className="w-64">
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        options={CATEGORY_OPTIONS}
                    />
                </div>
            </div>

            {/* Guides Grid */}
            {filteredGuides.length === 0 ? (
                <Card>
                    <CardBody className="text-center py-12">
                        <p className="text-gray-500">해당 카테고리의 가이드가 없습니다.</p>
                    </CardBody>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredGuides.map((guide) => (
                        <AfterCareGuide
                            key={guide.id}
                            category={guide.name}
                            title={guide.name}
                            icon="📋"
                            dos={guide.precautions || []}
                            donts={aftercareData.common_precautions}
                            timeline={guide.red_flags ? guide.red_flags.map((flag, idx) => ({
                                period: `주의사항 ${idx + 1}`,
                                care: flag
                            })) : []}
                        />
                    ))}
                </div>
            )}

            {/* General Tips */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardBody className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">💡 일반적인 주의사항</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">시술 전</h4>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>• 충분한 수면과 휴식</li>
                                <li>• 음주 및 흡연 자제</li>
                                <li>• 혈액순환 개선제 복용 중단</li>
                                <li>• 메이크업 지우고 방문</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">시술 후</h4>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>• 충분한 수분 섭취</li>
                                <li>• 자외선 차단제 사용</li>
                                <li>• 격렬한 운동 자제</li>
                                <li>• 정기적인 관리 방문</li>
                            </ul>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
