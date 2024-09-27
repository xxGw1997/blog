import Link from "next/link";
import { LuNewspaper, LuRss, LuSun } from "react-icons/lu";
import { ActiveLink } from "~/components/active-link";

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
        ywx
      </Link>
      <nav className="flex-1 max-w-xl h-[60px] mx-auto flex justify-around items-center max-md:hidden">
        {navItems.map((item) => (
          <ActiveLink href={`${item.link}`}>{item.title}</ActiveLink>
        ))}
      </nav>
      <div className="absolute right-5 m-7 top-0 flex items-center gap-x-10 max-md:gap-x-2 max-sm:right-2">
        <LuRss size={24} />
        <LuSun size={24} />
      </div>
    </header>
  );
};
