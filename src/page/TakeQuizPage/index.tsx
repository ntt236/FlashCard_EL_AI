import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Loader2, ArrowRight, CheckCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { getQuizDetail } from "@/service/quizService";

export const TakeQuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // State quản lý việc làm bài
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({}); // Lưu đáp án user chọn: { 0: "A", 1: "C" }
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const data = await getQuizDetail(id);
                setQuiz(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    // Chọn đáp án
    const handleSelectOption = (option: string) => {
        if (isSubmitted) return; // Nộp rồi thì không cho chọn lại
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: option
        });
    };

    // Nộp bài
    const handleSubmit = () => {
        let correctCount = 0;
        quiz.questions.forEach((q: any, index: number) => {
            if (selectedAnswers[index] === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsSubmitted(true);
    };

    if (loading) return <div className="flex justify-center pt-20"><Loader2 className="animate-spin text-purple-500" /></div>;
    if (!quiz) return <div className="text-center pt-20 text-white">Không tìm thấy bài thi</div>;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    // --- GIAO DIỆN KẾT QUẢ (SAU KHI NỘP) ---
    if (isSubmitted) {
        const percentage = Math.round((score / quiz.questions.length) * 100);
        return (
            <div className="max-w-2xl mx-auto px-6 py-20 text-center text-white">
                <div className="bg-[#1C1C28] p-10 rounded-3xl border border-white/10 shadow-2xl">
                    <h2 className="text-3xl font-bold mb-4">Kết Quả Bài Thi</h2>
                    <div className="text-6xl font-black text-purple-400 mb-4">{score} / {quiz.questions.length}</div>
                    <p className="text-xl text-gray-300 mb-8">Bạn đã trả lời đúng <span className="font-bold">{percentage}%</span> câu hỏi.</p>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-[#2D2D3A] rounded-xl font-bold flex items-center gap-2 hover:bg-white/10"
                        >
                            <RefreshCw size={20} /> Làm lại
                        </button>
                        <button
                            onClick={() => navigate('/quiz')}
                            className="px-6 py-3 bg-purple-600 rounded-xl font-bold text-white hover:bg-purple-700"
                        >
                            Danh sách bài thi
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- GIAO DIỆN LÀM BÀI ---
    return (
        <div className="max-w-3xl mx-auto px-6 py-10 text-white min-h-screen flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate('/quiz')} className="p-2 hover:bg-white/10 rounded-full"><ArrowLeft /></button>
                <div className="text-gray-400 font-medium">
                    Câu hỏi <span className="text-white text-xl font-bold">{currentQuestionIndex + 1}</span> / {quiz.questions.length}
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#2D2D3A] h-2 rounded-full mb-10 overflow-hidden">
                <div
                    className="bg-purple-600 h-full transition-all duration-300 ease-out"
                    style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                ></div>
            </div>

            {/* Question Card */}
            <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
                    {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options.map((option: string, idx: number) => {
                        const isSelected = selectedAnswers[currentQuestionIndex] === option;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleSelectOption(option)}
                                className={`p-5 rounded-xl text-left border-2 transition-all flex justify-between items-center group
                                    ${isSelected
                                        ? "border-purple-500 bg-purple-500/20 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                                        : "border-[#2D2D3A] bg-[#1C1C28] hover:border-purple-500/50 hover:bg-[#2D2D3A] text-gray-300"
                                    }
                                `}
                            >
                                <span className="font-medium text-lg">{option}</span>
                                {isSelected && <CheckCircle className="text-purple-500" size={24} fill="currentColor" color="#0F0F16" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="mt-10 flex justify-end">
                {isLastQuestion ? (
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-green-900/20 transition transform hover:scale-105"
                    >
                        Nộp bài <CheckCircle size={20} />
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg transition transform hover:scale-105"
                    >
                        Câu tiếp theo <ArrowRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};