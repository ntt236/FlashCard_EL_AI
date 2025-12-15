import { Link } from "react-router-dom";
import { Settings, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import type { FlashcardSetData } from "@/types/flashCard";
import { deleteFlashcardSet } from "@/service/flashcardService"; // Import hàm service vừa tạo

// Import các UI component có sẵn trong dự án của bạn
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Thêm prop onRemove để báo cho cha biết update lại list
interface FlashcardSetCardProps extends FlashcardSetData {
    onRemove?: (id: string) => void;
}

const FlashcardSetCard = ({
    _id,
    title,
    desc,
    learned,
    learning,
    newWord,
    accuracy,
    onRemove
}: FlashcardSetCardProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteFlashcardsSet = async () => {
        // 1. Xác nhận trước khi xóa
        if (!window.confirm(`Bạn có chắc chắn muốn xóa bộ thẻ "${title}" không?`)) {
            return;
        }
        if (!_id) return;

        try {
            setIsLoading(true);
            await deleteFlashcardSet(_id);
            if (onRemove) {
                onRemove(_id);
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error("Lỗi khi xóa bộ thẻ:", error);
            alert("Có lỗi xảy ra khi xóa bộ thẻ!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#1C1C28] border border-white/10 rounded-xl p-6 shadow-md transition hover:bg-[#23232E] relative group">
            {/* Loading Overlay khi đang xóa */}
            {isLoading && (
                <div className="absolute inset-0 bg-black/50 z-10 rounded-xl flex items-center justify-center">
                    <span className="text-white">Đang xóa...</span>
                </div>
            )}

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-gray-400 text-sm min-h-5 line-clamp-2">
                        {desc || "Chưa có mô tả"}
                    </p>
                </div>

                {/* Dropdown Menu cho nút Settings */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="cursor-pointer p-1 hover:bg-white/10 rounded-full transition">
                            <Settings className="w-5 h-5 text-gray-400 hover:text-white" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1C1C28] border-white/10 text-gray-200">
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                            <Edit className="w-4 h-4 mr-2" />
                            <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleDeleteFlashcardsSet}
                            className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20 focus:text-red-300"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            <span>Xóa bộ thẻ</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mt-4 flex gap-8 text-sm text-gray-300">
                <div><span className="text-green-400">{learned}</span> đã nhớ</div>
                <div><span className="text-blue-400">{learning}</span> đang học</div>
                <div><span className="text-orange-400">{newWord}</span> từ mới</div>
            </div>

            <p className="mt-4 text-gray-400 text-sm">Tiến độ học tập</p>

            <div className="w-full h-2 bg-gray-700/40 rounded-full mt-1">
                <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${accuracy}%` }}
                ></div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm bg-green-700 px-3 py-1 rounded-lg text-white">
                    {accuracy}% Chính xác
                </span>

                <Link
                    to={`/flash-card/${_id}`}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
                >
                    Học ngay
                </Link>
            </div>
        </div>
    );
};

export default FlashcardSetCard;