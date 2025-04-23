"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEventListener, useInViewport, useMemoizedFn } from "ahooks";

import { HeadItem } from "~/features/posts/api/use-get-toc";

interface WrapperPostProps {
  headings: HeadItem[];
  children: React.ReactNode;
}

export const WrapperBlog = ({ headings, children }: WrapperPostProps) => {
  const clickArea = useRef<HTMLDivElement | null>(null);
  const tocLinks = useRef<HTMLLinkElement[]>([]);

  const [blogHTags, setBlogHTags] = useState<HTMLElement[]>([]);

  const navigate = useMemoizedFn(() => {
    if (location.hash) {
      const anchor = document.querySelector(
        decodeURIComponent(location.hash)
      ) as HTMLElement;

      const rect = anchor.getBoundingClientRect();
      const y = window.scrollY + rect.top - 40;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  });

  const handleClickAnchor = useMemoizedFn(
    (event: MouseEvent & { target: HTMLElement }) => {
      const link = event.target.closest("a");
      if (
        !event.defaultPrevented &&
        link &&
        event.button === 0 &&
        link.target !== "_blank" &&
        link.rel !== "external" &&
        !link.download &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey
      ) {
        const url = new URL(link.href);
        if (url.origin !== location.origin) return;

        event.preventDefault();
        const { pathname, hash } = url;
        if (hash && (!pathname || pathname === location.pathname)) {
          window.history.replaceState({}, "", hash);
          navigate();
        }
      }
    }
  );

  useEventListener("hashchange", navigate);
  useEventListener("click", handleClickAnchor, {
    target: clickArea.current,
    passive: false, // 阻止a标签默认的锚点自动定位行为
  });

  useEffect(() => {
    // 收集博客中所有h标签
    const tags = [
      ...(document.querySelectorAll(
        "#prose h1, #prose h2, #prose h3, #prose h4, #prose h5, #prose h6"
      ) as NodeListOf<HTMLElement>),
    ];

    // 收集TOC中 所有的导航链接
    const links = [
      ...(document.querySelectorAll(
        "#js-toc a"
      ) as NodeListOf<HTMLLinkElement>),
    ];

    setBlogHTags(tags);
    tocLinks.current = links;
  }, [setBlogHTags]);

  const inViewCallback = useMemoizedFn((entry: IntersectionObserverEntry) => {
    const id = entry.target.getAttribute("id");
    const link = tocLinks.current.find(
      (link) => decodeURI(link.href.split("#")[1]) === id
    );
    if (link) {
      if (entry.isIntersecting) {
        link.classList.add("is-visible");
      } else {
        link.classList.remove("is-visible");
      }
    }

    tocLinks.current.forEach((link) => {
      link.classList.remove("is-active");
    });

    const firstVisibleLink = document.querySelector("#js-toc .is-visible");
    firstVisibleLink && firstVisibleLink.classList.add("is-active");
  });

  useInViewport(blogHTags, {
    callback: inViewCallback,
    threshold: 1,
  });

  return (
    <div className="max-w-5xl mx-auto relative mt-[50px]" ref={clickArea}>
      <div className="sticky top-[150px] float-right max-md:hidden">
        <ul id="js-toc" className="flex flex-col gap-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.slug}`}
                data-level={heading.level}
                className="data-[level=one]:pl-0 data-[level=one]:pt-6 data-[level=one]:font-semibold
                data-[level=two]:pl-3 data-[level=two]:pt-3 data-[level=two]:font-medium
                data-[level=three]:pl-6
                data-[level=four]:pl-9
                data-[level=five]:pl-12
                inline-block cursor-pointer
                "
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
};
