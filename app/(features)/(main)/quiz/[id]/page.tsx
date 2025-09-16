"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const questions = {
  math: [
    { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
    { q: "5 * 3 = ?", options: ["15", "10", "20"], answer: "15" },
  ],
  science: [
    { q: "Water formula?", options: ["O2", "H2O", "CO2"], answer: "H2O" },
  ],
};

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const quizQuestions = questions[id as keyof typeof questions] || [];

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (option: string) => {
    if (option === quizQuestions[step].answer) {
      setScore((prev) => prev + 1);
    }
    if (step + 1 < quizQuestions.length) {
      setStep((prev) => prev + 1);
    } else {
      router.push(`/quiz/${id}/result?score=${score + 1}`);
    }
  };

  if (!quizQuestions.length) return <p>No quiz found!</p>;

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Quiz: {id}</h1>
      <p className="mb-4">{quizQuestions[step].q}</p>
      <div className="space-y-2">
        {quizQuestions[step].options.map((option, i) => (
          <button
            key={i}
            className="px-4 py-2 border rounded block"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
