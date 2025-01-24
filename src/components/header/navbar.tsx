import React from "react";
import { HamburgerMenu } from "./hamburger-menu";
import Navs from "./navs";
import { links } from "~/lib/links";

const NavBar = () => {
  return (
    <nav className="w-full flex justify-center">
      <HamburgerMenu links={links} />
      <Navs links={links}/>
    </nav>
  );
};

export default NavBar;
