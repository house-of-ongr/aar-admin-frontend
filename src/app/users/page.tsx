"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
import GridHeader from "@/components/GridHeader";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { USER_LIST } from "@/mocks/user-list";
import API_CONFIG from "@/config/api";
import { House } from "@/types/house";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/SearchComponent";
import { userSearchOptions } from "@/constants/searchOptions";

interface UserSNSInfo {
  domain: "KAKAO" | "NAVER";
  email: "string";
}

interface User {
  id: number;
  realName: string;
  nickName: string;
  phoneNumber: string;
  registeredDate: string;
  snsAccounts: UserSNSInfo[];
}

interface UserHome {
  id: number;
  title: string;
  author: string;
  description: string;
  createdDate: string;
  updatedDate: string;
}

const listHeaderTitle = [
  { name: "ID", width: "5%" },
  { name: "유저 이름", width: "10%" },
  { name: "닉네임", width: "15%" },
  { name: "이메일", width: "25%" },
  { name: "핸드폰 번호", width: "20%" },
  { name: "가입일", width: "20%" },
  { name: "", width: "5%" },
];

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [adminHouses, setAdminHouses] = useState<House[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const ITEMS_PER_PAGE = 10;
  const router = useRouter();

  const fetchUsers = async (page: number) => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/users?page=${page}&size=${ITEMS_PER_PAGE}`);
      const { users } = await response.json();
      // console.log("data", users);
      // console.log("user data", users.content.length);
      // console.log("ttl pages", users.totalPages);
      // console.log("ttl elements", users.totalElements);

      setUsers(users.content);
      setTotalPages(users.totalPages);
      setTotalItems(users.totalElements);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const searchHandler = (filter: string, query: string) => {};

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  if (users.length === 0) {
    return <div>유저가 존재하지 않습니다.</div>;
  }
  return (
    <div className="w-[80%] h-full flex flex-col">
      <div className="flex items-center border justify-between mb-10">
        <p className="font-bold text-lg"> 아오옹의 유저 총 {totalItems} 명 </p>
        <SearchComponent onSearch={searchHandler} options={userSearchOptions} />
      </div>

      <div className="flex items-center flex-col pb-4">
        <div className="w-full md:block  justify-center">
          <GridHeader headerTitles={listHeaderTitle} />
        </div>
        <ul className="w-full flex flex-col gap-3  text-sm md:text-base">
          {users.map((user, index) => (
            <li
              key={user.id}
              className="flex items-center border-b px-2 mx-4 md:px-4 py-[12px] gap-2 rounded-sm text-center"
            >
              <span style={{ width: listHeaderTitle[0].width, textAlign: "start" }}>
                {index + 1} / {user.id}
              </span>

              <div style={{ width: listHeaderTitle[1].width }}> {user.realName}</div>
              <div style={{ width: listHeaderTitle[2].width }}> {user.nickName}</div>
              <div style={{ width: listHeaderTitle[3].width }}>
                {user.snsAccounts.map(({ domain, email }, index) => (
                  <p key={index}>
                    {domain} - {email}
                  </p>
                ))}
              </div>
              <div style={{ width: listHeaderTitle[4].width }}>{user.phoneNumber}</div>
              <div style={{ width: listHeaderTitle[5].width }}>{user.registeredDate}</div>
              <div style={{ width: listHeaderTitle[6].width }}>
                <Button
                  label="집"
                  onClick={() => {
                    router.push(`/users/${user.id}`, { scroll: false });
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
