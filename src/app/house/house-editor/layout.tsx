import { ImageProvider } from "@/context/ImageContext";

export default function HouseEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ImageProvider>
      <section className="h-screen">
        <main className="w-full h-full">{children}</main>
      </section>
    </ImageProvider>
  );
}
