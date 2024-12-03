import { notFound } from "next/navigation";

import { getPostsByCategory } from "~/features/posts/api/use-posts";

import { PostList } from "../post-list";
import { CategorySelect } from "../category-select";

interface CategoryPageProps {
  params: { category: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const posts = await getPostsByCategory(params.category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-10 pt-20">
      <CategorySelect />
      <PostList posts={posts} />;
    </div>
  );
};

export default CategoryPage;
