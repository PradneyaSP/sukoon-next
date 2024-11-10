"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { disorderAssessments } from "@/lib/questions";
import { Question } from "@/types/assessment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type DisorderAssessmentProps = {
  disorder: string;
};

export default function DisorderAssessment({ disorder }: DisorderAssessmentProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(disorderAssessments[disorder].length).fill(null));
  const [showDialog, setShowDialog] = useState(true); // Controls the dialog visibility
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const router = useRouter();

  // Function to handle option change
  const handleOptionChange = (questionIndex: number, score: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = score;
    setAnswers(updatedAnswers);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const totalScore = answers.reduce((sum, score) => sum! + (score || 0), 0);
    router.push(`/results?disorder=${disorder}&score=${totalScore}`);
  };

  // Set up the camera for the dialog box preview
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
      // Stop the camera when component unmounts
      videoStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Start image capturing on dialog confirmation
  useEffect(() => {
    if (!showDialog) {
      const videoElement = document.createElement("video");
      if (videoStream) {
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
    }
  }, [showDialog]);

  const captureImage = (videoElement: HTMLVideoElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      console.log("Captured Image Data:", imageData);
    }
  };

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
    </div>
  );
}
