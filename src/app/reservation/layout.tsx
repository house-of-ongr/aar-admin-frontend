import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ReservationPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <main className="h-screen ">{children}</main>
      <Footer />
    </section>
  );
}
