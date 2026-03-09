"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from 'react';

interface NavLinkCompatProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkCompatProps>(({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      ref={ref}
      className={cn(className, isActive && activeClassName)}
      {...props}
    />
  );
});

NavLink.displayName = "NavLink";

export { NavLink };
