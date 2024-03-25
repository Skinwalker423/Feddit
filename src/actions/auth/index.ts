"use server";

import { signOut, signIn } from "@/auth";

export const signInGithub = () => {
  return signIn("github");
};

export const signOutGithub = () => {
  return signOut({
    redirectTo: process.env.BASE_URL,
  });
};
