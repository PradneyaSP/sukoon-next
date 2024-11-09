"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { disorderAssessments } from "@/lib/questions";
import { Question } from "@/types/assessment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center capitalize">
        {disorder} Assessment
      </h2>
      <div className="space-y-6">
        {disorderAssessments[disorder].map((q: Question, index: number) => (
          <div key={q.id} className="bg-gray-50 p-6 rounded-lg flex gap-10 justify-between">
            <p className="text-lg font-medium text-gray-700 mb-4 basis-3/4">{q.question}</p>

            <Select
              value={answers[index]?.toString() || ""}
              onValueChange={(value) => handleOptionChange(index, parseInt(value))}
            >
              <SelectTrigger className="w-40 basis-1/4">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {q.options.map((option, idx) => (
                  <SelectItem key={idx} value={(4 - idx).toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  );
}
