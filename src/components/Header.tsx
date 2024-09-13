"use client";
import clsx from "clsx";
import { FileText, Github, House, Linkedin, Logs } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const links = [
  { icon: House, to: "/", disabled: false },
  { icon: FileText, to: "/docs", disabled: true },
  { icon: Logs, to: "/urls", disabled: true, div: true },
  {
    icon: Github,
    to: "http://github.com/reinaldo-silva/linky.git",
    disabled: false,
    blankPage: true,
  },
  {
    icon: Linkedin,
    to: "https://www.linkedin.com/in/reinaldo-silvat/",
    disabled: false,
    blankPage: true,
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed flex items-center top-0 gap-3 left-1/2 -translate-x-1/2 p-8">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <Fragment key={index}>
            <Link
              href={link.disabled ? pathname : link.to}
              className={clsx("p-2 rounded-xl transition-all duration-75", {
                "hover:bg-gradient-to-br from-zinc-950 to-zinc-600 hover:text-zinc-100":
                  !link.disabled,
                "opacity-40 cursor-not-allowed": link.disabled,
                "bg-gradient-to-br from-zinc-800 to-zinc-400 text-zinc-100":
                  pathname === link.to,
              })}
              target={link.blankPage ? "_blank" : "_self"}
            >
              <Icon size={28} />
            </Link>
            {link.div && <div className="border border-zinc-800 h-9" />}
          </Fragment>
        );
      })}
    </header>
  );
}

export function HeaderLoading() {
  return (
    <header className="fixed flex items-center top-0 gap-3 left-1/2 -translate-x-1/2 p-8">
      {links.map((link, index) => {
        return (
          <Fragment key={index}>
            <div className="size-11 bg-zinc-300 animate-pulse rounded-xl" />
            {link.div && <div className="border border-zinc-800 h-9" />}
          </Fragment>
        );
      })}
    </header>
  );
}
