import GithubSlugger from "github-slugger";

export type HeadItem = {
  id: number;
  level: string;
  text: string;
  slug: string;
};

export const getToc = (content: string) => {
  // 匹配 #[1-6] 文本
  const headerExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
  // 去除 代码块 中的内容
  const codeExp = /```[\s\S]*```/g;
  const slugger = new GithubSlugger();

  const headings: HeadItem[] = Array.from(
    content.replace(codeExp, "").matchAll(headerExp)
  ).map(({ groups }, index) => {
    const flag = groups?.flag;
    const content = groups?.content;
    const level =
      flag?.length == 1
        ? "one"
        : flag?.length === 2
        ? "two"
        : flag?.length === 3
        ? "three"
        : flag?.length === 4
        ? "four"
        : "five";


    /**
     * id: 1
     * level: 'two'
     * text: 'h2 标题'
     * slug: 'h2-标题
     */
    return {
      id: index,
      level,
      text: content || "",
      slug: content ? slugger.slug(content) : "", // 将空格转化成“-”， 并且如果有重复的会在后面重复的加“1”
    };
  });

  return headings;
};
