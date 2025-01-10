import { useGetBlog } from "~/features/posts/api/use-get-mdx-blog";
import { WrapperBlog } from "./wrapper-blog";

interface BlogPage {
  params: { slug: string };
}

const BlogPage = async ({ params: { slug } }: BlogPage) => {
  const { content, title, desc, date, headings } = await useGetBlog(slug);

  return (
    <div className="w-full">
      <WrapperBlog headings={headings}>
        <article className="w-full p-7">
          <div
            className="prose prose-headings:text-foreground prose-p:text-foreground prose-td:text-foreground prose-li:text-foreground prose-code:text-foreground prose-strong:text-foreground"
            id="prose"
          >
            {content}
          </div>
        </article>
      </WrapperBlog>
    </div>
  );
};

export default BlogPage;
