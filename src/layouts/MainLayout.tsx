import Footer from "@/components/Client/Footer"
import Header from "@/components/Client/Header"
import { getCurrentUser } from "@/store/auth"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth)

    useEffect(() => {

        const token = Cookies.get("accessToken");
        if (token && !user) {
            dispatch(getCurrentUser())
        }
    }, [dispatch, user])



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
