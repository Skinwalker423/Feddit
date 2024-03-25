"use server";

import { signIn } from "@/auth";

export const signInGithub = () => {
  return signIn("github");
};
