"use server";

import { signOut } from "@/auth";

export const signOutGithub = () => {
  return signOut({
    redirectTo: process.env.BASE_URL,
  });
};
