import Header from "@/components/Header"
import { ImageProvider } from "@/context/ImageContext"


export default function HouseListPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="h-screen">
            <Header />
            <ImageProvider>
                <main className="w-full h-full" >
                    {children}
                </main>
            </ImageProvider>
        </section>
    )
}