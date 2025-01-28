"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GridHouseList from "@/components/GridHouseList";
import SearchComponent from "@/components/SearchComponent";
import API_CONFIG from "@/config/api";
import { House } from "@/types/house";
import { houseSearchOptions } from "@/constants/searchOptions";

export default function HouseListPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(0);

  const fetchHouses = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses?page=${pageNum + 1}&size=${size}`);

      if (!response.ok) {
        throw new Error("Failed to fetch houses");
      }
      const { houses, pagination } = await response.json();

      setHouses(houses);
      setFilteredHouses(houses);

      setTotalPages(pagination.totalPages);
      setTotalItems(pagination.totalElements);
      setSize(pagination.size);
      setPageNum(pagination.pageNumber);
    } catch (error) {
      console.error("하우스 리스트 조회 fetching error:", error);
    }
  };

  const searchHandler = (filter: string, query: string) => {
    let results = houses;
    if (filter === "house-title") {
      results = houses.filter((house) => house.title.toLowerCase().includes(query.toLowerCase()));
    } else if (filter === "author") {
      results = houses.filter((house) => house?.author?.toLowerCase().includes(query.toLowerCase()));
    } else if (filter === "all") {
      results = houses.filter(
        (house) =>
          house.title.toLowerCase().includes(query.toLowerCase()) ||
          house?.author?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredHouses(results);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="w-full h-full flex flex-col mt-[25%] md:mt-[25%] lg:mt-[15%] mb-9">
        {/* 페이지 타이틀 + 서치 컴포넌트 같은 열 */}
        <div className="pb-8 md:mx-20 flex items-start flex-col md:flex-row justify-between">
          <h1 className="font-bold text-base md:text-lg p-2 ">아・오・옹의 하우스</h1>
          <div className="flex justify-center items-center gap-5">
            <SearchComponent onSearch={searchHandler} options={houseSearchOptions} />
            <Link href={"/houses/house-editor"}>
              <Button label="+ NEW" />
            </Link>
          </div>
        </div>

        <GridHouseList
          houses={filteredHouses}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
        />
        <Footer />
      </div>
    </div>
  );
}
