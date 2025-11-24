
import { MainLayout } from "@/layouts/MainLayout";
import { FlashCardPage } from "@/page/FlashCard";
import { HomePage } from "@/page/Home";
import { PageIntro } from "@/page/PageIntro";
import { QuizPage } from "@/page/Quiz";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PageIntro />,
    },
    {
        element: <MainLayout />,
        children: [
            { path: "/home", element: <HomePage /> },
            { path: "/flash-card", element: <FlashCardPage />, },
            { path: "/quiz", element: <QuizPage /> }
        ]
    }
]);
