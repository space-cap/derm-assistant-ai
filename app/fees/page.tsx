'use client';

import React, { useState, useMemo } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterPanel } from '@/components/search/FilterPanel';
import { TreatmentCard } from '@/components/treatment/TreatmentCard';
import { Select, SelectOption } from '@/components/ui/Select';
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, getPainStars, matchesSearchQuery, matchesPriceRange } from '@/lib/utils';
import feesData from '@/data/fees.json';

const SORT_OPTIONS: SelectOption[] = [
    { value: 'name-asc', label: '이름 (가나다순)' },
    { value: 'name-desc', label: '이름 (역순)' },
    { value: 'price-asc', label: '가격 (낮은순)' },
    { value: 'price-desc', label: '가격 (높은순)' },
];

export default function FeesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');
    const [selectedProductType, setSelectedProductType] = useState('all');
    const [sortBy, setSortBy] = useState('name-asc');
    const [selectedTreatment, setSelectedTreatment] = useState<any>(null);

    // Get all treatments from all categories
    const allTreatments = useMemo(() => {
        return feesData.categories.flatMap((category) =>
            category.treatments.map((treatment) => ({
                ...treatment,
                categoryName: category.name,
                categoryIcon: category.icon,
            }))
        );
    }, []);

    // Filter and sort treatments
    const filteredTreatments = useMemo(() => {
        let filtered = allTreatments;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter((treatment) => {
                const searchText = `${treatment.name} ${treatment.description || ''} ${treatment.prices?.domestic?.product || ''
                    } ${treatment.prices?.imported?.product || ''} ${treatment.prices?.single?.product || ''}`.toLowerCase();
                return searchText.includes(searchQuery.toLowerCase());
            });
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((treatment) => treatment.category === selectedCategory);
        }

        // Price range filter
        if (selectedPriceRange !== 'all') {
            filtered = filtered.filter((treatment) => {
                const price = treatment.prices?.domestic?.price || treatment.prices?.imported?.price || treatment.prices?.single?.price || 0;
                return matchesPriceRange(price, selectedPriceRange as any);
            });
        }

        // Product type filter
        if (selectedProductType !== 'all') {
            filtered = filtered.filter((treatment) => {
                if (selectedProductType === 'domestic') {
                    return treatment.prices?.domestic !== undefined;
                } else if (selectedProductType === 'imported') {
                    return treatment.prices?.imported !== undefined;
                }
                return true;
            });
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name, 'ko');
                case 'name-desc':
                    return b.name.localeCompare(a.name, 'ko');
                case 'price-asc': {
                    const priceA = a.prices?.domestic?.price || a.prices?.imported?.price || a.prices?.single?.price || 0;
                    const priceB = b.prices?.domestic?.price || b.prices?.imported?.price || b.prices?.single?.price || 0;
                    return priceA - priceB;
                }
                case 'price-desc': {
                    const priceA = a.prices?.domestic?.price || a.prices?.imported?.price || a.prices?.single?.price || 0;
                    const priceB = b.prices?.domestic?.price || b.prices?.imported?.price || b.prices?.single?.price || 0;
                    return priceB - priceA;
                }
                default:
                    return 0;
            }
        });

        return filtered;
    }, [allTreatments, searchQuery, selectedCategory, selectedPriceRange, selectedProductType, sortBy]);

    const handleResetFilters = () => {
        setSelectedCategory('all');
        setSelectedPriceRange('all');
        setSelectedProductType('all');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">📊 수가 조회</h1>
                <p className="text-gray-600 mt-2">
                    {feesData.categories.length}개 카테고리, {allTreatments.length}개 시술 정보
                </p>
            </div>

            {/* Search Bar */}
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters (Sidebar) */}
                <div className="lg:col-span-1">
                    <FilterPanel
                        selectedCategory={selectedCategory}
                        selectedPriceRange={selectedPriceRange}
                        selectedProductType={selectedProductType}
                        onCategoryChange={setSelectedCategory}
                        onPriceRangeChange={setSelectedPriceRange}
                        onProductTypeChange={setSelectedProductType}
                        onReset={handleResetFilters}
                    />
                </div>

                {/* Results */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Sort and Count */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-900">{filteredTreatments.length}</span>개 시술
                        </p>
                        <div className="w-48">
                            <Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                options={SORT_OPTIONS}
                            />
                        </div>
                    </div>

                    {/* Treatment Grid */}
                    {filteredTreatments.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">검색 결과가 없습니다.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredTreatments.map((treatment) => (
                                <TreatmentCard
                                    key={treatment.id}
                                    treatment={treatment}
                                    onClick={() => setSelectedTreatment(treatment)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Treatment Detail Modal */}
            {selectedTreatment && (
                <Modal
                    isOpen={!!selectedTreatment}
                    onClose={() => setSelectedTreatment(null)}
                    title={selectedTreatment.name}
                    size="large"
                >
                    <ModalBody className="space-y-6">
                        {/* Category Badge */}
                        <div>
                            <Badge variant="info">
                                {selectedTreatment.categoryIcon} {selectedTreatment.categoryName}
                            </Badge>
                        </div>

                        {/* Description */}
                        {selectedTreatment.description && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">시술 설명</h3>
                                <p className="text-gray-600">{selectedTreatment.description}</p>
                            </div>
                        )}

                        {/* Prices */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">가격 정보</h3>
                            <div className="space-y-3">
                                {selectedTreatment.prices?.domestic && (
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div>
                                            <Badge variant="domestic" size="small" className="mb-1">
                                                국산
                                            </Badge>
                                            <p className="text-sm text-gray-600">
                                                {selectedTreatment.prices.domestic.product}
                                            </p>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {formatPrice(selectedTreatment.prices.domestic.price)}
                                        </p>
                                    </div>
                                )}
                                {selectedTreatment.prices?.imported && (
                                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                        <div>
                                            <Badge variant="imported" size="small" className="mb-1">
                                                수입
                                            </Badge>
                                            <p className="text-sm text-gray-600">
                                                {selectedTreatment.prices.imported.product}
                                            </p>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {formatPrice(selectedTreatment.prices.imported.price)}
                                        </p>
                                    </div>
                                )}
                                {selectedTreatment.prices?.single && (
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <Badge variant="info" size="small" className="mb-1">
                                                단일가
                                            </Badge>
                                            <p className="text-sm text-gray-600">
                                                {selectedTreatment.prices.single.product}
                                            </p>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {formatPrice(selectedTreatment.prices.single.price)}
                                        </p>
                                    </div>
                                )}
                                {!selectedTreatment.prices && (
                                    <div className="text-center p-4 bg-gray-50 rounded-lg text-gray-500 italic">
                                        가격 정보가 없습니다. 데스크에 문의해주세요.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Treatment Info */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">시술 정보</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {selectedTreatment.duration && (
                                    <div>
                                        <p className="text-sm text-gray-500">시술 시간</p>
                                        <p className="font-medium text-gray-900">⏱️ {selectedTreatment.duration}</p>
                                    </div>
                                )}
                                {selectedTreatment.pain_level && (
                                    <div>
                                        <p className="text-sm text-gray-500">통증 레벨</p>
                                        <p className="font-medium text-gray-900">
                                            💉 {getPainStars(selectedTreatment.pain_level)}
                                        </p>
                                    </div>
                                )}
                                {selectedTreatment.downtime && (
                                    <div>
                                        <p className="text-sm text-gray-500">회복 기간</p>
                                        <p className="font-medium text-gray-900">🕐 {selectedTreatment.downtime}</p>
                                    </div>
                                )}
                                {selectedTreatment.anesthesia && (
                                    <div>
                                        <p className="text-sm text-gray-500">마취 방법</p>
                                        <p className="font-medium text-gray-900">💊 {selectedTreatment.anesthesia}</p>
                                    </div>
                                )}
                                {selectedTreatment.effect_start && (
                                    <div>
                                        <p className="text-sm text-gray-500">효과 시작</p>
                                        <p className="font-medium text-gray-900">✨ {selectedTreatment.effect_start}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Precautions */}
                        {selectedTreatment.precautions && selectedTreatment.precautions.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">주의사항</h3>
                                <ul className="space-y-2">
                                    {selectedTreatment.precautions.map((precaution: string, index: number) => (
                                        <li key={index} className="flex items-start text-sm text-gray-600">
                                            <span className="mr-2">⚠️</span>
                                            <span>{precaution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </ModalBody>
                </Modal>
            )}
        </div>
    );
}
