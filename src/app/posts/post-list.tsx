import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const posts = [
  {
    title: "AAAAAAAAAAAA",
    category: "react",
    desc: "我是说如果这是一段非常非常长的文字该怎么办呢我是说如果这是一段非常非常长的文字该怎么办呢我是说如果这是一段非常非常长的文字该怎么办呢我是说如果这是一段非常非常长的文字该怎么办呢我是说如果这是一段非常非常长的文字该怎么办呢我是说如果这是一段非常非常长的文字该怎么办呢我是说如果这是一段非常非常长的文字该怎么办呢我是说如果这是一段非常非常长的文字该怎么办呢",
    date: "2024-09-26",
  },
  { title: "bbbbbbbbbbbb", category: "vue", desc: "desc", date: "2024-09-26" },
  { title: "cccccccccccc", category: "node", desc: "desc", date: "2024-09-26" },
  {
    title: "dddddddddddd",
    category: "react",
    desc: "desc",
    date: "2024-09-26",
  },
  {
    title: "eeeeeeeeeeee",
    category: "react",
    desc: "desc",
    date: "2024-09-26",
  },
];

export const PostList = () => {
  return (
    <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-10 max-md:justify-center mt-10">
      {posts.map((post) => (
        <article className="min-w-[300px] flex-1 bg-white rounded-sm shadow-lg card-shadow-hover group px-8 py-5 flex flex-col">
          <Link
            className="hover:underline decoration-primary decoration-2 underline-offset-4 font-bold text-lg"
            href={""}
          >
            {post.title}
          </Link>
          <span className="text-sm">{post.date}</span>
          <p className="flex-1 py-3 overflow-hidden">{post.desc}</p>
          <Link className="flex justify-end" href={""}>
            <div className="group/view flex items-center gap-x-3">
              <FaArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover/view:animate-move" />
              View
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};
