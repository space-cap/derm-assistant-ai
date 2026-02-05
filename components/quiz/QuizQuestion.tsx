'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface QuizQuestionProps {
    question: {
        id: string;
        question: string;
        options: string[];
        correct_answer: number;
        explanation: string;
        category: string;
        difficulty: string;
    };
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (isCorrect: boolean) => void;
    showResult: boolean;
    selectedAnswer: number | null;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
    showResult,
    selectedAnswer,
}) => {
    const [localSelected, setLocalSelected] = useState<number | null>(selectedAnswer);

    const handleSelect = (index: number) => {
        if (showResult) return;
        setLocalSelected(index);
    };

    const handleSubmit = () => {
        if (localSelected === null) return;
        const isCorrect = localSelected === question.correct_answer;
        onAnswer(isCorrect);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'success';
            case 'medium':
                return 'warning';
            case 'hard':
                return 'error';
            default:
                return 'default';
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return '쉬움';
            case 'medium':
                return '보통';
            case 'hard':
                return '어려움';
            default:
                return difficulty;
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between mb-3">
                    <Badge variant="info">
                        문제 {questionNumber} / {totalQuestions}
                    </Badge>
                    <Badge variant={getDifficultyColor(question.difficulty) as any}>
                        {getDifficultyLabel(question.difficulty)}
                    </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{question.question}</h3>
            </CardHeader>
            <CardBody className="space-y-4">
                {/* Options */}
                <div className="space-y-3">
                    {question.options.map((option, index) => {
                        const isSelected = localSelected === index;
                        const isCorrect = index === question.correct_answer;
                        const showCorrect = showResult && isCorrect;
                        const showWrong = showResult && isSelected && !isCorrect;

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelect(index)}
                                disabled={showResult}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${showCorrect
                                        ? 'border-green-500 bg-green-50'
                                        : showWrong
                                            ? 'border-red-500 bg-red-50'
                                            : isSelected
                                                ? 'border-primary bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${showCorrect
                                                ? 'border-green-500 bg-green-500'
                                                : showWrong
                                                    ? 'border-red-500 bg-red-500'
                                                    : isSelected
                                                        ? 'border-primary bg-primary'
                                                        : 'border-gray-300'
                                            }`}
                                    >
                                        {showCorrect && <span className="text-white text-sm">✓</span>}
                                        {showWrong && <span className="text-white text-sm">✗</span>}
                                        {!showResult && isSelected && (
                                            <span className="text-white text-sm">•</span>
                                        )}
                                    </div>
                                    <span className={showResult && isCorrect ? 'font-semibold' : ''}>
                                        {option}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Submit Button */}
                {!showResult && (
                    <Button
                        onClick={handleSubmit}
                        disabled={localSelected === null}
                        className="w-full"
                    >
                        정답 확인
                    </Button>
                )}

                {/* Explanation */}
                {showResult && (
                    <div
                        className={`p-4 rounded-lg ${localSelected === question.correct_answer
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                            }`}
                    >
                        <h4 className="font-semibold text-gray-900 mb-2">
                            {localSelected === question.correct_answer ? '✅ 정답입니다!' : '❌ 오답입니다.'}
                        </h4>
                        <p className="text-sm text-gray-700">{question.explanation}</p>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};
