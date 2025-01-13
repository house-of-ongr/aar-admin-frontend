export default function TestPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <main className="h-screen ">{children}</main>
    </section>
  );
}
