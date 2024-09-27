import path from "path";
import fs from "fs";
import matter from "gray-matter";

export type PostData = {
  meta: {
    title: string;
    date: string;
    desc: string;
    href: string;
  };
  content: string;
};

const postsDir = path.join(process.cwd(), "src", "content", "posts");

// 获取posts下所有的post
export const getAllPosts = async () => {
  //获取posts下所有文件夹名(category)

  const categories = fs
    .readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const postsOfCategory = await Promise.all(
    categories.map(async (category) => {
      return await getPostsByCategory(category);
    })
  );

  return postsOfCategory.flat();
};

// 获取posts某个分类下所有的post
export const getPostsByCategory = async (category: string) => {
  const pathname = path.join(postsDir, category);
  try {
    const postNames = fs
      .readdirSync(pathname, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    const posts = await Promise.all(
      postNames.map(async (postName) => {
        return await getPostData(category, postName);
      })
    );
    if (posts.length === 0) return [];

    return posts.sort((a, b) =>
      Date.parse(a.meta.date) < Date.parse(b.meta.date) ? 1 : -1
    );
  } catch (error) {
    return [];
  }
};

// 获取post内容
export const getPostData = async (category: string, slug: string) => {
  const prefixPath = `${postsDir}/${category}/${slug}`;
  const filePath = path.join(prefixPath, "/index.mdx");

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // 获取 meta 信息
    const { data } = matter(fileContent);

    return {
      meta: { ...data, href: `/posts/${category}/${slug}` },
      content: fileContent,
    } as PostData;
  } catch (error) {
    throw new Error("post not found");
  }
};
