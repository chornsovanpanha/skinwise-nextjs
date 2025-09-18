import { UserAnswerQuiz } from "@/types";
import { atom } from "jotai";

export const quizStepIndexAtom = atom(0);
export const quizAnswerOptionAtom = atom<UserAnswerQuiz[] | []>([]);
