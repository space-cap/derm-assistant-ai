'use client';

import React from 'react';
import { Select, SelectOption } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { CATEGORIES, PRICE_RANGES, PRODUCT_TYPES } from '@/lib/constants';

interface FilterPanelProps {
    selectedCategory: string;
    selectedPriceRange: string;
    selectedProductType: string;
    onCategoryChange: (category: string) => void;
    onPriceRangeChange: (range: string) => void;
    onProductTypeChange: (type: string) => void;
    onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    selectedCategory,
    selectedPriceRange,
    selectedProductType,
    onCategoryChange,
    onPriceRangeChange,
    onProductTypeChange,
    onReset,
}) => {
    const categoryOptions: SelectOption[] = [
        { value: 'all', label: '전체 카테고리' },
        ...CATEGORIES.map((cat) => ({
            value: cat.id,
            label: `${cat.icon} ${cat.name}`,
        })),
    ];

    const priceRangeOptions: SelectOption[] = PRICE_RANGES.map((range) => ({
        value: range.value,
        label: range.label,
    }));

    const productTypeOptions: SelectOption[] = PRODUCT_TYPES.map((type) => ({
        value: type.value,
        label: type.label,
    }));

    const hasActiveFilters =
        selectedCategory !== 'all' ||
        selectedPriceRange !== 'all' ||
        selectedProductType !== 'all';

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">🔍 필터</h3>
                {hasActiveFilters && (
                    <button
                        onClick={onReset}
                        className="text-sm text-primary hover:underline"
                    >
                        초기화
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {/* Category Filter */}
                <Select
                    label="카테고리"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    options={categoryOptions}
                />

                {/* Price Range Filter */}
                <Select
                    label="가격 범위"
                    value={selectedPriceRange}
                    onChange={(e) => onPriceRangeChange(e.target.value)}
                    options={priceRangeOptions}
                />

                {/* Product Type Filter */}
                <Select
                    label="제품 타입"
                    value={selectedProductType}
                    onChange={(e) => onProductTypeChange(e.target.value)}
                    options={productTypeOptions}
                />
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">적용된 필터:</p>
                    <div className="flex flex-wrap gap-2">
                        {selectedCategory !== 'all' && (
                            <Badge variant="info">
                                {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                            </Badge>
                        )}
                        {selectedPriceRange !== 'all' && (
                            <Badge variant="info">
                                {PRICE_RANGES.find((r) => r.value === selectedPriceRange)?.label}
                            </Badge>
                        )}
                        {selectedProductType !== 'all' && (
                            <Badge variant="info">
                                {PRODUCT_TYPES.find((t) => t.value === selectedProductType)?.label}
                            </Badge>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
