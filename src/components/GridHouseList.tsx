"use client";

import Link from "next/link";
import { House } from "@/types/house";
import Pagination from "./Pagination";
import HouseCard from "./HouseCard";

type Props = {
  houses: House[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  totalItems?: number;
};

export default function GridHouseList({ houses, currentPage, onPageChange, totalPages, totalItems }: Props) {
  if (houses.length === 0) return <div className="text-center">검색 결과가 없습니다.</div>;

  return (
    <div>
      <ul className="mx-5 md:mx-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {houses.map((house) => (
          <Link
            href={`/house/${house.id}`}
            key={house.id}
            className="flex w-full px-2  md:py-4 md:px-3 bg-white border shadow-sm border-[#f5946d] "
          >
            <HouseCard house={house} />
          </Link>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
