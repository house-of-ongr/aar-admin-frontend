// export interface House {
//   id: number;
//   title: string;
//   author: string;
//   createdDate: string;
//   updatedDate: string;
//   description: string;
//   imageId: number;
// }

// export interface House  {
//   title: string;
//   author: string;
//   description: string;
//   createdDate: string;
//   updatedDate: string;
//   width: number;
//   height: number;
//   borderImageId: number;
// };

// 공통 필드를 가진 베이스 타입 정의
export interface BaseHouse {
  id?: number;
  title: string;
  author: string;
  description: string;
  createdDate: string;
  updatedDate: string;
}

// 리스트 페이지에서 사용하는 타입
export interface House extends BaseHouse {
  imageId: number;
}

// 단일 하우스 상세 페이지에서 사용하는 타입
export interface HouseDetail extends BaseHouse {
  width: number;
  height: number;
  borderImageId: number;
}

export interface Room {
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  z: number;
  imageId: number;
  originalName: string;
}
