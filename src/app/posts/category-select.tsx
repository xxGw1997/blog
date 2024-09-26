"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const categories = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "React",
    value: "react",
  },
  {
    label: "Vue",
    value: "vue",
  },
  {
    label: "CSS",
    value: "css",
  },
  {
    label: "NEXT.JS",
    value: "next",
  },
  {
    label: "NODE.JS",
    value: "node",
  },
];

export const CategorySelect = () => {
  const pathname = usePathname();
  const router = useRouter();

  const category = pathname.split("/").pop();

  const handleSelect = (value: string) => {
    if (value === "all") {
      router.push("/posts");
    } else {
      router.push(`/posts/${value}`);
    }
  };
  return (
    <Select
      defaultValue={category === "posts" ? "all" : category}
      onValueChange={handleSelect}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
