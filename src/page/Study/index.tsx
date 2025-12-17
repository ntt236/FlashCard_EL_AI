import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFlashcardSetDetail, reviewFlashcard } from "@/service/flashcardService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, RotateCw, CheckCircle2, Circle, RefreshCw, Loader2 } from "lucide-react";

export const StudyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Flashcard States
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchSet = async () => {
            try {
                const data = await getFlashcardSetDetail(id);
                // Bạn có thể lọc chỉ lấy những thẻ CẦN HỌC (status != learned HOẶC nextReviewDate <= now)
                // Ở đây mình lấy hết để demo
                if (data.cards) setCards(data.cards);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSet();
    }, [id]);

    const handleReview = async (status: 'new' | 'learning' | 'learned') => {
        if (!id || !cards[currentIndex]) return;

        // Gọi API cập nhật
        await reviewFlashcard(id, cards[currentIndex]._id, status);

        // Chuyển thẻ
        setIsFlipped(false);
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-[#09090B] text-white p-6 flex flex-col items-center">
            {/* Header nhỏ */}
            <div className="w-full max-w-4xl flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full mr-4">
                    <ArrowLeft />
                </button>
                <h1 className="text-xl font-bold">Chế độ Luyện Tập</h1>
            </div>

            <Tabs defaultValue="flashcard" className="w-full max-w-4xl">
                <TabsList className="grid w-full grid-cols-2 bg-[#1C1C28]">
                    <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz (Trắc nghiệm)</TabsTrigger>
                </TabsList>

                {/* --- TAB FLASHCARDS --- */}
                <TabsContent value="flashcard" className="flex flex-col items-center mt-8">

                    {isFinished ? (
                        <div className="text-center py-12 bg-[#1C1C28] rounded-2xl w-full border border-white/10">
                            <h2 className="text-3xl font-bold text-green-400 mb-2">Đã hoàn thành! 🎉</h2>
                            <p className="text-gray-400 mb-6">Bạn đã ôn tập hết bộ thẻ này.</p>
                            <button
                                onClick={() => { setIsFinished(false); setCurrentIndex(0); }}
                                className="bg-white/10 px-6 py-2 rounded-lg hover:bg-white/20"
                            >
                                Học lại từ đầu
                            </button>
                        </div>
                    ) : (
                        cards.length > 0 && (
                            <>
                                <p className="text-gray-500 mb-4 text-sm">Thẻ {currentIndex + 1} / {cards.length}</p>

                                {/* KHI VỰC THẺ (LẬT) */}
                                <div
                                    className="relative w-full max-w-xl h-80 cursor-pointer perspective-1000 group mb-8"
                                    onClick={() => setIsFlipped(!isFlipped)}
                                >
                                    <div className={`relative w-full h-full duration-500 transition-all transform preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

                                        {/* Mặt trước */}
                                        <div className="absolute inset-0 backface-hidden bg-[#1C1C28] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 shadow-xl">
                                            <span className="text-xs text-gray-500 uppercase mb-4">Term</span>
                                            <h2 className="text-4xl font-bold">{cards[currentIndex].term}</h2>
                                            <p className="mt-6 text-indigo-400 text-sm flex items-center gap-2"><RotateCw size={14} /> Nhấn để lật</p>
                                        </div>

                                        {/* Mặt sau */}
                                        <div className="absolute inset-0 backface-hidden bg-[#1C1C28] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 shadow-xl rotate-y-180" style={{ transform: 'rotateY(180deg)' }}>
                                            <span className="text-xs text-gray-500 uppercase mb-2">Definition</span>
                                            <h2 className="text-2xl font-semibold text-center">{cards[currentIndex].definition}</h2>
                                            {cards[currentIndex].phonetic && <p className="text-gray-500 italic mt-2">{cards[currentIndex].phonetic}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* KHU VỰC NÚT ĐÁNH GIÁ (Chỉ hiện khi đã lật) */}
                                {!isFlipped ? (
                                    <button onClick={() => setIsFlipped(true)} className="w-full max-w-xl py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700">
                                        Hiện đáp án
                                    </button>
                                ) : (
                                    <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
                                        <button
                                            onClick={() => handleReview('new')}
                                            className="flex flex-col items-center p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                                        >
                                            <RefreshCw className="mb-1 w-5 h-5" />
                                            <span className="font-bold">Cần ôn tập</span>
                                        </button>

                                        <button
                                            onClick={() => handleReview('learning')}
                                            className="flex flex-col items-center p-3 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20"
                                        >
                                            <Circle className="mb-1 w-5 h-5" />
                                            <span className="font-bold">Đang nhớ</span>
                                        </button>

                                        <button
                                            onClick={() => handleReview('learned')}
                                            className="flex flex-col items-center p-3 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                                        >
                                            <CheckCircle2 className="mb-1 w-5 h-5" />
                                            <span className="font-bold">Đã thuộc</span>
                                        </button>
                                    </div>
                                )}
                            </>
                        )
                    )}
                </TabsContent>

                {/* --- TAB QUIZ --- */}
                <TabsContent value="quiz">
                    <div className="bg-[#1C1C28] border border-white/10 p-8 rounded-2xl text-center mt-8">
                        <h3 className="text-lg font-bold mb-2">Quiz Mode</h3>
                        <p className="text-gray-400">Tính năng trắc nghiệm sẽ sớm được cập nhật tại đây.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};