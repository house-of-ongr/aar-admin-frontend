"use client";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import GridHouseList from "@/components/GridHouseList";
import Header from "@/components/Header";
import SearchComponent from "@/components/SearchComponent";
import { HOUSE_LIST } from "@/mocks/house-list";
import { House } from "@/types/house";
import Link from "next/link";
import { useState } from "react";

export default function HouseListPage() {
  const [filteredHouses, setFilteredHouses] = useState<House[]>(HOUSE_LIST);

  const searchHandler = (filter: string, query: string) => {
    let results = HOUSE_LIST;
    if (filter === "name") {
      results = HOUSE_LIST.filter((house) => house.name.toLowerCase().includes(query.toLowerCase()));
    } else if (filter === "designer") {
      results = HOUSE_LIST.filter((house) => house?.author?.toLowerCase().includes(query.toLowerCase()));
    } else if (filter === "all") {
      results = HOUSE_LIST.filter(
        (house) =>
          house.name.toLowerCase().includes(query.toLowerCase()) ||
          house?.author?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredHouses(results);
  };

  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col pt-[100px] md:pt-[180px]">
        <div className="px-10 md:px-20 py-2 flex justify-between items-center mb-2">
          <h1 className="text-xl ">AOO HOUSE</h1>
          <div className="flex-center gap-5 ">
            <SearchComponent onSearch={searchHandler} />
            <Link href={"/house/house-editor"}>
              <Button label="CREATE" />
            </Link>
          </div>
        </div>
        <GridHouseList houses={filteredHouses} />
        <Footer />
      </div>
    </>
  );
}
