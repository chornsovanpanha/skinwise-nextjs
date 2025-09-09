import { AuthResponse } from "@/types/api";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const defaultUserState = {
  id: 0,
  platform: "",
  loginBy: "",
  name: "",
  role: "",
  email: "",
  photoUrl: { url: "" },
};
export const counterAtom = atom(0);
export const userAtom = atomWithStorage<AuthResponse>("user", defaultUserState);
