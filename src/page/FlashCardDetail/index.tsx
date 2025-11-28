import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Volume2 } from "lucide-react";

import { AddCardModal } from "@/components/Client/FlashCard/AddCardModal";
import type { FlashcardSetResponse } from "@/types/flashCard";
import { getFlashcardSetDetail } from "@/service/flashcardService";

export const FlashCardDetailPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();

    const [setData, setSetData] = useState<FlashcardSetResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDetail = async () => {
        if (!id) return;
        try {
            // setLoading(true); // Không cần set loading toàn trang khi refresh
            const data = await getFlashcardSetDetail(id);
            setSetData(data);
        } catch (error) {
            console.error("Lỗi tải chi tiết:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    if (loading) return <div className="flex justify-center pt-20"><Loader2 className="animate-spin text-purple-500" /></div>;
    if (!setData) return <div className="text-center pt-20 text-red-500">Không tìm thấy bộ thẻ!</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Header: Back + Title + Add Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/flash-card")} className="p-2 hover:bg-white/10 rounded-full transition">
                        <ArrowLeft className="text-white" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{setData.title}</h1>
                        <p className="text-gray-400 text-sm">{setData.desc || "Không có mô tả"}</p>
                    </div>
                </div>

                {/* MODAL THÊM THẺ Ở ĐÂY */}
                <AddCardModal setId={setData._id} onSuccess={fetchDetail} />
            </div>

            {/* List Cards */}
            <div className="grid grid-cols-1 gap-4">
                {setData?.cards && setData.cards.length > 0 ? (
                    setData.cards.map((card: any, index: number) => (
                        <div key={index} className="bg-[#1C1C28] p-6 rounded-xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-purple-500/50 transition">

                            {/* Cột trái: Term + IPA */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-purple-400">{card.term}</h3>
                                    {card.phonetic && <span className="text-gray-500 text-sm font-mono">/{card.phonetic}/</span>}
                                    <button className="text-gray-500 hover:text-purple-400"><Volume2 size={18} /></button>
                                </div>
                                <span className="text-xs text-gray-500 italic mt-1 block">{card.type}</span>
                            </div>

                            {/* Cột phải: Definition + Example */}
                            <div className="flex-1 md:text-right md:border-l md:border-white/10 md:pl-6 w-full">
                                <p className="text-lg text-white font-medium">{card.definition}</p>
                                {/* Nếu có ví dụ thì hiện 1 cái */}
                                {card.examples && card.examples.length > 0 && (
                                    <p className="text-sm text-gray-400 mt-2 italic">
                                        "{card.examples[0].en}"
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 text-gray-500 border border-dashed border-gray-700 rounded-xl">
                        Chưa có thẻ nào. Hãy bấm "Thêm thẻ mới" để bắt đầu!
                    </div>
                )}
            </div>
        </div>
    );
};