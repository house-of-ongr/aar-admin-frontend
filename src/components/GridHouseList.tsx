"use client"

import { useState } from 'react';
import { formatDate } from '@/utils/formatDate'
import { FaRegFile } from 'react-icons/fa'
import { FaRegPenToSquare } from "react-icons/fa6";
import Image from 'next/image'
import Pagination from './Pagination';
import HouseIcon from './icons/HouseIcon';
import { House } from '@/types/house';


type Props = {
    houses: House[]
}


export default function GridHouseList({ houses }: Props) {

    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 9;
    const totalItems = houses.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const currentItems = houses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (currentItems.length === 0) return <div className='text-center'>검색 결과 없어요</div>
    return (
        <div>
            <ul className="mx-5 md:mx-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {currentItems.map((house) => (
                    <li key={house.id} className="flex w-full px-2  md:py-7 md:px-3 bg-white border shadow-sm border-[#f5946d] ">
                        <div className="w-3/4 p-2"
                        >
                            <div>
                                <div className="mb-3">
                                    <span className="text-xs text-[#f5946d]"> {`AOO HOUSE NO.${house.id}`}</span>
                                </div>
                                <div className="pb-2 ">
                                    <p className="text-[13px] md:text-[15px] font-semibold text-ellipsis overflow-hidden line-clamp-2">{house.name}</p>
                                    <p className="font-thin text-xs text-stone-500">Designed by {house.designedBy}</p>
                                </div>
                            </div>
                            <div
                                className="flex gap-1 items-center text-ellipsis overflow-hidden whitespace-nowrap text-xs"
                            >
                                <FaRegFile size={12} />
                                <span>
                                    {house.fileName}
                                </span>

                            </div>
                            <div className="flex gap-1 items-center text-ellipsis overflow-hidden whitespace-nowrap text-xs"
                                suppressHydrationWarning
                            >
                                <FaRegPenToSquare size={12} />{formatDate(house.createdAt)}
                            </div>


                        </div>
                        <div className="w-1/4 flex justify-center items-center ml-2  ">
                            {/* 후보 1 */}
                            {/* <HouseIcon /> */}
                            {/* 후보 2*/}
                            <Image src="/images/house/AOO_sample_241225.png" alt="house" width={100} height={100} />
                        </div>

                    </li>))}
            </ul>
            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
        </div>
    )
}
