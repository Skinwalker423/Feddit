import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from "@nextui-org/react";

import { paths } from "@/helpers/paths";
import HeaderAuth from "./HeaderAuth";
import { Suspense } from "react";

const Header = () => {
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
          <Suspense>
            <HeaderAuth />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
