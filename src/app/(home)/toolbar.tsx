import Link from "next/link";
import { LuNewspaper, LuRss, LuSun } from "react-icons/lu";
import { ActiveLink } from "~/components/active-link";

const navItems = [
  {
    title: "博客",
    link: "/",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "随笔",
    link: "/",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "相册",
    link: "/",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "关于",
    link: "/about",
    icon: <LuNewspaper size={24} />,
  },
];

export const Toolbar = () => {
  return (
    <header className="h-[60px] w-full sticky top-0 bg-[rgba(255,255,255, 0.7)] backdrop-blur-sm shadow-custom">
      <Link href="/" title="首页" className="absolute m-5">
        ywx
      </Link>
      <nav className="max-w-xl h-full mx-auto flex justify-around items-center max-md:hidden">
        {navItems.map((item) => (
          <ActiveLink href={`${item.link}`}>{item.title}</ActiveLink>
        ))}
      </nav>
      <div className="absolute h-full right-10 top-0 flex items-center gap-x-10">
        <LuRss size={24} />
        <LuSun size={24} />
      </div>
    </header>
  );
};
