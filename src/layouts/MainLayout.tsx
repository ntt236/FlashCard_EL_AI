import Footer from "@/components/Client/Footer"
import Header from "@/components/Client/Header"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#29292e] text-white">

            <Header />

            <main className="flex-1 pb-14">
                <Outlet />
            </main>

            <Footer />

        </div>
    )
}
