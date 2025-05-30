import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";

import { customMDXComponents } from "~/components/mdx";

import { getPostData } from "./use-posts";
import { getToc } from "./use-get-toc";

export const useGetBlog = async (slug: string) => {
  try {
    const post = await getPostData(slug);
    if (!post) throw new Error("Post not found");
    const { content } = await compileMDX<{
      title: string;
      date: string;
      desc: string;
    }>({
      source: post.content,
      components: customMDXComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm], // 拓展 remark 功能， 处理 GFM 特有的 Markdown语法
          rehypePlugins: [
            rehypeSlug, // 给文章 <h1>~<h6> 添加id属性
            () => (tree) => {
              // 将 pre 标签 并且子节点是code标签的代码内容存储到node元素节点上，以便后续使用
              visit(tree, (node) => {
                if (node?.type === "element" && node?.tagName === "pre") {
                  const [codeEl] = node.children;
                  if (codeEl.tagName !== "code") return;
                  node.raw = codeEl.children?.[0].value;
                }
              });
            },
            // @ts-ignore
            rehypeKatex, // 渲染数学公式
            [
              //@ts-ignore
              rehypePrettyCode, // 配置post中代码片段的样式风格
              {
                theme: "one-dark-pro",
                defaultLang: {
                  block: "bash",
                },
              },
            ],
            () => (tree) => {
              // 将上面存储的 node.raw 代码文本赋值到用户代码美化的属性上
              visit(tree, (node) => {
                if (
                  node.properties &&
                  "data-rehype-pretty-code-figure" in node.properties
                ) {
                  for (const child of node.children) {
                    if (child.tagName === "pre") {
                      child.properties["raw"] = node.raw;
                    }
                  }
                }
              });
            },
          ],
        },
      },
    });

    const headings = getToc(post.content);

    return {
      title: post.meta.title,
      desc: post.meta.desc,
      date: post.meta.date,
      content,
      headings,
    };
  } catch (error) {
    console.log(error)
    notFound();
  }
};
