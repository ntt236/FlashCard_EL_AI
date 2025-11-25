import Footer from "@/components/Client/Footer"
import Header from "@/components/Client/Header"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#44444e] text-white">

            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />

        </div>
    )
}
