import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const disorder = searchParams.get("disorder");
  const score = searchParams.get("score");
  const prediction = searchParams.get("prediction");

  const validScore = score && !isNaN(parseInt(score, 10)) ? parseInt(score, 10) : null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Assessment Results</h2>

      {disorder && validScore !== null ? (
        <div>
          <p className="text-lg">
            You may have <strong>{disorder}</strong>. Your score is <strong>{validScore}</strong>.
          </p>
          {prediction && (
            <p className="mt-4">
              Based on the image analysis, it is likely that you show signs of: <strong>{prediction}</strong>.
            </p>
          )}
        </div>
      ) : (
        <p className="text-red-500">Invalid data provided. Please try again.</p>
      )}
    </div>
  );
}
