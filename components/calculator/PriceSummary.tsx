'use client';

import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface CartItem {
    id: string;
    name: string;
    category: string;
    price: number;
    productType: 'domestic' | 'imported';
    product: string;
    quantity: number;
}

interface PackageDiscount {
    name: string;
    items: string[];
    originalPrice: number;
    discountedPrice: number;
    discountRate: number;
}

interface PriceSummaryProps {
    items: CartItem[];
    packages: PackageDiscount[];
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({ items, packages }) => {
    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Calculate total discount
    const totalDiscount = packages.reduce(
        (sum, pkg) => sum + (pkg.originalPrice - pkg.discountedPrice),
        0
    );

    // Calculate final total
    const total = subtotal - totalDiscount;

    return (
        <Card>
            <CardHeader>
                <h3 className="text-lg font-bold text-gray-900">💰 비용 요약</h3>
            </CardHeader>
            <CardBody className="space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">소계</span>
                    <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>

                {/* Package Discounts */}
                {packages.length > 0 && (
                    <div className="pt-3 border-t border-gray-200 space-y-3">
                        <p className="text-sm font-semibold text-gray-900">🎁 적용된 패키지 할인</p>
                        {packages.map((pkg, index) => (
                            <div key={index} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">{pkg.name}</span>
                                        <Badge variant="success" size="small">
                                            {pkg.discountRate}% 할인
                                        </Badge>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">
                                        -{formatPrice(pkg.originalPrice - pkg.discountedPrice)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {pkg.items.join(', ')}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Total Discount */}
                {totalDiscount > 0 && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="text-gray-600">총 할인</span>
                        <span className="font-semibold text-green-600">
                            -{formatPrice(totalDiscount)}
                        </span>
                    </div>
                )}

                {/* Final Total */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-gray-300">
                    <span className="text-lg font-bold text-gray-900">최종 금액</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                </div>

                {/* Savings Info */}
                {totalDiscount > 0 && (
                    <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                            🎉 패키지 할인으로{' '}
                            <span className="font-bold">{formatPrice(totalDiscount)}</span> 절약!
                        </p>
                    </div>
                )}

                {/* Package Recommendation */}
                {packages.length === 0 && items.length >= 3 && (
                    <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                            💡 동일 시술 3회 이상 선택 시 패키지 할인이 자동 적용됩니다!
                        </p>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};
