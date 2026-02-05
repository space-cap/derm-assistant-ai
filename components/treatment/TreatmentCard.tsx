import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, getPainStars } from '@/lib/utils';

interface Treatment {
    id: string;
    name: string;
    category: string;
    prices?: {
        domestic?: {
            price: number;
            product: string;
        };
        imported?: {
            price: number;
            product: string;
        };
        single?: {
            price: number;
            product: string;
        };
    };
    unit?: string;
    description?: string;
    duration?: string;
    pain_level?: number;
    downtime?: string;
    anesthesia?: string;
    effect_start?: string;
}

interface TreatmentCardProps {
    treatment: Treatment;
    onClick?: () => void;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
    treatment,
    onClick,
}) => {
    const hasDomestic = treatment.prices?.domestic;
    const hasImported = treatment.prices?.imported;
    const hasSingle = treatment.prices?.single;

    return (
        <Card hover onClick={onClick} className="h-full cursor-pointer">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-gray-900">{treatment.name}</h3>
                    {treatment.unit && (
                        <Badge variant="default" size="small">
                            {treatment.unit}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardBody className="space-y-3">
                {/* Description */}
                {treatment.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {treatment.description}
                    </p>
                )}

                {/* Prices */}
                {treatment.prices && (
                    <div className="space-y-2">
                        {hasDomestic && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="domestic" size="small">
                                        국산
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                        {treatment.prices.domestic!.product}
                                    </span>
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {formatPrice(treatment.prices.domestic!.price)}
                                </span>
                            </div>
                        )}
                        {hasImported && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="imported" size="small">
                                        수입
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                        {treatment.prices.imported!.product}
                                    </span>
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {formatPrice(treatment.prices.imported!.price)}
                                </span>
                            </div>
                        )}
                        {hasSingle && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="info" size="small">
                                        단일가
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                        {treatment.prices.single!.product}
                                    </span>
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {formatPrice(treatment.prices.single!.price)}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* No price available */}
                {!treatment.prices && (
                    <div className="text-sm text-gray-500 italic">
                        💬 상담 필요
                    </div>
                )}

                {/* Additional Info */}
                <div className="pt-3 border-t border-gray-100 space-y-1">
                    {treatment.duration && (
                        <div className="flex items-center text-xs text-gray-600">
                            <span className="mr-2">⏱️</span>
                            <span>시술 시간: {treatment.duration}</span>
                        </div>
                    )}
                    {treatment.pain_level && (
                        <div className="flex items-center text-xs text-gray-600">
                            <span className="mr-2">💉</span>
                            <span>통증: {getPainStars(treatment.pain_level)}</span>
                        </div>
                    )}
                    {treatment.downtime && (
                        <div className="flex items-center text-xs text-gray-600">
                            <span className="mr-2">🕐</span>
                            <span>회복 기간: {treatment.downtime}</span>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};
