import { getAllPosts } from "~/features/posts/api/use-posts";

import { CategorySelect } from "./category-select";
import { PostList } from "./post-list";

const PostsPage = async () => {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-10 pt-20">
      <CategorySelect />
      <PostList posts={posts}/>
    </div>
  );
};

export default PostsPage;
