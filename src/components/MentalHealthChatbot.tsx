import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "@auth0/nextjs-auth0/client";
import { questions } from "../lib/questionData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { CircularProgressbar } from 'react-circular-progressbar'; // Import the circular progress bar
import 'react-circular-progressbar/dist/styles.css'; // Import default styles for the circular progress bar

// Define the point system for answers
const optionPoints = {
  "Not at all": 1,
  "Several days": 2,
  "More than half the days": 3,
  "Nearly every day": 4,
  "Never": 1,
  "Rarely": 2,
  "Sometimes": 3,
  "Often": 4,
  "Very Often": 4,
};

const MentalHealthChatbot: React.FC = () => {
  const { user } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0); // Track total score
  const [disorderScores, setDisorderScores] = useState<any>({ depression: 0, anxiety: 0, bipolar: 0, adhd: 0 });
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = async (answer: string) => {
    const points = optionPoints[answer] || 0;
    setTotalPoints(totalPoints + points); // Add points to the total score
    setResponses([...responses, answer]);

    // Update disorder scores based on the current question and selected answer
    updateDisorderScores(answer);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await saveResponses();
      analyzeResponses();
      setShowResult(true);
    }
  };

  const updateDisorderScores = (answer: string) => {
    const points = optionPoints[answer] || 0;

    // Add points based on the disorder type of the question
    switch (questions[currentQuestion].disorder) {
      case "depression":
        setDisorderScores((prev) => ({ ...prev, depression: prev.depression + points }));
        break;
      case "anxiety":
        setDisorderScores((prev) => ({ ...prev, anxiety: prev.anxiety + points }));
        break;
      case "bipolar":
        setDisorderScores((prev) => ({ ...prev, bipolar: prev.bipolar + points }));
        break;
      case "adhd":
        setDisorderScores((prev) => ({ ...prev, adhd: prev.adhd + points }));
        break;
    }
  };

  const saveResponses = async () => {
    if (user) {
      const userResponses = {
        userId: user.sub,
        responses: responses,
        totalPoints: totalPoints,
        disorderScores: disorderScores,
        timestamp: new Date().toISOString(),
      };
      await setDoc(doc(db, "mentalHealthResponses", user.sub), userResponses);
    }
  };

  const analyzeResponses = () => {
    // Calculate percentage for each disorder
    const totalMaxPoints = 4 * questions.length; // Maximum points if all answers are 'Nearly every day' or 'Very Often'
    const disorderPercentages = Object.entries(disorderScores).map(([disorder, score]) => ({
      disorder,
      percentage: Math.min(Math.round((score / totalMaxPoints) * 100), 100), // Cap the percentage at 100
    }));

    // Find the disorder with the highest score
    const highestDisorder = disorderPercentages.reduce(
      (prev, current) => (current.percentage > prev.percentage ? current : prev),
      { disorder: "", percentage: 0 }
    );

    setResult(
      `Based on your responses, you may be experiencing ${highestDisorder.disorder} symptoms at ${highestDisorder.percentage}% intensity.`
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center">
        <Card className="p-6 max-w-xl shadow-lg bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Mental Health Assessment</h2>

          {showResult ? (
            <div>
              <Alert className="bg-blue-100 border-blue-500 text-blue-800 p-4 rounded-md mb-6">
                <p>{result}</p>
              </Alert>
              <div className="flex space-x-6">
                {Object.entries(disorderScores).map(([disorder, score]) => {
                  const percentage = Math.min(Math.round((score / (4 * questions.filter(q => q.disorder === disorder).length)) * 100), 100);
                  return (
                    <div key={disorder} className="flex flex-col items-center">
                      <p className="text-xl font-medium">{disorder.charAt(0).toUpperCase() + disorder.slice(1)}</p>
                      <div className="w-24 h-24">
                        <CircularProgressbar value={percentage} text={`${percentage}%`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Chatbot UI */}
              <div className="flex flex-col space-y-4">
                {currentQuestion < questions.length ? (
                  <div className="flex space-x-4">
                    {/* Left side: Bot's message */}
                    <div className="w-2/3 text-left bg-gray-100 p-4 rounded-lg shadow-sm">
                      <p className="text-lg font-medium">{`Hey! ${questions[currentQuestion].text}`}</p>
                    </div>

                    {/* Right side: User's options */}
                    <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
                      <p className="text-md font-medium">Choose an option:</p>
                      <div className="space-y-2">
                        {questions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => handleAnswer(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Bot Responses Between Questions */}
              <div className="text-center mt-6">
                {currentQuestion === questions.length - 1 ? (
                  <p className="text-xl font-semibold">Here we go, the final report!</p>
                ) : (
                  <p className="text-lg font-medium">Great! Here comes the next question...</p>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthChatbot;
