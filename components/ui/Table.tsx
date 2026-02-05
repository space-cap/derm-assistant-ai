import React from 'react';
import { cn } from '@/lib/utils';

export interface TableColumn<T> {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string;
}

export interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    keyExtractor: (item: T) => string;
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    className?: string;
}

export function Table<T>({
    columns,
    data,
    keyExtractor,
    onRowClick,
    emptyMessage = '데이터가 없습니다',
    className,
}: TableProps<T>) {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <div className={cn('w-full overflow-x-auto', className)}>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={cn(
                                    'px-4 py-3 text-sm font-semibold text-gray-700',
                                    alignClasses[column.align || 'left']
                                )}
                                style={{ width: column.width }}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr
                                key={keyExtractor(item)}
                                onClick={() => onRowClick?.(item)}
                                className={cn(
                                    'border-b border-gray-100 transition-colors',
                                    onRowClick && 'cursor-pointer hover:bg-gray-50'
                                )}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={cn(
                                            'px-4 py-3 text-sm text-gray-900',
                                            alignClasses[column.align || 'left']
                                        )}
                                    >
                                        {column.render
                                            ? column.render(item)
                                            : String((item as any)[column.key] || '-')}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

// 반응형 카드 형태 테이블 (모바일용)
export interface ResponsiveTableProps<T> extends TableProps<T> {
    mobileBreakpoint?: number;
}

export function ResponsiveTable<T>({
    mobileBreakpoint = 768,
    ...props
}: ResponsiveTableProps<T>) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [mobileBreakpoint]);

    if (isMobile) {
        return (
            <div className="space-y-3">
                {props.data.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {props.emptyMessage || '데이터가 없습니다'}
                    </div>
                ) : (
                    props.data.map((item) => (
                        <div
                            key={props.keyExtractor(item)}
                            onClick={() => props.onRowClick?.(item)}
                            className={cn(
                                'bg-white rounded-lg border border-gray-200 p-4 space-y-2',
                                props.onRowClick && 'cursor-pointer hover:shadow-md transition-shadow'
                            )}
                        >
                            {props.columns.map((column) => (
                                <div key={column.key} className="flex justify-between items-start">
                                    <span className="text-sm font-medium text-gray-600 mr-2">
                                        {column.label}:
                                    </span>
                                    <span className="text-sm text-gray-900 text-right flex-1">
                                        {column.render
                                            ? column.render(item)
                                            : String((item as any)[column.key] || '-')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        );
    }

    return <Table {...props} />;
}
