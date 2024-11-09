// src/app/disorder/[disorder]/page.tsx

import { useRouter } from "next/router";
import DisorderAssessment from "@/components/assessment/disorder-assessment";

type DisorderPageProps = {
  params: { disorder: string };
};

export default function DisorderPage({ params }: DisorderPageProps) {
  const { disorder } = params;

  return (
    <div>
      <DisorderAssessment disorder={disorder} />
    </div>
  );
}
