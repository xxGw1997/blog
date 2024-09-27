import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { PostData } from "~/features/posts/api/use-posts";

interface PostListProps {
  posts: PostData[];
}

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-10 max-md:justify-center mt-10">
      {posts.map((post) => (
        <article className="min-w-[300px] flex-1 bg-white rounded-sm shadow-lg card-shadow-hover group px-8 py-5 flex flex-col">
          <Link
            className="hover:underline decoration-primary decoration-2 underline-offset-4 font-bold text-lg"
            href={post.meta.href}
          >
            {post.meta.title}
          </Link>
          <span className="text-sm">{JSON.stringify(post.meta.date)}</span>
          <p className="flex-1 py-3 overflow-hidden">{post.meta.desc}</p>
          <Link className="flex justify-end" href={post.meta.href}>
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
