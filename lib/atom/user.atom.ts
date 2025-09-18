import { AuthResponse } from "@/types/api";
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
export const userAtom = atomWithStorage<AuthResponse>("user", defaultUserState);
