import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { formatDate } from "@/utils/formatDate";
import SNSLabel from "../label/SNSLabel";
import CircleButton from "../buttons/CircleButton";
import { TbHomePlus } from "react-icons/tb";
import { IoMdPhonePortrait } from "react-icons/io";

interface UserListItemProps {
  user: User;
  currentPage: number;
  size: number;
  index: number;
}

export default function UserListItem({ user, currentPage, size, index }: UserListItemProps) {
  const router = useRouter();
  const listNumber = (currentPage - 1) * size + index + 1;

  return (
    <li key={user.id} className="flex items-center py-[12px] text-center rounded-md bg-[#fbfafa] ">
      <span style={{ width: "5%" }}>{listNumber}</span>
      <div className="flex flex-col pl-10 pr-3  items-start" style={{ width: "20%" }}>
        <span>{user.realName}</span>
        <span className="text-gray-500 text-sm break-words">#{user.nickName}</span>
      </div>
      <div style={{ width: "25%" }}>
        {user.snsAccounts.map(({ domain, email }, index) => (
          <div key={index} className="flex px-2 gap-2 mb-1">
            <SNSLabel sns={domain} />
            <span>{email}</span>
          </div>
        ))}
      </div>
      <div className="flex-center gap-1" style={{ width: "20%" }}>
        <IoMdPhonePortrait />
        <span>{user.phoneNumber}</span>
      </div>

      <div style={{ width: "15%" }}>{formatDate(user.registeredDate)}</div>
      <div style={{ width: "15%" }}>
        <CircleButton
          label={<TbHomePlus size={25} color="#352f2f" className="hover:text-white" />}
          onClick={() => {
            router.push(`/users/${user.id}`, { scroll: false });
          }}
        />
      </div>
    </li>
  );
}
