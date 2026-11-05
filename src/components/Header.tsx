"use client";
import { Github, Linkedin } from "@/components/icons";
import clsx from "clsx";
import { FileText, House, Logs } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const links = [
  { icon: House, to: "/" },
  { icon: FileText, to: "/docs" },
  { icon: Logs, to: "/urls", divider: true },
  {
    icon: Github,
    to: "https://github.com/reinaldo-silva/linky",
    external: true,
  },
  {
    icon: Linkedin,
    to: "https://www.linkedin.com/in/reinaldo-silvat/",
    external: true,
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed flex items-center justify-center sm:max-w-[460px] md:max-w-3xl w-full top-0 gap-3 left-1/2 -translate-x-1/2 p-8 py-6 bg-zinc-50/40 backdrop-blur-xs border-b-2">
      {links.map(({ icon: Icon, to, divider, external }) => (
        <Fragment key={to}>
          <Link
            href={to}
            className={clsx(
              "p-2 rounded-xl transition-all duration-75 hover:bg-linear-to-br from-zinc-950 to-zinc-600 hover:text-zinc-100",
              {
                "bg-linear-to-br from-zinc-800 to-zinc-400 text-zinc-100":
                  pathname === to,
              }
            )}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon size={28} />
          </Link>
          {divider && <div className="border border-zinc-800 h-9" />}
        </Fragment>
      ))}
    </header>
  );
}

export function HeaderLoading() {
  return (
    <header className="fixed flex items-center top-0 gap-3 left-1/2 -translate-x-1/2 p-8 py-6 bg-zinc-50/40 backdrop-blur-xs border-b-2">
      {links.map(({ to, divider }) => (
        <Fragment key={to}>
          <div className="size-11 bg-zinc-200 animate-pulse rounded-xl" />
          {divider && <div className="border border-zinc-800 h-9" />}
        </Fragment>
      ))}
    </header>
  );
}
