import { Button, divider } from "@nextui-org/react";
import Image from "next/image";
import { auth } from "@/auth";

import * as authActions from "../actions/auth";
import Profile from "@/components/Profile";

export default async function Home() {
  const session = await auth();
  console.log("user", session?.user);
  return (
    <main className='w-full min-h-screen flex flex-col'>
      <div>
        <Profile />
      </div>
    </main>
  );
}
