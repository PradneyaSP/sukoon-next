// src/components/DisorderAssessment.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { disorderAssessments } from "@/lib/questions";
import { Question } from "@/types/assessment";

type DisorderAssessmentProps = {
  disorder: string;
};

export default function DisorderAssessment({ disorder }: DisorderAssessmentProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(disorderAssessments[disorder].length).fill(null));
  const router = useRouter();

  const handleOptionChange = (questionIndex: number, score: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = score;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const totalScore = answers.reduce((sum, score) => sum! + (score || 0), 0);
    router.push(`/results?disorder=${disorder}&score=${totalScore}`);
  };

  return (
    <div>
      <h2>{disorder} Assessment</h2>
      {disorderAssessments[disorder].map((q: Question, index: number) => (
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
