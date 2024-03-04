import * as React from "react";
import Link from "next/link";
import { Icons } from "./icons";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MainNavProps {
  items?: any[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex justify-between gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text">
          Travel
        </h1>
      </Link>

      <nav className="hidden gap-6 md:flex">
        {items?.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? "#" : item.href}
            className={cn(
              "flex mr-4 text-gray-700 items-center text-sm font-medium transition-colors hover:text-foreground/50 hover:text-indigo-400 lg:text-lg"
            )}
          >
            {item.title}
          </Link>
        ))}
        <Button>Login</Button>
      </nav>

      <button
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
