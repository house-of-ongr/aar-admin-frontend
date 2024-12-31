export default function ReservationPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <main className="h-screen">
                {children}
            </main>
        </section>
    )
}