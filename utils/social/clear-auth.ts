import { GoogleAuthProvider } from "firebase/auth";

export const clearGoogleLogout = async () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });
};
