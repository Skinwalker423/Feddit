"use client";

import {
  Button,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

import {
  signInGithub,
  signOutGithub,
} from "@/actions/auth";
import { useSession } from "next-auth/react";

const HeaderAuth = () => {
  const session = useSession();
  const isLoading = session.status === "loading";
  const userSession = session?.data?.user;

  let authContent: React.ReactNode;

  if (isLoading) {
    authContent = null;
  } else if (userSession) {
    authContent = (
      <Popover placement='left-end'>
        <PopoverTrigger>
          <Avatar
            src={userSession.image || ""}
            name={
              userSession.image
                ? ""
                : userSession.name ||
                  userSession.email ||
                  "Anon"
            }
          />
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <h3 className='text-center text-xl mb-3'>
              Menu
            </h3>
            <form action={signOutGithub}>
              <Button type='submit'>Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <form className='flex gap-3' action={signInGithub}>
          <Button
            type='submit'
            color='secondary'
            variant='bordered'
          >
            Sign In
          </Button>

          <Button
            type='submit'
            color='primary'
            variant='flat'
          >
            Sign Up
          </Button>
        </form>
      </>
    );
  }
  return <>{authContent}</>;
};

export default HeaderAuth;
