"use client";

import { useState } from "react";
import Link from "next/link";
import { House } from "@/types/house";
import Pagination from "./Pagination";
import HouseCard from "./HouseCard";

type Props = {
  houses: House[];
};

export default function GridHouseList({ houses }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;
  const totalItems = houses.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentItems = houses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (currentItems.length === 0) return <div className="text-center">검색 결과가 없습니다.</div>;

  return (
    <div>
      <ul className="mx-5 md:mx-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {currentItems.map((house) => (
          <Link
            href={`/house/${house.id}`}
            key={house.id}
            className="flex w-full px-2  md:py-4 md:px-3 bg-white border shadow-sm border-[#f5946d] "
          >
            <HouseCard house={house} />
          </Link>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
    </div>
  );
}
