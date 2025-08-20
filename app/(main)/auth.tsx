"use client";
import { auth } from "@/lib/firebase/config";

const AuthPage = () => {
  return <div>auth {auth.app?.options?.projectId}</div>;
};

export default AuthPage;
