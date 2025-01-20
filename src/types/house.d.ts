export interface BaseHouse {
  id?: number;
  title: string;
  author: string;
  description: string;
  createdDate: string;
  updatedDate: string;
}

// 리스트 페이지에서 사용하는 하우스 타입
export interface House extends BaseHouse {
  imageId: number;
}

// 단일 하우스 상세 페이지에서 사용하는 타입
export interface HouseDetail extends BaseHouse {
  width: number;
  height: number;
  borderImageId: number;
  houseId: number;
}

export interface Room {
  name: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  imageId: number;
  roomId: number;
  originalName?: string;
}
