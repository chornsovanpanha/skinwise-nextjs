"use client";

import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Your Result</h1>
      <p>You scored {score} points 🎉</p>
    </div>
  );
}
