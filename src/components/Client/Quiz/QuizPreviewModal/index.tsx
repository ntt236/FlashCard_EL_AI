import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, CheckCircle2 } from "lucide-react";
import { updateQuiz } from "@/service/quizService";


interface QuizPreviewModalProps {
    quiz: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onPublish: () => void; // Hàm chạy khi bấm Xuất bản
}

export const QuizPreviewModal = ({ quiz, open, onOpenChange, onPublish }: QuizPreviewModalProps) => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Load dữ liệu vào state cục bộ để sửa
    useEffect(() => {
        if (quiz) {
            setQuestions(JSON.parse(JSON.stringify(quiz.questions))); // Deep copy để không dính reference
        }
    }, [quiz]);

    // Hàm sửa nội dung câu hỏi
    const handleChangeQuestion = (index: number, field: string, value: string) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    // Hàm sửa đáp án (A, B, C, D)
    const handleChangeOption = (qIndex: number, optIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[optIndex] = value;

        // Nếu sửa option trùng với đáp án đúng, nhớ update lại đáp án đúng luôn (nếu cần logic này)
        // Ở đây mình giữ đơn giản là chỉ sửa text hiển thị
        setQuestions(newQuestions);
    };

    // Hàm xóa 1 câu hỏi lẻ
    const handleDeleteQuestion = (index: number) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    // Lưu lại xuống DB (Khi bấm Xuất bản hoặc Lưu)
    const handleSaveAndPublish = async () => {
        try {
            setLoading(true);
            // Gọi API Update
            await updateQuiz(quiz._id, { ...quiz, questions: questions });
            onPublish(); // Báo cho cha biết là xong rồi
        } catch (error) {
            console.error("Lỗi lưu:", error);
            alert("Không thể lưu thay đổi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col bg-[#1C1C28] text-white border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-purple-400">Xem trước & Chỉnh sửa: {quiz?.title}</DialogTitle>
                </DialogHeader>

                {/* Vùng cuộn danh sách câu hỏi */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 py-4">
                    {questions.map((q, index) => (
                        <div key={index} className="p-4 bg-[#2D2D3A] rounded-xl border border-white/5 relative group">
                            {/* Nút xóa câu hỏi */}
                            <button
                                onClick={() => handleDeleteQuestion(index)}
                                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                title="Xóa câu này"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex gap-3 mb-3">
                                <span className="font-bold text-purple-400 mt-1">Câu {index + 1}:</span>
                                <Textarea
                                    value={q.question}
                                    onChange={(e) => handleChangeQuestion(index, 'question', e.target.value)}
                                    className="bg-[#1C1C28] border-white/10 min-h-[60px]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
                                {q.options.map((opt: string, optIndex: number) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${q.correctAnswer === opt ? 'bg-green-600 text-white' : 'bg-gray-600'}`}>
                                            {String.fromCharCode(65 + optIndex)}
                                        </span>
                                        <Input
                                            value={opt}
                                            onChange={(e) => handleChangeOption(index, optIndex, e.target.value)}
                                            className={`bg-[#1C1C28] border-white/10 h-9 ${q.correctAnswer === opt ? 'border-green-500/50 text-green-400' : ''}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 pl-10">
                                <label className="text-xs text-gray-500">Giải thích:</label>
                                <Input
                                    value={q.explanation || ""}
                                    onChange={(e) => handleChangeQuestion(index, 'explanation', e.target.value)}
                                    className="bg-[#1C1C28] border-white/10 h-8 text-sm text-gray-400 italic"
                                    placeholder="Thêm giải thích..."
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter className="mt-4 border-t border-white/10 pt-4">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-white">
                        Đóng (Không lưu)
                    </Button>
                    <Button
                        onClick={handleSaveAndPublish}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
                    >
                        {loading ? "Đang lưu..." : <><CheckCircle2 size={18} /> Lưu & Xuất bản</>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};