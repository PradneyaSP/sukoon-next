// app/assessment/page.tsx
"use client";

import React from "react";
import MentalHealthChatbot from "../../components/MentalHealthChatbot";
import { useUser } from "@auth0/nextjs-auth0/client";

const AssessmentPage: React.FC = () => {
  const { isLoading } = useUser();

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <MentalHealthChatbot />}
    </div>
  );
};

export default AssessmentPage;
