"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { disorderAssessments } from "@/lib/questions";
import { Question } from "@/types/assessment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import * as tmImage from "@teachablemachine/image";

type DisorderAssessmentProps = {
  disorder: string;
};

export default function DisorderAssessment({ disorder }: DisorderAssessmentProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(disorderAssessments[disorder].length).fill(null));
  const [showDialog, setShowDialog] = useState(true);
  const [model, setModel] = useState<tmImage.CustomImageModel | null>(null);
  const [predictions, setPredictions] = useState<string[]>([]);
  const router = useRouter();
  const webcamRef = useRef<tmImage.Webcam | null>(null);

  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/QhEkG_KNd/";

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);

        const webcam = new tmImage.Webcam(200, 200, true);  
        await webcam.setup();
        await webcam.play();
        webcamRef.current = webcam;

        window.requestAnimationFrame(loop); 
      } catch (error) {
        console.error("Error loading Teachable Machine model:", error);
      }
    };

    loadModel();

    return () => {
      webcamRef.current?.stop();
    };
  }, []);

  const loop = async () => {
    if (webcamRef.current && model) {
      webcamRef.current.update();
      await predict();
      window.requestAnimationFrame(loop);
    }
  };

  const predict = async () => {
    if (webcamRef.current && model) {
      const predictions = await model.predict(webcamRef.current.canvas);
      const formattedPredictions = predictions.map(
        (p) => `${p.className}: ${(p.probability * 100).toFixed(2)}%`
      );
      setPredictions(formattedPredictions);
    }
  };

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
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">Camera Preview</h3>
            <div id="webcam-container" ref={(container) => container && webcamRef.current?.canvas && container.appendChild(webcamRef.current.canvas)} />
            <button
              onClick={() => setShowDialog(false)}  
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
            >
              Okay
            </button>
          </div>
        </div>
      )}

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
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold">Image Predictions</h3>
        <ul>
          {predictions.map((pred, idx) => (
            <li key={idx}>{pred}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
