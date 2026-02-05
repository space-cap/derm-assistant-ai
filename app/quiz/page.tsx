'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import quizData from '@/data/quiz.json';
import { STORAGE_KEYS } from '@/lib/constants';
import { shuffleArray } from '@/lib/utils';

interface QuizProgress {
    currentQuestion: number;
    answers: boolean[];
    selectedAnswers: (number | null)[];
    completed: boolean;
}

export default function QuizPage() {
    const [quizProgress, setQuizProgress] = useState<QuizProgress>({
        currentQuestion: 0,
        answers: [],
        selectedAnswers: [],
        completed: false,
    });
    const [showResult, setShowResult] = useState(false);
    const [questions, setQuestions] = useState(quizData.questions);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);
        if (saved) {
            try {
                setQuizProgress(JSON.parse(saved));
            } catch (error) {
                console.error('Failed to load quiz progress:', error);
            }
        }
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(quizProgress));
    }, [quizProgress]);

    const currentQuestion = questions[quizProgress.currentQuestion];
    const totalQuestions = questions.length;
    const correctCount = quizProgress.answers.filter((a) => a).length;
    const score = quizProgress.completed
        ? Math.round((correctCount / totalQuestions) * 100)
        : 0;

    const handleAnswer = (isCorrect: boolean) => {
        setShowResult(true);
        setQuizProgress((prev) => ({
            ...prev,
            answers: [...prev.answers, isCorrect],
        }));
    };

    const handleNext = () => {
        if (quizProgress.currentQuestion < totalQuestions - 1) {
            setQuizProgress((prev) => ({
                ...prev,
                currentQuestion: prev.currentQuestion + 1,
            }));
            setShowResult(false);
        } else {
            setQuizProgress((prev) => ({
                ...prev,
                completed: true,
            }));
        }
    };

    const handleRestart = () => {
        setQuizProgress({
            currentQuestion: 0,
            answers: [],
            selectedAnswers: [],
            completed: false,
        });
        setShowResult(false);
        // Shuffle questions
        setQuestions(shuffleArray([...quizData.questions]));
    };

    if (quizProgress.completed) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">📝 학습 퀴즈</h1>

                <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardBody className="text-center space-y-6 py-12">
                        <div className="text-6xl">
                            {score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">퀴즈 완료!</h2>
                            <p className="text-gray-600">
                                {totalQuestions}문제 중 {correctCount}문제 정답
                            </p>
                        </div>
                        <div className="inline-block">
                            <Badge
                                variant={score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error'}
                                className="text-2xl px-6 py-3"
                            >
                                {score}점
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            {score >= 80 && (
                                <p className="text-lg font-semibold text-green-700">
                                    훌륭합니다! 시술에 대해 잘 이해하고 계시네요! 🌟
                                </p>
                            )}
                            {score >= 60 && score < 80 && (
                                <p className="text-lg font-semibold text-yellow-700">
                                    좋아요! 조금 더 공부하면 완벽해질 거예요! 📚
                                </p>
                            )}
                            {score < 60 && (
                                <p className="text-lg font-semibold text-red-700">
                                    다시 한번 도전해보세요! 연습이 완벽을 만듭니다! 💪
                                </p>
                            )}
                        </div>
                        <Button size="large" onClick={handleRestart}>
                            다시 시작하기
                        </Button>
                    </CardBody>
                </Card>

                {/* Answer Review */}
                <Card>
                    <CardBody className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900">📋 정답 확인</h3>
                        <div className="space-y-3">
                            {questions.map((q, index) => (
                                <div
                                    key={q.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`text-2xl ${quizProgress.answers[index] ? 'text-green-600' : 'text-red-600'
                                                }`}
                                        >
                                            {quizProgress.answers[index] ? '✓' : '✗'}
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-900">문제 {index + 1}</p>
                                            <p className="text-sm text-gray-600">{q.question}</p>
                                        </div>
                                    </div>
                                    <Badge variant={quizProgress.answers[index] ? 'success' : 'error'}>
                                        {quizProgress.answers[index] ? '정답' : '오답'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📝 학습 퀴즈</h1>
                    <p className="text-gray-600 mt-2">
                        총 {totalQuestions}문제 · 현재 {quizProgress.currentQuestion + 1}번 문제
                    </p>
                </div>
                <Button variant="ghost" onClick={handleRestart}>
                    처음부터 다시
                </Button>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{
                        width: `${((quizProgress.currentQuestion + 1) / totalQuestions) * 100}%`,
                    }}
                />
            </div>

            {/* Question */}
            <QuizQuestion
                question={currentQuestion}
                questionNumber={quizProgress.currentQuestion + 1}
                totalQuestions={totalQuestions}
                onAnswer={handleAnswer}
                showResult={showResult}
                selectedAnswer={quizProgress.selectedAnswers[quizProgress.currentQuestion] || null}
            />

            {/* Next Button */}
            {showResult && (
                <div className="flex justify-end">
                    <Button onClick={handleNext} size="large">
                        {quizProgress.currentQuestion < totalQuestions - 1 ? '다음 문제' : '결과 보기'}
                    </Button>
                </div>
            )}
        </div>
    );
}
