"use client";

import { useState } from "react";
import Survey from "@/components/Survey";
import SurveyResult from "@/components/SurveyResult";

export default function Home() {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [generatedReview, setGeneratedReview] = useState("");

  const handleSurveyComplete = (review: string) => {
    console.log("Survey completed with review:", review);
    setGeneratedReview(review);
    setSurveyCompleted(true);
  };

  return (
    <main>
      {!surveyCompleted ? (
        <Survey onComplete={handleSurveyComplete} />
      ) : (
        <SurveyResult generatedReview={generatedReview} />
      )}
    </main>
  );
}
