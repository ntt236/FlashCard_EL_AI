import type { FlashcardSetData } from "@/types/flashCard";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";


const FlashcardSetCard = ({
    _id,
    title,
    desc,
    learned,
    learning,
    newWord,
    accuracy,
}: FlashcardSetData) => {
    return (
        <div className="bg-[#1C1C28] border border-white/10 rounded-xl p-6 shadow-md transition hover:bg-[#23232E]">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-gray-400 text-sm min-h-5">{desc || "Chưa có mô tả"}</p>
                </div>

                <button className="cursor-pointer">
                    <Settings className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
            </div>

            <div className="mt-4 flex gap-8 text-sm text-gray-300">
                <div><span className="text-green-400">{learned}</span> đã nhớ</div>
                <div><span className="text-blue-400">{learning}</span> đang học</div>
                <div><span className="text-orange-400">{newWord}</span> từ mới</div>
            </div>

            <p className="mt-4 text-gray-400 text-sm">Tiến độ học tập</p>

            <div className="w-full h-2 bg-gray-700/40 rounded-full mt-1">
                <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${accuracy}%` }}
                ></div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm bg-green-700 px-3 py-1 rounded-lg">
                    {accuracy}% Chính xác
                </span>

                <Link
                    to={`/flash-card/${_id}`}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-700 rounded-lg text-white font-medium"
                >
                    Học ngay
                </Link>
            </div>
        </div>
    );
};

export default FlashcardSetCard;
