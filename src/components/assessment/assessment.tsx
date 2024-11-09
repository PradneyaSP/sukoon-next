// src/components/Assessment.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { commonAssessment } from "@/lib/questions";
import { Question } from "@/types/assessment";

type AssessmentProps = {
    onDisorderDetected?: (disorder: string | null) => void;
};

export default function Assessment({ onDisorderDetected }: AssessmentProps) {
    const [answers, setAnswers] = useState<(number | null)[]>(Array(commonAssessment.length).fill(null));
    const router = useRouter();

    const handleOptionChange = (questionIndex: number, score: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = score;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        const totalScore = answers.reduce((sum, score) => { return sum! + (score || 0) }, 0) as number;
        const detectedDisorder = detectDisorder(totalScore);
        if (onDisorderDetected) onDisorderDetected(detectedDisorder);
        router.push(detectedDisorder ? `/disorder/${detectedDisorder}` : "/results");
    };

    return (
        <div>
            <h2>Mental Health Assessment</h2>
            {commonAssessment.map((q: Question, index: number) => (
                <div key={q.id}>
                    <p>{q.question}</p>
                    {q.options.map((option, idx) => (
                        <label key={idx}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={4 - idx}
                                onChange={() => handleOptionChange(index, 4 - idx)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

function detectDisorder(score: number): string | null {
    // Example logic to detect a disorder based on the score
    if (score > 70) return "Depression";
    return null; // Return null if healthy
}
