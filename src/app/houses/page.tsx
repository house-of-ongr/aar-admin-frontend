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
  // const [size, setSize] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(0);
  const ITEMS_PER_PAGE = 9;

  const fetchHouses = async (page: number) => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses?page=${pageNum + 1}&size=${ITEMS_PER_PAGE}`);
      // const response = await fetch(`${API_CONFIG.BACK_API}/houses`);

      if (!response.ok) {
        throw new Error("Failed to fetch houses");
      }
      const data = await response.json();
      console.log("houselist", data);

      setHouses(data.houses);
      setFilteredHouses(data.houses);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.totalElements);
      // setSize(data.pagination.size);
      setPageNum(data.pagination.pageNumber);
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
    fetchHouses(currentPage);
  }, [currentPage]);

  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col pt-[100px] md:pt-[180px]">
        <div className="px-10 md:px-20 py-2 flex justify-between items-center mb-2">
          <h1 className="text-xl ">AOO HOUSE</h1>
          <div className="flex-center gap-5 ">
            <SearchComponent onSearch={searchHandler} options={houseSearchOptions} />
            <Link href={"/houses/house-editor"}>
              <Button label="NEW" />
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
    </>
  );
}
