"use client";

import { useState, useEffect } from "react";
import { disorderAssessments } from "@/lib/questions";
import { Question } from "@/types/assessment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import * as tmImage from "@teachablemachine/image"; // Ensure this is imported
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type DisorderAssessmentProps = {
  disorder: string;
};

export default function DisorderAssessment({ disorder }: DisorderAssessmentProps) {
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showDialog, setShowDialog] = useState(true);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [predictedScore, setPredictedScore] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const disorderData = disorderAssessments[disorder];

  useEffect(() => {
    if (disorderData) {
      setAnswers(Array(disorderData.length).fill(null));
    }
  }, [disorderData]);

  const handleOptionChange = (questionIndex: number, score: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = score;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const totalAssessmentScore = answers.reduce((sum, score) => sum + (score || 0), 0);
    const totalScore = totalAssessmentScore + predictedScore;
    setShowResult(true);
  };

  useEffect(() => {
    const startCameraPreview = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startCameraPreview();

    return () => {
      videoStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!showDialog && videoStream) {
      const videoElement = document.createElement("video");
      videoElement.srcObject = videoStream;
      videoElement.play();

      const captureInterval = 3000;
      const intervalId = setInterval(() => {
        captureImage(videoElement);
      }, captureInterval);

      return () => {
        clearInterval(intervalId);
        videoStream.getTracks().forEach((track) => track.stop());
      };
    }
  }, [showDialog, videoStream]);

  const captureImage = (videoElement: HTMLVideoElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  const predictImage = async (image: string) => {
    try {
      const URL = "https://teachablemachine.withgoogle.com/models/5HjEJJ-XG/  ";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      const model = await tmImage.load(modelURL, metadataURL);

      const imgElement = new Image(); 
      imgElement.src = image;
      await imgElement.decode();

      const prediction = await model.predict(imgElement);
      prediction.sort((a, b) => b.probability - a.probability);
      setPredictedClass(prediction[0].className);
      setPredictedScore(Math.round(prediction[0].probability * 100)); 
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  if (!disorderData) {
    return <p>Invalid disorder selected. Please choose a valid disorder.</p>;
  }

  const totalAssessmentScore = answers.reduce((sum, score) => sum + (score || 0), 0);
  const combinedScore = totalAssessmentScore + predictedScore;
  const intensityPercentage = Math.min(Math.round((combinedScore / (4 * disorderData.length)) * 100), 100);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">Camera Preview</h3>
            <video
              autoPlay
              playsInline
              muted
              ref={(video) => {
                if (video && videoStream) {
                  video.srcObject = videoStream;
                }
              }}
              className="w-full rounded-lg mb-4"
            />
            <button
              onClick={() => {
                setShowDialog(false);
                if (capturedImage) {
                  setTimeout(() => predictImage(capturedImage), 500);
                }
              }}
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

      {!showResult ? (
        <div className="space-y-6">
          {disorderData.map((q: Question, index: number) => (
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
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Assessment
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold text-gray-700">Your Result</h3>
          <p className="text-lg text-gray-600">Detected Disorder: {predictedClass}</p>
          <div className="w-40 h-40 mx-auto mt-4">
            <CircularProgressbar value={intensityPercentage} text={`${intensityPercentage}%`} />
          </div>
          <p className="text-lg text-gray-600 mt-4">Intensity: {intensityPercentage}%</p>
        </div>
      )}
    </div>
  );
}
