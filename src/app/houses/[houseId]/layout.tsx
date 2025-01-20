import { RoomProvider } from "@/context/RoomsContext";

export default function HouseDetailPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoomProvider>
      <main className="w-full h-screen">{children}</main>
    </RoomProvider>
  );
}
