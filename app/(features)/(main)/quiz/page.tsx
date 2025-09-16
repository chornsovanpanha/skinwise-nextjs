"use client";

import { useRouter } from "next/navigation";

export default function QuizHome() {
  const router = useRouter();

  const quizzes = [
    { id: "math", title: "Math Quiz" },
    { id: "science", title: "Science Quiz" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Choose a Quiz</h1>
      <ul className="space-y-2">
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => router.push(`/quiz/${quiz.id}`)}
            >
              {quiz.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
