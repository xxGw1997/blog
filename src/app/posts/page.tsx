import { CategorySelect } from "./category-select";
import { PostList } from "./post-list";
const PostsPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-10 pt-20">
      <CategorySelect />
      <PostList />
    </div>
  );
};

export default PostsPage;
