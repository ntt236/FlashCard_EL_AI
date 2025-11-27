import ProtectedRoute from "@/components/Client/auth/ProtectedRoute";
import { MainLayout } from "@/layouts/MainLayout";
import LoginPage from "@/page/Auth/LoginPage";
import { FlashCardPage } from "@/page/FlashCard";
import { HomePage } from "@/page/Home";
// import { PageIntro } from "@/page/PageIntro";
import { QuizPage } from "@/page/Quiz";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/home",
                element: <HomePage />,
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
    },


    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    // { path: "/home", element: <HomePage /> },
                    { path: "/flash-card", element: <FlashCardPage /> },
                    { path: "/quiz", element: <QuizPage /> }
                ]
            }
        ]
    }
]);