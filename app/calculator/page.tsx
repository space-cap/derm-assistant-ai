'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CartList } from '@/components/calculator/CartList';
import { PriceSummary } from '@/components/calculator/PriceSummary';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/search/SearchBar';
import { TreatmentCard } from '@/components/treatment/TreatmentCard';
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal';
import { Select, SelectOption } from '@/components/ui/Select';
import feesData from '@/data/fees.json';
import packagesData from '@/data/packages.json';
import { STORAGE_KEYS } from '@/lib/constants';

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

export default function CalculatorPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem(STORAGE_KEYS.CALCULATOR_CART);
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.CALCULATOR_CART, JSON.stringify(cart));
    }, [cart]);

    // Get all treatments
    const allTreatments = useMemo(() => {
        return feesData.categories.flatMap((category) =>
            category.treatments.map((treatment) => ({
                ...treatment,
                categoryName: category.name,
                categoryIcon: category.icon,
            }))
        );
    }, []);

    // Filter treatments for add modal
    const filteredTreatments = useMemo(() => {
        let filtered = allTreatments;

        if (searchQuery) {
            filtered = filtered.filter((treatment) =>
                treatment.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((treatment) => treatment.category === selectedCategory);
        }

        return filtered;
    }, [allTreatments, searchQuery, selectedCategory]);

    // Calculate package discounts
    const packageDiscounts = useMemo(() => {
        const discounts: PackageDiscount[] = [];

        // Group cart items by treatment name
        const treatmentCounts = cart.reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + item.quantity;
            return acc;
        }, {} as Record<string, number>);

        // Check for package eligibility (3+ of same treatment)
        Object.entries(treatmentCounts).forEach(([name, count]) => {
            if (count >= 3) {
                const items = cart.filter((item) => item.name === name);
                const originalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

                // Apply package discount (example: 10% for 3+)
                const packageInfo = packagesData.packages.find((pkg) =>
                    pkg.composition.some((comp) => comp.item.includes(name))
                );

                const discountRate = packageInfo?.discount_rate || 10;
                const discountedPrice = originalPrice * (1 - discountRate / 100);

                discounts.push({
                    name: `${name} ${count}회 패키지`,
                    items: items.map((item) => `${item.product} ${item.quantity}회`),
                    originalPrice,
                    discountedPrice,
                    discountRate,
                });
            }
        });

        return discounts;
    }, [cart]);

    const handleAddToCart = (treatment: any, productType: 'domestic' | 'imported') => {
        const price = productType === 'domestic'
            ? treatment.prices.domestic?.price
            : treatment.prices.imported?.price;

        const product = productType === 'domestic'
            ? treatment.prices.domestic?.product
            : treatment.prices.imported?.product;

        if (!price || !product) return;

        const cartItemId = `${treatment.id}-${productType}`;
        const existingItem = cart.find((item) => item.id === cartItemId);

        if (existingItem) {
            setCart(cart.map((item) =>
                item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([
                ...cart,
                {
                    id: cartItemId,
                    name: treatment.name,
                    category: treatment.category,
                    price,
                    productType,
                    product,
                    quantity: 1,
                },
            ]);
        }
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
    };

    const handleRemove = (id: string) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const handleClear = () => {
        if (confirm('장바구니를 비우시겠습니까?')) {
            setCart([]);
        }
    };

    const categoryOptions: SelectOption[] = [
        { value: 'all', label: '전체 카테고리' },
        ...feesData.categories.map((cat) => ({
            value: cat.id,
            label: `${cat.icon} ${cat.name}`,
        })),
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">🧮 비용 계산기</h1>
                    <p className="text-gray-600 mt-2">시술을 추가하고 총 비용을 계산해보세요</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    ➕ 시술 추가
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart List */}
                <div className="lg:col-span-2">
                    <CartList
                        items={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemove}
                        onClear={handleClear}
                    />
                </div>

                {/* Price Summary */}
                <div className="lg:col-span-1">
                    <PriceSummary items={cart} packages={packageDiscounts} />
                </div>
            </div>

            {/* Add Treatment Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="시술 추가"
                size="large"
            >
                <ModalBody className="space-y-4">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />

                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        options={categoryOptions}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {filteredTreatments.map((treatment) => (
                            <div key={treatment.id} className="relative">
                                <TreatmentCard treatment={treatment} />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    {treatment.prices.domestic && (
                                        <Button
                                            size="small"
                                            onClick={() => handleAddToCart(treatment, 'domestic')}
                                        >
                                            국산 추가
                                        </Button>
                                    )}
                                    {treatment.prices.imported && (
                                        <Button
                                            size="small"
                                            variant="secondary"
                                            onClick={() => handleAddToCart(treatment, 'imported')}
                                        >
                                            수입 추가
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}
