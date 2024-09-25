"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "~/lib/utils";

interface ActiveLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const ActiveLink = ({
  children,
  href,
  className,
  ...props
}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        className,
        "text-shadow-hover",
        isActive ? "text-shadow" : ""
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};
