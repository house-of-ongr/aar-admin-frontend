import Link from "next/link";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HouseImgContainer from "@/components/InitHouseImage";

import InitText from "@/components/InitText";

export default function Home() {
  return (
    <div className="flex-center h-full">
      <Header />
      <main className="flex flex-col flex-center">
        <InitText />
        <Link href={"/login"}>
          <HouseImgContainer />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
