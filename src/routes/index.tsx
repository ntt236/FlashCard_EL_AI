
import { PageIntro } from "@/page/PageIntro";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PageIntro />,
        children: [
            { index: true, }

        ],
    },
]);
