"use client"

import Link from 'next/link'
import React from 'react'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HouseImgContainer from '@/components/InitHouseImage';
import { motion } from 'framer-motion';




export default function Home() {
  return (
    <div className="flex-center h-full">
      <Header />
      <main className='flex flex-col flex-center'>


        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ duration: 0.5 }}>
          <p className='text-center'>웰컴 메세지 텍스트 1</p>
          <p className='text-center'>웰컴 메세지 텍스트 2</p>
        </motion.div>

        <Link href={"/login"}>
          <HouseImgContainer />
        </Link>
      </main>
      <Footer />
    </div >
  );
}