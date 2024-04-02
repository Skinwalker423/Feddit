"use server";

import { redirect } from "next/navigation";

export const search = (formData: FormData) => {
  const term = formData.get("term");

  if (typeof term !== "string" || !term) {
    redirect("/");
  } else {
    redirect(`/search?term=${term}`);
  }
};
