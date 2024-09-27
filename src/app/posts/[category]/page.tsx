import { getPostsByCategory } from "~/features/posts/api/use-get-posts";

import { PostList } from "../post-list";

interface CategoryPageProps {
  params: { category: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const posts = await getPostsByCategory(params.category);

  return <PostList posts={posts} />;
};

export default CategoryPage;
