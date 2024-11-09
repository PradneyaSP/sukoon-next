// src/data/questions.ts

import { Question } from "@/types/assessment";

export const commonAssessment: Question[] = [
  { id: 1, question: "Question 1", options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
  // Add all 20 questions for the common assessment
];

export const disorderAssessments: Record<string, Question[]> = {
  Depression: [
    { id: 1, question: "Depression Question 1", options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
    // Add all 20 questions for Depression
  ],
  Anxiety: [
    { id: 1, question: "Anxiety Question 1", options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
    // Add all 20 questions for Anxiety
  ],
  // Continue for all 10 disorders
};
