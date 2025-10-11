import { ProductWithBrandAndImages } from "@/types";
import { atomWithStorage } from "jotai/utils";

export const recentSearchProductAtom = atomWithStorage<
  ProductWithBrandAndImages[]
>("recentSearchProduct", []);
