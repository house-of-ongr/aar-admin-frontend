"use client";

import React, { useEffect, useState } from "react";
import GridHeader from "@/components/GridHeader";
import Pagination from "@/components/Pagination";
import API_CONFIG from "@/config/api";
import SearchComponent from "@/components/SearchComponent";
import { userSearchOptions } from "@/constants/searchOptions";
import { User } from "@/types/user";
import { userListHeaderTitles } from "@/constants/listHeader";
import UserListItem from "@/components/user/UserListItem";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [size, setSize] = useState<number>(0);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/users?page=${currentPage}&size=${size}`);
      const { users, pagination } = await response.json();

      setUsers(users);
      setTotalPages(pagination.totalPages);
      setTotalItems(pagination.totalElements);
      setSize(pagination.size);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  //current page 에서만 서치 가능한 로직 - 다른페이지에서도 해당 검색어로 찾으려면 아래와같이 별도 api 필요함
  // `${API_CONFIG.BACK_API}/users/search?filter=${filter}&query=${encodeURIComponent(query)}`;

  const searchHandler = (filter: string, query: string) => {
    let results = users;

    if (filter === "nickname") {
      results = users.filter((user) => user.nickName.toLowerCase().includes(query.toLowerCase()));
    } else if (filter === "realname") {
      results = users.filter((user) => user.realName.toLowerCase().includes(query.toLowerCase()));
    } else if (filter === "phone-number") {
      results = users.filter((user) => user.phoneNumber.replace(/-/g, "").includes(query.replace(/-/g, "")));
    } else if (filter === "all") {
      results = users.filter(
        (user) =>
          user.nickName.toLowerCase().includes(query.toLowerCase()) ||
          user.realName.toLowerCase().includes(query.toLowerCase()) ||
          user.phoneNumber.replace(/-/g, "").includes(query.replace(/-/g, ""))
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  {
    return (
      <div className="w-full flex flex-col items-center">
        <Header />
        <div className="w-[60%] flex flex-col mt-[25%] md:mt-[25%] lg:mt-[15%]  mb-9">
          <div className="flex items-start flex-col md:flex-row justify-between">
            <h1 className="font-bold text-base lg:text-lg">
              아・오・옹의 유저 {totalItems !== 0 && `|  ${totalItems} 명`}
            </h1>
            <SearchComponent onSearch={searchHandler} options={userSearchOptions} />
          </div>

          <div className="flex items-center flex-col py-4">
            <GridHeader headerTitles={userListHeaderTitles} />
            {!users || (users.length === 0 && <div className="py-10 ">유저가 존재하지 않습니다.</div>)}

            {users && (
              <ul className="w-full flex flex-col gap-3 ">
                {users.map((user, index) => {
                  return <UserListItem key={user.id} index={index} user={user} currentPage={currentPage} size={size} />;
                })}
              </ul>
            )}
          </div>
          {totalPages !== 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
