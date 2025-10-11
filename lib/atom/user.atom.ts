import { AuthResponse } from "@/types";
import { atomWithStorage } from "jotai/utils";

export const defaultUserState = {
  id: undefined,
  platform: "",
  loginBy: "",
  name: "",
  role: "",
  email: "",
  photoUrl: { url: "" },
  bio: "",
  skinType: undefined,
  skinConcerns: undefined,
};
export const userAtom = atomWithStorage<AuthResponse>("user", defaultUserState);
