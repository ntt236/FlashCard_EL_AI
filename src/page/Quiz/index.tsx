import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Loader2, UploadCloud, FileType, Type, BookOpen,
    CheckCircle, Eye, Trash2, Send,
    Sparkles, Settings2, Book, Clock, Play, BarChart,
    Edit, MoreVertical // <--- Import thêm Edit icon
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { QuizPreviewModal } from "@/components/Client/Quiz/QuizPreviewModal";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"; // <--- Import Dropdown cho nút Action

import api from "@/lib/api";
import { deleteQuiz, getMyQuizzes } from "@/service/quizService";
// import { deleteQuiz, getMyQuizzes, Quiz } from "@/services/quizService";

export const QuizPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeMode, setActiveMode] = useState<"topic" | "text" | "file">("topic");

    // --- State Logic ---
    const [quizzes, setQuizzes] = useState<any[]>([]); // Dùng any tạm hoặc type Quiz
    const [count, setCount] = useState([10]);
    const [difficulty, setDifficulty] = useState("Easy");
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [textInput, setTextInput] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // State cho Flow Tạo mới
    const [createdQuiz, setCreatedQuiz] = useState<any | null>(null);
    const [showPreviewCreated, setShowPreviewCreated] = useState(false);

    // State cho Flow Chỉnh sửa (Mới thêm)
    const [editingQuiz, setEditingQuiz] = useState<any | null>(null);

    // 1. Hàm tải danh sách
    const fetchQuizzes = async () => {
        try {
            const data = await getMyQuizzes();
            setQuizzes(data);
        } catch (error) {
            console.error("Lỗi tải danh sách quiz", error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    // 2. Hàm Tạo Quiz (Giữ nguyên)
    const handleCreateQuiz = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("count", count[0].toString());
            formData.append("difficulty", difficulty);

            if (activeMode === "topic") {
                if (!topic) return alert("Vui lòng nhập chủ đề");
                formData.append("type", "topic");
                formData.append("topic", topic);
                formData.append("description", description);
            }
            else if (activeMode === "text") {
                if (!textInput) return alert("Vui lòng nhập nội dung văn bản");
                formData.append("type", "text");
                formData.append("textInput", textInput);
            }
            else if (activeMode === "file") {
                if (!file) return alert("Vui lòng chọn file");
                formData.append("type", "file");
                formData.append("file", file);
            }

            const res = await api.post("/quiz/generate", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setCreatedQuiz(res.data);

        } catch (error) {
            console.error(error);
            alert("Lỗi khi tạo Quiz");
        } finally {
            setLoading(false);
        }
    };

    // 3. Xử lý logic cho Quiz VỪA TẠO
    const handleDeleteCreated = async () => {
        if (!createdQuiz) return;
        if (confirm("Bạn có chắc muốn xóa bộ đề vừa tạo?")) {
            await deleteQuiz(createdQuiz._id);
            setCreatedQuiz(null);
        }
    };

    const handlePublishCreated = () => {
        setCreatedQuiz(null);
        fetchQuizzes();
    };

    // 4. Xử lý logic cho Quiz TRONG DANH SÁCH (Mới thêm)
    const handleDeleteExisting = async (id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa bài thi này vĩnh viễn?")) {
            try {
                await deleteQuiz(id);
                fetchQuizzes(); // Refresh list
            } catch (error) {
                alert("Lỗi khi xóa bài thi");
            }
        }
    };

    const handleUpdateSuccess = () => {
        setEditingQuiz(null); // Đóng modal sửa
        fetchQuizzes(); // Refresh list để hiện dữ liệu mới
    };

    // --- RENDER MÀN HÌNH SUCCESS KHI TẠO MỚI ---
    if (createdQuiz) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center text-white">
                <div className="bg-[#1C1C28]/80 backdrop-blur-xl p-10 rounded-3xl border border-green-500/30 shadow-[0_0_100px_rgba(34,197,94,0.1)] inline-block w-full max-w-lg">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Tạo thành công!</h2>
                    <p className="text-gray-400 mb-8">
                        Bộ đề <span className="text-purple-400 font-bold">"{createdQuiz.title}"</span> đã sẵn sàng.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        <button onClick={() => setShowPreviewCreated(true)} className="w-full py-4 bg-[#2D2D3A] hover:bg-[#3D3D4D] rounded-xl flex items-center justify-center gap-3 transition font-medium border border-white/5">
                            <Eye className="text-blue-400" /> Xem trước & Chỉnh sửa
                        </button>
                        <div className="flex gap-4">
                            <button onClick={handleDeleteCreated} className="flex-1 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 transition">
                                <Trash2 size={18} /> Xóa
                            </button>
                            <button onClick={handlePublishCreated} className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-purple-900/20">
                                <Send size={18} /> Xuất bản
                            </button>
                        </div>
                    </div>
                </div>
                {/* Modal dành riêng cho lúc Tạo Mới */}
                <QuizPreviewModal
                    quiz={createdQuiz}
                    open={showPreviewCreated}
                    onOpenChange={setShowPreviewCreated}
                    onPublish={handlePublishCreated}
                />
            </div>
        );
    }

    // --- RENDER MAIN UI ---
    return (
        <div className="max-w-6xl mx-auto px-6 py-10 text-white">

            {/* Header Title */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    AI Quiz Generator
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Tạo bài kiểm tra trắc nghiệm chỉ trong vài giây.
                </p>
            </div>

            {/* GENERATOR CARD (Giữ nguyên code cũ của bạn) */}
            <div className="bg-[#1C1C28] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
                {/* ... (Phần Input/Config giữ nguyên như cũ) ... */}
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-8 p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Sparkles className="text-yellow-400" size={20} /> 1. Chọn nguồn dữ liệu
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <SelectionCard icon={<BookOpen />} label="Chủ đề" active={activeMode === 'topic'} onClick={() => setActiveMode('topic')} />
                            <SelectionCard icon={<Type />} label="Văn bản" active={activeMode === 'text'} onClick={() => setActiveMode('text')} />
                            <SelectionCard icon={<FileType />} label="File (Docx)" active={activeMode === 'file'} onClick={() => setActiveMode('file')} />
                        </div>
                        <div className="bg-[#0F0F16]/50 rounded-xl p-6 border border-white/5 min-h-[250px]">
                            {activeMode === 'topic' && (
                                <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Chủ đề chính</label>
                                        <input className="w-full bg-[#1C1C28] border border-white/10 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-purple-500 transition"
                                            placeholder="Ví dụ: Lịch sử Việt Nam..." value={topic} onChange={e => setTopic(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Mô tả chi tiết</label>
                                        <textarea className="w-full bg-[#1C1C28] border border-white/10 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-purple-500 resize-none transition"
                                            rows={3} placeholder="Ví dụ: Giai đoạn 1945-1975..." value={description} onChange={e => setDescription(e.target.value)} />
                                    </div>
                                </div>
                            )}
                            {activeMode === 'text' && (
                                <div className="animate-in fade-in zoom-in duration-300">
                                    <textarea className="w-full bg-[#1C1C28] border border-white/10 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-purple-500 resize-none h-[200px]"
                                        placeholder="Dán nội dung văn bản..." value={textInput} onChange={e => setTextInput(e.target.value)} />
                                </div>
                            )}
                            {activeMode === 'file' && (
                                <div className="h-full flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-300">
                                    <div className="border-2 border-dashed border-purple-500/30 rounded-2xl p-10 text-center hover:bg-purple-500/5 transition relative w-full h-full flex flex-col items-center justify-center">
                                        <input type="file" accept=".docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        <UploadCloud className="w-12 h-12 text-purple-400 mb-3" />
                                        <p className="text-gray-300">{file ? file.name : "Chọn file Word (.docx)"}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="lg:col-span-4 p-8 bg-[#2D2D3A]/30 flex flex-col">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Settings2 className="text-blue-400" size={20} /> 2. Cấu hình
                        </h3>
                        <div className="space-y-8 flex-1">
                            <div>
                                <label className="text-gray-300 font-medium block mb-4">Số câu hỏi: <span className="text-purple-400">{count}</span></label>
                                <Slider defaultValue={[10]} max={50} min={5} step={5} onValueChange={setCount} className="py-4" />
                            </div>
                            <div>
                                <label className="text-gray-300 font-medium mb-3 block">Độ khó</label>
                                <Select value={difficulty} onValueChange={setDifficulty}>
                                    <SelectTrigger className="w-full bg-[#1C1C28] border-white/10 h-12 rounded-xl text-white"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-[#1C1C28] border-white/10 text-white">
                                        <SelectItem value="Easy">🟢 Cơ bản</SelectItem>
                                        <SelectItem value="Medium">🟡 Trung bình</SelectItem>
                                        <SelectItem value="Hard">🔴 Nâng cao</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <button onClick={handleCreateQuiz} disabled={loading} className="w-full mt-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                            {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} /> Bắt đầu tạo</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- LIST QUIZ --- */}
            <div className="mt-24">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-l-4 border-purple-500 pl-4">
                    <Book className="text-white" /> Thư viện đề thi
                </h2>

                {quizzes.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-gray-700 rounded-3xl bg-[#1C1C28]/50">
                        <p className="text-gray-500 text-lg">Bạn chưa có bài kiểm tra nào.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <div key={quiz._id} className="group bg-[#1C1C28] border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-2xl transition flex flex-col justify-between h-full relative">

                                {/* Header Card */}
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${quiz.difficulty === 'Easy' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                            quiz.difficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/10 border-red-500/20 text-red-400'
                                            }`}>
                                            {quiz.difficulty}
                                        </span>

                                        {/* Dropdown Menu Actions (Sửa/Xóa) */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="outline-none">
                                                <button className="text-gray-500 hover:text-white transition p-1">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-[#2D2D3A] border-white/10 text-white">
                                                <DropdownMenuItem onClick={() => setEditingQuiz(quiz)} className="cursor-pointer hover:bg-white/10 gap-2">
                                                    <Edit size={14} /> Chỉnh sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteExisting(quiz._id)} className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-400 gap-2">
                                                    <Trash2 size={14} /> Xóa bài
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 line-clamp-2 text-white group-hover:text-purple-400 transition cursor-pointer"
                                        onClick={() => navigate(`/quiz/${quiz._id}`)}>
                                        {quiz.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                                        <BarChart size={14} className="text-blue-400" /> {quiz.topic}
                                    </p>
                                </div>

                                {/* Footer Card */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-sm text-gray-400 flex items-center gap-1.5">
                                        <Clock size={16} /> {quiz.questions?.length || 0} câu
                                    </span>

                                    <Link
                                        to={`/quiz/${quiz._id}`}
                                        className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-purple-500 hover:text-white transition shadow-lg"
                                    >
                                        <Play size={16} fill="currentColor" /> Làm bài
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal dùng chung để CHỈNH SỬA (Reuse QuizPreviewModal) */}
            {editingQuiz && (
                <QuizPreviewModal
                    quiz={editingQuiz}
                    open={!!editingQuiz}
                    onOpenChange={(open) => !open && setEditingQuiz(null)}
                    onPublish={handleUpdateSuccess} // Khi lưu xong thì refresh list
                />
            )}
        </div>
    );
};

const SelectionCard = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <div onClick={onClick} className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 border ${active ? "bg-purple-600 text-white border-purple-500 shadow-lg scale-105" : "bg-[#2D2D3A] text-gray-400 border-transparent hover:bg-[#3D3D4D] hover:text-white"}`}>
        <div className={`${active ? "text-white" : "text-purple-400"}`}>{icon}</div>
        <span className="font-medium">{label}</span>
    </div>
);