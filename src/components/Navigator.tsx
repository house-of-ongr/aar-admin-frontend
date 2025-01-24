"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "예약", href: "/reservation" },
  { label: "음원", href: "/soundsource" },
  { label: "사용자", href: "/users" },
  { label: "하우스", href: "/houses" },
];

const Navigator = () => {
  const pathName = usePathname();

  return (
    <nav className="md:pt-0 md:pb-0 lg:pt-10 lg:pb-3 pr-3  w-full flex justify-end md:justify-center text-sm">
      <ul className="flex gap-10 lg:gap-16 sm:pr-4">
        {TABS.map(({ label, href }) => {
          const isActive = pathName === href;
          return (
            <li key={label}>
              <Link
                href={href}
                scroll={false}
                className={`${isActive ? "text-black font-bold" : ""} hover:text-slate-600`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigator;
