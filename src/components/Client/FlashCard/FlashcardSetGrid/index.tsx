import type { FlashcardSetResponse } from "@/types/flashCard";
import FlashcardSetCard from "./FlashcardSetCard";

import { Loader2 } from "lucide-react";

interface GridProps {
    data: FlashcardSetResponse[];
    loading: boolean;
}

const FlashcardSetGrid = ({ data, loading }: GridProps) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin w-8 h-8 text-purple-500" />
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400 border border-dashed border-gray-700 rounded-xl mt-8">
                <p>Bạn chưa có bộ Flashcard nào.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {data.map((card) => (
                <FlashcardSetCard
                    key={card._id}
                    {...card}
                />
            ))}
        </div>
    );
};

export default FlashcardSetGrid;