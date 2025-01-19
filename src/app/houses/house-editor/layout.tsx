import { ImageProvider } from "@/context/ImageContext";

export default function HouseEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ImageProvider>
      <main className="w-full h-screen">{children}</main>
    </ImageProvider>
  );
}
