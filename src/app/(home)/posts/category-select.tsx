"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getCategories } from "~/features/category/api/use-get-categories";

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

type CategoryType = {
  id: number;
  title: string;
  img?: string | null;
};

export const CategorySelect = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const currentSearchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function requestCategory() {
      const res = await getCategories();
      if (res.success) {
        const categoriesData = res.data as CategoryType[];
        setCategories([{ id: -1, title: "All", img: null }, ...categoriesData]);
      }
    }
    requestCategory();
  }, []);

  const updatedSearchParams = new URLSearchParams(
    currentSearchParams.toString()
  );
  const category = updatedSearchParams.get("category");

  const handleSelect = (value: string) => {
    if (value === "All") {
      updatedSearchParams.delete("category");
    } else {
      updatedSearchParams.set("category", value);
    }
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  return (
    <Select value={category ?? "All"} onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((item) => (
            <SelectItem key={item.id} value={item.title}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
