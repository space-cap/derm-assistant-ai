import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'domestic' | 'imported' | 'success' | 'warning' | 'error' | 'info';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', size = 'medium', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';

        const variants = {
            default: 'bg-gray-100 text-gray-800',
            domestic: 'bg-blue-100 text-blue-800',
            imported: 'bg-purple-100 text-purple-800',
            success: 'bg-green-100 text-green-800',
            warning: 'bg-yellow-100 text-yellow-800',
            error: 'bg-red-100 text-red-800',
            info: 'bg-cyan-100 text-cyan-800',
        };

        const sizes = {
            small: 'px-2 py-0.5 text-xs',
            medium: 'px-2.5 py-1 text-sm',
            large: 'px-3 py-1.5 text-base',
        };

        return (
            <span
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';
