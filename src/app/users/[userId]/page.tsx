"use client";

import Button from "@/components/buttons/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Modal from "@/components/Modal";
import HomeCard from "@/components/user/HomeCard";
import HousesTemplate, { AdminHouse } from "@/components/user/HouseTemplates";
import API_CONFIG from "@/config/api";
import { BaseHouse } from "@/types/house";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UserHome {
  id: number;
  name: string;
  createdDate: string;
  updatedDate: string;
  baseHouse: BaseHouse;
  user: { id: number; nickname: string };
}

export default function UserHomeListPage() {
  const params = useParams<{ userId: string }>();
  const [userHomes, setUserHomes] = useState<UserHome[] | null>(null);
  const [adminHouses, setAdminHouses] = useState<AdminHouse[] | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [homeToDelete, setHomeToDelete] = useState<number | null>(null);
  const [newHomeId, setNewHomeId] = useState<number | null>(null);

  const router = useRouter();
  const closeModal = () => {
    setIsOpenModal(false);
    setHomeToDelete(null);
  };

  const fetchUserHomes = async (userId: string) => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/users/${userId}/homes`);
      const data = await response.json();
      console.log("!", data.homes[0].user.nickname);
      setUserHomes(data.homes);
    } catch (error) {
      console.error("Failed to fetch user homes:", error);
    }
  };

  const getAdminHouseList = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses`);
      if (!response.ok) {
        throw new Error("Failed to fetch houses");
      }
      const { houses } = await response.json();
      // 유저가 가지고 있는 하우스 ID 리스트 추출
      const houseTemplateIds = userHomes ? userHomes.map((home) => home.baseHouse.id) : [];
      const filteredHouses = houses.filter((house: AdminHouse) => !houseTemplateIds.includes(house.id));
      setAdminHouses(filteredHouses);
      setIsOpenModal(true);
    } catch (error) {
      console.error("유저의 집 목록 페이지에서 관리자 하우스 목록 fetching error:", error);
    }
  };

  // 유저에게 홈 할당
  const registHomeToUsertHandler = async (houseId: number) => {
    const userId = parseInt(params.userId);
    if (!userId || !houseId) {
      console.error("Invalid userId or houseId");
      return;
    }
    console.log(userId, houseId);
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/homes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          houseId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to assign house to user");
      }

      const result = await response.json();
      setNewHomeId(result.createdHomeId);
      fetchUserHomes(params.userId);
      setIsOpenModal(false);
    } catch (error) {
      console.log("유저에게 홈 할당 에러 발생", error);
    }
  };

  // 유저의 홈 상세페이지로 이동
  // 하우스 템플릿 아이디 로컬스토리지에 저장
  const navigateUserHome = (homeId: number) => {
    if (homeId) {
      const selectedHome = userHomes?.find((home) => home.id === homeId);
      if (selectedHome) {
        localStorage.setItem("houseId", JSON.stringify(selectedHome.baseHouse.id));
      }
      router.push(`/users/${params.userId}/${homeId}`);
    }
  };
  //  홈 삭제 핸들러
  const homeDeleteHandler = async (homeId: number) => {
    if (!homeToDelete) {
      console.error("No home selected for deletion");
      return;
    }

    const userId = parseInt(params.userId);
    if (!userId || !homeId) {
      console.error("Invalid userId or homeId");
      return;
    }
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/homes/${homeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to assign house to user");
      }
      const { message } = await response.json();
      fetchUserHomes(params.userId);
      closeModal();
      console.log("유저의 집 삭제 성공:", message);
    } catch (error) {
      console.log("유저의 홈 삭제 에러 발생", error);
    }
  };
  useEffect(() => {
    fetchUserHomes(params.userId);
    localStorage.setItem("userId", JSON.stringify(params.userId));
  }, [setUserHomes]);

  if (!userHomes)
    return (
      <div className="w-full h-full flex-center">
        <SpinnerIcon />
      </div>
    );
  else {
    return (
      <div className="w-full flex flex-col items-center">
        <Header />
        <section className="w-full h-full flex justify-center  mt-[25%] md:mt-[25%] lg:mt-[15%] mb-[5%]">
          <div className="w-1/2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">
                {userHomes[0].user.nickname} 님의 집 ({`${userHomes.length}`}){" "}
              </h3>
              <Button label="+ ADD" onClick={getAdminHouseList} />
            </div>

            {userHomes.length === 0 ? (
              <div className="h-[300px] flex-center">해당 유저에게 할당된 집이 존재하지 않습니다.</div>
            ) : (
              <ul className="mt-10 grid grid-cols-2 gap-4">
                {userHomes.map((home) => (
                  <HomeCard
                    key={home.id}
                    home={home}
                    isNew={home.id === newHomeId}
                    onNavigate={navigateUserHome}
                    onDelete={setHomeToDelete}
                  />
                ))}
              </ul>
            )}
          </div>

          {isOpenModal && adminHouses && (
            <Modal onClose={closeModal}>
              <HousesTemplate adminHouses={adminHouses} registHomeToUsertHandler={registHomeToUsertHandler} />
            </Modal>
          )}

          {homeToDelete && (
            <Modal onClose={closeModal}>
              <div className="p-6 text-center">
                <p className="mb-4">유저의 홈 ID# {homeToDelete}을 삭제하시겠습니까?</p>
                <div className="flex justify-center gap-4">
                  <Button label="확인" onClick={() => homeDeleteHandler(homeToDelete)} />
                  <Button label="취소" onClick={closeModal} />
                </div>
              </div>
            </Modal>
          )}
        </section>
        <Footer />
      </div>
    );
  }
}
