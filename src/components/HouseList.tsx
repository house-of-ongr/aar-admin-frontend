
"use client"

import React, { useState } from 'react'
import HouseIcon from './icons/HouseIcon'
import { formatDate } from '@/utils/formatDate'
import GridHeader from './GridHeader'
import Pagination from './Pagination'
import { House } from '@/types/house'

const listHeaderTitle = [
    { name: "ID", width: "10%" },
    { name: "하우스 이름 / 작가", width: "40%" },
    { name: "생성일", width: "20%" },
    { name: "이미지", width: "20%" },
    { name: "", width: "10%" }
]

type Props = {
    houses: House[]
}

export default function HouseList({ houses }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 7;
    const totalItems = houses.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const currentItems = houses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (currentItems.length === 0) return <div className='text-center'>검색 결과 없어요</div>
    return (
        <div className="w-full h-full flex items-center flex-col pb-4">
            {/* 모바일 버전에서는 숨김 */}
            <div className="hidden md:block md:w-[70%] lg:w-[50%]  justify-center">
                <GridHeader headerTitles={listHeaderTitle} />
            </div>

            <ul className="w-full md:w-[70%] lg:w-[50%] flex flex-col gap-3 p-1 text-sm md:text-base">
                {currentItems.map((house) => (
                    <li
                        key={house.id}
                        className="flex items-center bg-white px-2 mx-4 md:px-4 py-[12px] gap-2 rounded-sm border border-[#f5946d] "
                    >
                        <div
                            style={{ width: listHeaderTitle[0].width }}
                            className="text-center"
                        >
                            {house.id}
                        </div>
                        <div
                            style={{ width: listHeaderTitle[1].width }}
                        >
                            <p className="text-ellipsis overflow-hidden line-clamp-2">{house.name}</p>
                            <p className="font-light text-xs">- Designed by {house.designedBy}</p>
                        </div>
                        <div
                            style={{ width: listHeaderTitle[2].width }}
                            className="text-center text-sm md:text-base "
                            suppressHydrationWarning
                        >
                            {formatDate(house.createdAt)}
                        </div>
                        {/* 모바일 버전에서는 숨김 */}
                        <div
                            style={{ width: listHeaderTitle[3].width }}
                            className="text-center hidden md:block text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                            {house.fileName}
                        </div>
                        <div
                            style={{ width: listHeaderTitle[4].width }}
                            className="text-center"
                        >
                            <HouseIcon />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
