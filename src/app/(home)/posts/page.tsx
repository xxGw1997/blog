import { getAllPosts } from "~/features/posts/api/use-posts";

import { CategorySelect } from "./category-select";
import { PostList } from "./post-list";

const PostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const category = (await searchParams).category;
  const posts = await getAllPosts(category);

  return (
    <div className="mx-auto max-w-5xl px-10 pt-20">
      <CategorySelect />
      <PostList posts={posts ?? []} />
    </div>
  );
};

export default PostsPage;
