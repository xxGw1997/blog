import { PostList } from "../post-list";

interface CategoryPageProps {
  params: { category: string };
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  return <PostList />;
};

export default CategoryPage;
