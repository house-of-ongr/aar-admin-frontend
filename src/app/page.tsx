"use client";

import Link from "next/link";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HouseImgContainer from "@/components/InitHouseImage";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex-center h-full">
      <Header />
      <main className="flex flex-col flex-center">
        <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -30 }} transition={{ duration: 0.5 }}>
          <h2 className="text-center text-lg">모든 소리가 기록되는 곳,</h2>
          <h2 className="text-center text-lg">'아카이브 오브 옹알'에 오신 것을 환영해요!</h2>
        </motion.div>
        <Link href={"/login"}>
          <HouseImgContainer />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
