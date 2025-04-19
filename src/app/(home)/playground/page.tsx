import { Link } from "next-view-transitions";
import path from "path";

const playgroundList = [
  {
    name: "Motion",
    path: "/motion",
    demos: [
      { name: "Animations", path: "/animations" },
      { name: "Horizontal Scroll", path: "/horizontal-scroll" },
      { name: "Kanban Board", path: "/kanban-board" },
      { name: "Layered", path: "/layered" },
    ],
  },
];

const Page = () => {
  return (
    <div className="mx-auto min-w-[375px] max-w-5xl px-10 pt-20">
      {playgroundList.map((category) => (
        <PlaygroundCategoryItem
          key={category.name}
          categoryPath={category.path}
          categoryName={category.name}
          demos={category.demos}
        />
      ))}
    </div>
  );
};

const PlaygroundCategoryItem = ({
  categoryName,
  categoryPath,
  demos,
}: {
  categoryName: string;
  categoryPath: string;
  demos: { name: string; path: string }[];
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{categoryName}</h2>
      <ul className="mt-4 space-y-2">
        {demos.map((demo) => (
          <li key={demo.path}>
            <Link
              href={path.join(`/playground/${categoryPath}`, demo.path)}
              className="text-blue-500 hover:underline"
            >
              {demo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
