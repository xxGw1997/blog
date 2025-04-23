import { CalendarDaysIcon } from "lucide-react";
import { Metadata } from "next";
import { useGetBlog } from "~/features/posts/api/use-get-mdx-blog";
import { WrapperBlog } from "./wrapper-blog";

interface BlogPage {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPage): Promise<Metadata> {
  const slug = params.slug;
  const { title, desc } = await useGetBlog(slug);

  return {
    title,
    description: desc,
  };
}

const BlogPage = async ({ params: { slug } }: BlogPage) => {
  const { content, title, date, headings } = await useGetBlog(slug);

  return (
    <div className="w-full">
      <WrapperBlog headings={headings}>
        <div className="prose mb-20">
          <h1
            style={{
              viewTransitionName: `blog-title-${slug}`,
            }}
            className="text-foreground"
          >
            {title}
          </h1>
          <div className="ml-5 flex text-foreground">
            <CalendarDaysIcon className="mr-3" /> <span style={{viewTransitionName: `blog-date-${slug}`}}>{date}</span>
          </div>
        </div>
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
