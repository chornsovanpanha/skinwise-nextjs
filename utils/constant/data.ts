import { QuizQuestion, SkinType } from "@/types";

export const RULES = [
  "Find the product you want to compare by it name",
  "Click the plus icon and select the product you want to compare",
  "Do the same for the second product and see the results",
] as const;

export const routines = ["Morning", "Evening", "Both"] as const;
export const calendars = ["S", "M", "T", "W", "TH", "FRI", "SAT"] as const;
export const quizQuestions: QuizQuestion[] = [
  {
    question: "What level are you of your skin care knowledge?",
    options: [
      {
        id: 1,
        text: "Beginner – I know very little about skincare",
        skinType: SkinType.NORMAL,
        emoji: "🌱",
      },
      {
        id: 2,
        text: "Intermediate – I know the basics and use some products",
        skinType: SkinType.NORMAL,
        emoji: "📘",
      },
      {
        id: 3,
        text: "Advanced – I research ingredients and follow routines",
        skinType: SkinType.NORMAL,
        emoji: "🔬",
      },
      {
        id: 4,
        text: "Expert – I could teach others about skincare",
        skinType: SkinType.NORMAL,
        emoji: "👩‍🏫",
      },
    ],
  },
  {
    question:
      "After washing your face, how does your skin usually feel after 1-2 hours?",
    options: [
      {
        id: 1,
        text: "Shiny and greasy, especially on the T-zone",
        skinType: SkinType.OILY,
        emoji: "✨",
      },
      {
        id: 2,
        text: "Tight, dry, or flaky",
        skinType: SkinType.DRY,
        emoji: "🌵",
      },
      {
        id: 3,
        text: "Oily in some areas (T-zone) but dry on cheeks",
        skinType: SkinType.COMBINATION,
        emoji: "⚖️",
      },
      {
        id: 4,
        text: "Feels comfortable and balanced",
        skinType: SkinType.NORMAL,
        emoji: "😊",
      },
    ],
  },
  {
    question:
      "How does your skin usually look by midday without any makeup or powder?",
    options: [
      {
        id: 1,
        text: "Very shiny or greasy all over",
        skinType: SkinType.OILY,
        emoji: "💦",
      },
      {
        id: 2,
        text: "Dull, flaky, or rough",
        skinType: SkinType.DRY,
        emoji: "🍂",
      },
      {
        id: 3,
        text: "Shiny only in the T-zone, but cheeks look dry",
        skinType: SkinType.COMBINATION,
        emoji: "🎭",
      },
      {
        id: 4,
        text: "Healthy glow, not too oily or dry",
        skinType: SkinType.NORMAL,
        emoji: "🌸",
      },
    ],
  },
  {
    question: "How often do you experience breakouts or clogged pores?",
    options: [
      {
        id: 1,
        text: "Frequently, especially on the forehead, nose, or chin",
        skinType: SkinType.OILY,
        emoji: "🔥",
      },
      {
        id: 2,
        text: "Rarely, but my skin feels rough or flaky",
        skinType: SkinType.DRY,
        emoji: "❄️",
      },
      {
        id: 3,
        text: "Sometimes in oily areas but not everywhere",
        skinType: SkinType.COMBINATION,
        emoji: "🔀",
      },
      {
        id: 4,
        text: "Occasionally, but overall my skin is clear",
        skinType: SkinType.NORMAL,
        emoji: "🌿",
      },
    ],
  },
  {
    question: "How does your skin react to moisturizers?",
    options: [
      {
        id: 1,
        text: "Moisturizer feels heavy and makes me greasy fast",
        skinType: SkinType.OILY,
        emoji: "🥵",
      },
      {
        id: 2,
        text: "Skin absorbs it quickly and still feels tight",
        skinType: SkinType.DRY,
        emoji: "🥶",
      },
      {
        id: 3,
        text: "Some areas feel fine, others feel too greasy or too dry",
        skinType: SkinType.COMBINATION,
        emoji: "🤹",
      },
      {
        id: 4,
        text: "Feels comfortable and hydrated",
        skinType: SkinType.NORMAL,
        emoji: "💧",
      },
    ],
  },
  {
    question: "How does your skin usually feel during cooler or drier weather?",
    options: [
      {
        id: 1,
        text: "Still oily and shiny",
        skinType: SkinType.OILY,
        emoji: "☀️",
      },
      {
        id: 2,
        text: "Extremely dry, flaky, and uncomfortable",
        skinType: SkinType.DRY,
        emoji: "🌬️",
      },
      {
        id: 3,
        text: "Cheeks feel dry but forehead/nose stay shiny",
        skinType: SkinType.COMBINATION,
        emoji: "🌗",
      },
      {
        id: 4,
        text: "Slightly dry but still manageable",
        skinType: SkinType.NORMAL,
        emoji: "🌼",
      },
    ],
  },
  {
    question: "What does your skin usually look like in photos without makeup?",
    options: [
      {
        id: 1,
        text: "Shiny and reflective in most areas",
        skinType: SkinType.OILY,
        emoji: "📸",
      },
      {
        id: 2,
        text: "Looks dull or patchy",
        skinType: SkinType.DRY,
        emoji: "🌑",
      },
      {
        id: 3,
        text: "Shiny on the forehead or nose, dry on cheeks",
        skinType: SkinType.COMBINATION,
        emoji: "🔄",
      },
      {
        id: 4,
        text: "Even-toned and balanced",
        skinType: SkinType.NORMAL,
        emoji: "🌞",
      },
    ],
  },
];

export const afterSkinTypeQuestions: QuizQuestion[] = [
  {
    question: "What level are you of your skin care knowledge?",
    options: [
      {
        id: 1,
        text: "I own a few products",
        skinType: SkinType.NORMAL,
        emoji: "",
      },
      {
        id: 2,
        text: "Im starting from scratch",
        skinType: SkinType.NORMAL,
        emoji: "",
      },
    ],
  },
];
export const countryOptions = [
  { label: "United States", value: "us" },
  { label: "South Korea", value: "kr" },
  { label: "Cambodia", value: "kh" },
  { label: "Vietnam", value: "vn" },
];
