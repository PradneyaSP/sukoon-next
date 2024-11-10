// src/app/results/page.tsx
"use client"
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ResultsPage() {
  return (

    <Suspense fallback={<div>Loading...</div>}>
      <Result />
    </Suspense>
  );
}

function Result() {
  const searchParams = useSearchParams();
  const disorder = searchParams.get("disorder");
  const score = searchParams.get("score");

  return (
    <div>
      <h2>Assessment Results</h2>
      {disorder ? (
        <p>
          You may have {disorder}. Your score is {score}. Consider seeking further evaluation.
        </p>
      ) : (
        <p>You appear to be healthy!</p>
      )}
    </div>);
}
