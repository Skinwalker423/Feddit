import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
} from "@nextui-org/react";

import { auth } from "@/auth";
import { paths } from "@/helpers/paths";

const Header = async () => {
  const session = await auth();

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
        <NavbarItem>
          {session?.user ? (
            <Avatar
              src={session?.user?.image || ""}
              name={
                !session?.user?.image
                  ? session?.user?.name ||
                    session?.user?.email ||
                    "Anon"
                  : ""
              }
            />
          ) : (
            <>
              <Button>Sign In</Button>
              <Button>Sign Out</Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
