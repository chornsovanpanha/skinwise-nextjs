"use client";
import { Provider } from "jotai";
import React from "react";
import { jotaiStore } from "./atom";

const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={jotaiStore}>{children}</Provider>;
};

export default JotaiProvider;
