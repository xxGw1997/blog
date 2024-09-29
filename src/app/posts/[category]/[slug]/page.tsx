import { useGetBlog } from "~/features/posts/api/use-get-mdx-blog";

interface BlogPage {
  params: { slug: string; category: string };
}

const BlogPage = async ({ params: { category, slug } }: BlogPage) => {
  const { content, title, desc, date } = await useGetBlog(category, slug);

  return <div>{content}</div>;
};

export default BlogPage;
