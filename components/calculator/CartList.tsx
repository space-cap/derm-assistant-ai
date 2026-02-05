'use client';

import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';

interface CartItem {
    id: string;
    name: string;
    category: string;
    price: number;
    productType: 'domestic' | 'imported';
    product: string;
    quantity: number;
}

interface CartListProps {
    items: CartItem[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
    onClear: () => void;
}

export const CartList: React.FC<CartListProps> = ({
    items,
    onUpdateQuantity,
    onRemove,
    onClear,
}) => {
    if (items.length === 0) {
        return (
            <Card>
                <CardBody className="text-center py-12">
                    <p className="text-gray-500">장바구니가 비어있습니다.</p>
                    <p className="text-sm text-gray-400 mt-2">
                        수가 조회에서 시술을 추가해보세요.
                    </p>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                        🛒 장바구니 ({items.length}개)
                    </h3>
                    <Button variant="ghost" size="small" onClick={onClear}>
                        전체 삭제
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <Badge
                                    variant={item.productType === 'domestic' ? 'domestic' : 'imported'}
                                    size="small"
                                >
                                    {item.productType === 'domestic' ? '국산' : '수입'}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{item.product}</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                                {formatPrice(item.price)} × {item.quantity}회
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200">
                                <button
                                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="px-2 py-1 hover:bg-gray-100 rounded-l-lg"
                                    disabled={item.quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 hover:bg-gray-100 rounded-r-lg"
                                >
                                    +
                                </button>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => onRemove(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label="삭제"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </CardBody>
        </Card>
    );
};
