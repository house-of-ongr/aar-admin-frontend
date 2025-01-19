export default function HouseDetailPage({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen">
      <main className="w-full h-full">{children}</main>
    </section>
  );
}
