import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = false, shadow = 'md', children, ...props }, ref) => {
        const baseStyles = 'bg-white rounded-xl border border-gray-200 overflow-hidden';

        const shadows = {
            none: '',
            sm: 'shadow-sm',
            md: 'shadow-md',
            lg: 'shadow-lg',
        };

        const hoverStyles = hover
            ? 'transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
            : '';

        return (
            <div
                ref={ref}
                className={cn(
                    baseStyles,
                    shadows[shadow],
                    hoverStyles,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('px-6 py-4 border-b border-gray-200', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('px-6 py-4', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('px-6 py-4 border-t border-gray-200 bg-gray-50', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardFooter.displayName = 'CardFooter';
