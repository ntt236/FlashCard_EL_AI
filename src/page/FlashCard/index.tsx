import { useEffect, useState } from "react";
import HeaderSection from "@/components/Client/FlashCard/HeaderSection";
import FlashcardSetGrid from "@/components/Client/FlashCard/FlashcardSetGrid";
// import { getMyFlashcardSets } from "@/services/flashcardService";
import type { FlashcardSetResponse } from "@/types/flashCard";
import { getMyFlashcardSets } from "@/service/flashcardService";
// import { FlashcardSetResponse } from "@/types/flashcard";

export const FlashCardPage = () => {
    // State nằm ở cha
    const [flashcards, setFlashcards] = useState<FlashcardSetResponse[]>([]);
    const [loading, setLoading] = useState(true);

    // Hàm fetch data
    const fetchData = async () => {
        try {
            // setLoading(true); // Có thể bật loading nếu muốn hiệu ứng load lại toàn trang
            const data = await getMyFlashcardSets();
            setFlashcards(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Gọi lần đầu
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Truyền hàm fetchData xuống Header để Modal dùng */}
            <HeaderSection{...({ onRefresh: fetchData } as any)} />

            {/* Truyền dữ liệu xuống Grid để hiển thị */}
            <FlashcardSetGrid{...({ data: flashcards, loading } as any)} />
        </div>
    );
};