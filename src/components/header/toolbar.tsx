import { Link } from "next-view-transitions";
import { LuNewspaper, LuRss } from "react-icons/lu";

import ywxImg from "~/assets/imgs/ywx.png";
import ywxDarkImg from "~/assets/imgs/ywx-dark.png";

import { ThemeSwitch } from "../theme-switch";
import DarkModeImg from "../dark-mode-img";
import SignInButton from "../sign-in-button";
import NavBar from "./navbar";

const navItems = [
  {
    title: "Blog",
    link: "/posts",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "Write",
    link: "/write",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "Pictures",
    link: "/pics",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "About",
    link: "/about",
    icon: <LuNewspaper size={24} />,
  },
];

export const Toolbar = () => {
  return (
    <header className="h-[80px] flex items-center">
      <Link href="/" title="首页" className="fixed m-7 max-md:absolute">
        <DarkModeImg
          lightImg={ywxImg}
          darkImg={ywxDarkImg}
          width={72}
          height={72}
          priority
        />
      </Link>
      <NavBar />
      <div className="absolute right-20 top-5">
        <SignInButton />
      </div>
      {/* <LuRss size={24} className="absolute right-20" /> */}
      <ThemeSwitch className="fixed right-5 top-5 hidden md:flex" />
    </header>
  );
};
