import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface AfterCareGuideProps {
    category: string;
    title: string;
    icon: string;
    dos: string[];
    donts: string[];
    timeline?: Array<{
        period: string;
        care: string;
    }>;
}

export const AfterCareGuide: React.FC<AfterCareGuideProps> = ({
    category,
    title,
    icon,
    dos,
    donts,
    timeline,
}) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{icon}</span>
                    <div>
                        <Badge variant="info" size="small" className="mb-1">
                            {category}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="space-y-6">
                {/* Do's */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        해야 할 것
                    </h4>
                    <ul className="space-y-2">
                        {dos.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                <span className="text-green-600 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Don'ts */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-red-600">❌</span>
                        하지 말아야 할 것
                    </h4>
                    <ul className="space-y-2">
                        {donts.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                <span className="text-red-600 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Timeline */}
                {timeline && timeline.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📅</span>
                            시기별 관리
                        </h4>
                        <div className="space-y-3">
                            {timeline.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                                >
                                    <Badge variant="info" size="small">
                                        {item.period}
                                    </Badge>
                                    <p className="text-sm text-gray-700 flex-1">{item.care}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};
