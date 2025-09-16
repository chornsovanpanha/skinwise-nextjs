export type MobileMenu = {
  id: number;
  link: string;
  name: string;
  hasHover: boolean;
  content?: React.ReactNode;
};

export type RoutineType = "morning" | "evening";
