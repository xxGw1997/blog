"use server";

import { format } from "date-fns";
import { BACKEND_URL } from "~/lib/constants";

export type PostData = {
  meta: {
    title: string;
    date: string;
    desc: string;
    id: number;
  };
  content: string;
};

export type ReturnPostData = {
  id: number;
  title: string;
  desc: string;
  publishDate: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
  categories: Array<string>;
};

// 获取posts下所有的post
export const getAllPosts = async (category: string | undefined | string[]) => {
  const bodyData = {
    page: {
      index: 0,
      size: 30,
    },
    category,
  };

  const res = await fetch(`${BACKEND_URL}/post/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  if (res.ok) {
    const list = await res.json();
    if (list.success) {
      const posts = list.data.postList as ReturnPostData[];
      return posts.map((post) => ({
        meta: {
          title: post.title,
          date: format(new Date(post.publishDate), "yyyy-MM-dd hh:mm"),
          desc: post.desc,
          categories: post.categories,
          author: post.author,
          id: post.id,
        },
      }));
    }
  } else {
    throw new Error("Fetch posts failed~");
  }
};

// 获取post内容
export const getPostData = async (slug: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/post/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        const post = data.data;
        return {
          meta: {
            title: post.title,
            desc: post.desc,
            date: format(new Date(post.publishDate), "yyyy-MM-dd hh:mm"),
          },
          content: post.content,
        } as PostData;
      }
    } else {
      throw new Error("Fetch post failed");
    }
  } catch (error) {
    throw new Error("Fetch post failed");
  }
};
