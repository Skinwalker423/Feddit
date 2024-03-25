import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

import { auth } from "@/auth";
import { paths } from "@/helpers/paths";
import {
  signInGithub,
  signOutGithub,
} from "@/actions/auth";

const Header = async () => {
  const session = await auth();

  let authContent: React.ReactNode;

  if (session?.user) {
    authContent = (
      <Popover placement='left-end'>
        <PopoverTrigger>
          <Avatar
            src={session?.user?.image || ""}
            name={
              session?.user?.image
                ? ""
                : session?.user?.name ||
                  session?.user?.email ||
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

  return (
    <Navbar className='shadow -mb-6'>
      <NavbarBrand>
        <Link href={paths.home()} className='font-bold'>
          Feddit
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Input type='search' />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>{authContent}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
