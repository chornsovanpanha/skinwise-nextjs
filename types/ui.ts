import { countryMap } from "@/utils/constant/data";

export type MobileMenu = {
  id: number;
  link: string;
  name: string;
  hasHover: boolean;
  content?: React.ReactNode;
};

export type KeyCountries = keyof typeof countryMap;
