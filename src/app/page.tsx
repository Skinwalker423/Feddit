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
      <div className='flex justify-center items-center gap-5'>
        <form action={authActions.signInGithub}>
          <Button
            type='submit'
            color='primary'
            radius='lg'
            size='lg'
          >
            Sign In
          </Button>
        </form>
        <form action={authActions.signOutGithub}>
          <Button
            type='submit'
            color='danger'
            radius='lg'
            size='lg'
          >
            Sign Out
          </Button>
        </form>
        {session?.user ? (
          <div>
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                width={24}
                height={24}
                alt='avatar'
              />
            ) : (
              <div>default avatar</div>
            )}
          </div>
        ) : (
          <div>Signed out</div>
        )}
      </div>
      <div>
        <Profile />
      </div>
    </main>
  );
}
