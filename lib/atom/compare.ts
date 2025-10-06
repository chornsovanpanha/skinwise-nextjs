import { Product } from "@/types";
import { atom } from "jotai";

export const tempSelectProductAtom = atom<Product | undefined>(undefined);
