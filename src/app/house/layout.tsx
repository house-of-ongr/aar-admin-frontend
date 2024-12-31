import Logo from "@/components/Logo"

export default function HouseListPageLayout({
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