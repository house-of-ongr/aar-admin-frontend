import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function UserListPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col pt-[100px] md:pt-[180px]">
      <Header />
      <main className="h-full flex justify-center">{children}</main>
      <Footer />
    </div>
  );
}
