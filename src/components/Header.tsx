import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { paths } from "@/helpers/paths";
import HeaderAuth from "./HeaderAuth";
import { Suspense } from "react";
import SearchInput from "./SearchInput";

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
          <Suspense>
            <SearchInput />
          </Suspense>
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
