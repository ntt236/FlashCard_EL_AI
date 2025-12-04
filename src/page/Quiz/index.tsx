import { useState } from "react";
import { Loader2, UploadCloud, FileType, Type, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider"; // Cần cài: npx shadcn-ui@latest add slider
import api from "@/lib/api"; // Axios instance
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

export const QuizPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("topic");

    // Config chung
    const [count, setCount] = useState([10]); // Slider trả về mảng
    const [difficulty, setDifficulty] = useState("Easy");

    // Inputs
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState(""); // Cho Option 1
    const [textInput, setTextInput] = useState("");     // Cho Option 2
    const [file, setFile] = useState<File | null>(null); // Cho Option 3

    const handleCreateQuiz = async () => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("count", count[0].toString());
            formData.append("difficulty", difficulty);

            if (activeTab === "topic") {
                if (!topic) return alert("Vui lòng nhập chủ đề");
                formData.append("type", "topic");
                formData.append("topic", topic);
                formData.append("description", description);
            }
            else if (activeTab === "text") {
                if (!textInput) return alert("Vui lòng nhập nội dung văn bản");
                formData.append("type", "text");
                formData.append("textInput", textInput);
            }
            else if (activeTab === "file") {
                if (!file) return alert("Vui lòng chọn file");
                formData.append("type", "file");
                formData.append("file", file);
            }

            // Gọi API
            const res = await api.post("/quiz/generate", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Quiz created:", res.data);
            alert("Tạo thành công!");
            // navigate(`/quiz/${res.data._id}`); // Chuyển sang trang làm bài (sẽ làm sau)

        } catch (error) {
            console.error(error);
            alert("Lỗi khi tạo Quiz");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 text-white">
            <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Tạo Bài Kiểm Tra AI
            </h1>

            <div className="bg-[#1C1C28] p-8 rounded-2xl border border-white/10 shadow-xl">

                {/* --- PHẦN CẤU HÌNH CHUNG --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/10">
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Số lượng câu hỏi: <span className="text-purple-400 font-bold">{count}</span></label>
                        <Slider
                            defaultValue={[10]}
                            max={50}
                            min={5}
                            step={5}
                            onValueChange={setCount}
                            className="py-4"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>5</span><span>25</span><span>50</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Cấp độ</label>
                        <Select value={difficulty} onValueChange={setDifficulty}>
                            <SelectTrigger className="bg-[#2D2D3A] border-white/10 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2D2D3A] border-white/10 text-white">
                                <SelectItem value="Easy">🟢 Cơ bản</SelectItem>
                                <SelectItem value="Medium">🟡 Trung bình</SelectItem>
                                <SelectItem value="Hard">🔴 Nâng cao (Chuyên sâu)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* --- TABS CHỌN NGUỒN --- */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#2D2D3A] mb-6">
                        <TabsTrigger value="topic"><BookOpen className="w-4 h-4 mr-2" /> Theo Chủ Đề</TabsTrigger>
                        <TabsTrigger value="text"><Type className="w-4 h-4 mr-2" /> Nhập Văn Bản</TabsTrigger>
                        <TabsTrigger value="file"><FileType className="w-4 h-4 mr-2" /> Tải File (Docx)</TabsTrigger>
                    </TabsList>

                    {/* Option 1: Topic */}
                    <TabsContent value="topic" className="space-y-4">
                        <input
                            className="w-full bg-[#2D2D3A] border border-white/10 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Nhập chủ đề (VD: Lịch sử Việt Nam, ReactJS Hooks...)"
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                        />
                        <textarea
                            className="w-full bg-[#2D2D3A] border border-white/10 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            rows={3}
                            placeholder="Mô tả chi tiết (Tùy chọn) - VD: Tập trung vào giai đoạn 1945-1975..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </TabsContent>

                    {/* Option 2: Text */}
                    <TabsContent value="text">
                        <textarea
                            className="w-full bg-[#2D2D3A] border border-white/10 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            rows={8}
                            placeholder="Dán nội dung văn bản vào đây để AI tạo câu hỏi..."
                            value={textInput}
                            onChange={e => setTextInput(e.target.value)}
                        />
                    </TabsContent>

                    {/* Option 3: File */}
                    <TabsContent value="file">
                        <div className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center hover:border-purple-500 transition relative bg-[#2D2D3A]/50">
                            <input
                                type="file"
                                accept=".docx"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-300 font-medium">
                                {file ? file.name : "Kéo thả hoặc chọn file Word (.docx)"}
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* --- BUTTON SUBMIT --- */}
                <button
                    onClick={handleCreateQuiz}
                    disabled={loading}
                    className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition flex justify-center items-center shadow-lg"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "🚀 Tạo Bộ Câu Hỏi Ngay"}
                </button>

            </div>
        </div>
    );
};