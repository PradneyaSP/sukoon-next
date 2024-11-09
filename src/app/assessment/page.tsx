// app/assessment/page.tsx
"use client";

import React from "react";
import MentalHealthChatbot from "../../components/MentalHealthChatbot";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const AssessmentPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  // Redirect to login if user is not authenticated and not loading
  if (!isLoading && !user) {
    router.push("/api/auth/login");
    return null; // Prevent rendering until redirect
  }

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <MentalHealthChatbot />}
    </div>
  );
};

export default AssessmentPage;
