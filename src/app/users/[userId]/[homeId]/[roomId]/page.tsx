import UserItemsEditor from "@/components/user/UserItemsEditor";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "유저의 룸 상세 페이지",
  description: "관리자가 유저의 룸에서 음원 등록과 아이템 맴핑 작업을 하는 페이지",
};

export default async function UserRoomDetailPage({ params }: { params: { roomId: string } }) {
  const { roomId } = await params;
  console.log("roomId", roomId);

  if (!roomId) {
    return <div>해당 룸을 찾을 수 없습니다.</div>;
  }
  return (
    <div>
      <UserItemsEditor roomId={Number(roomId)} />
    </div>
  );
}
