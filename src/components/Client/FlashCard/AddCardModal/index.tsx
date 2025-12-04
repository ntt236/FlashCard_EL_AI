import { useState } from "react";
import { Plus, Loader2, Sparkles, PenTool, UploadCloud, FileText } from "lucide-react"; // Import thêm icon
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import api from "@/lib/api"; // Import api instance để gọi route upload riêng
import { addCardToSet } from "@/service/flashcardService";

interface AddCardModalProps {
    setId: string;
    onSuccess: () => void;
}

export const AddCardModal = ({ setId, onSuccess }: AddCardModalProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("ai");

    // State cho AI
    const [aiInput, setAiInput] = useState("");

    // State cho Manual
    const [manualInput, setManualInput] = useState({
        term: "", definition: "", phonetic: "", type: "noun"
    });

    // State cho File Upload
    const [file, setFile] = useState<File | null>(null);

    // --- Xử lý Submit chung (AI & Manual) ---
    const handleSubmit = async () => {
        try {
            setLoading(true);
            let payload;

            if (activeTab === "ai") {
                if (!aiInput.trim()) return alert("Vui lòng nhập từ vựng!");
                payload = { mode: "ai", input: aiInput };
            } else {
                if (!manualInput.term || !manualInput.definition) return alert("Vui lòng nhập Từ và Nghĩa!");
                payload = { mode: "manual", input: manualInput };
            }

            await addCardToSet(setId, payload as any);

            // Reset & Close
            setAiInput("");
            setManualInput({ term: "", definition: "", phonetic: "", type: "noun" });
            setOpen(false);
            onSuccess();

        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm thẻ");
        } finally {
            setLoading(false);
        }
    };

    // --- Xử lý Upload File Riêng ---
    const handleFileUpload = async () => {
        if (!file) return alert("Vui lòng chọn file PDF hoặc Word");

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            // Gọi API Upload (Route riêng: POST /:setId/upload)
            // Lưu ý: Route này phải được khai báo ở Backend rồi nhé
            const response = await api.post(`/flashcards/${setId}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Upload success:", response.data);
            alert(`Đã thêm thành công ${response.data.count} thẻ từ file!`);

            setFile(null);
            setOpen(false);
            onSuccess(); // Refresh danh sách

        } catch (error: any) {
            console.error("Upload error:", error);
            alert(error.response?.data?.message || "Lỗi khi xử lý file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition shadow-lg shadow-purple-900/20">
                    <Plus size={18} />
                    <span className="hidden sm:inline">Thêm thẻ mới</span>
                </button>
            </DialogTrigger>

            <DialogContent className="bg-[#1C1C28] border-white/10 text-white sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Thêm từ vựng mới</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="ai" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    {/* Thanh Tab 3 Nút */}
                    <TabsList className="grid w-full grid-cols-3 bg-[#2D2D3A]">
                        <TabsTrigger value="ai" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <Sparkles className="w-4 h-4 mr-2" /> AI Auto
                        </TabsTrigger>
                        <TabsTrigger value="manual" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <PenTool className="w-4 h-4 mr-2" /> Thủ công
                        </TabsTrigger>
                        <TabsTrigger value="file" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <UploadCloud className="w-4 h-4 mr-2" /> Từ File
                        </TabsTrigger>
                    </TabsList>

                    {/* --- TAB AI --- */}
                    <TabsContent value="ai" className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Nhập từ vựng (AI sẽ tự điền nghĩa & ví dụ)</label>
                            <input
                                className="w-full bg-[#2D2D3A] border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="Ví dụ: Ecosystem / Con mèo..."
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            />
                        </div>
                    </TabsContent>

                    {/* --- TAB MANUAL --- */}
                    <TabsContent value="manual" className="space-y-3 py-4">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                className="bg-[#2D2D3A] border border-white/10 rounded-lg p-3 outline-none"
                                placeholder="Thuật ngữ (Term)*"
                                value={manualInput.term}
                                onChange={e => setManualInput({ ...manualInput, term: e.target.value })}
                            />
                            <input
                                className="bg-[#2D2D3A] border border-white/10 rounded-lg p-3 outline-none"
                                placeholder="Phiên âm (IPA)"
                                value={manualInput.phonetic}
                                onChange={e => setManualInput({ ...manualInput, phonetic: e.target.value })}
                            />
                        </div>
                        <input
                            className="w-full bg-[#2D2D3A] border border-white/10 rounded-lg p-3 outline-none"
                            placeholder="Định nghĩa (Tiếng Việt)*"
                            value={manualInput.definition}
                            onChange={e => setManualInput({ ...manualInput, definition: e.target.value })}
                        />
                        <select
                            className="w-full bg-[#2D2D3A] border border-white/10 rounded-lg p-3 outline-none text-gray-300"
                            value={manualInput.type}
                            onChange={e => setManualInput({ ...manualInput, type: e.target.value })}
                        >
                            <option value="noun">Danh từ (Noun)</option>
                            <option value="verb">Động từ (Verb)</option>
                            <option value="adjective">Tính từ (Adj)</option>
                            <option value="phrase">Cụm từ (Phrase)</option>
                        </select>
                    </TabsContent>

                    {/* --- TAB FILE UPLOAD (MỚI) --- */}
                    <TabsContent value="file" className="space-y-4 py-4">
                        <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition relative bg-[#2D2D3A]/50 group">
                            <input
                                type="file"
                                accept=".pdf,.docx"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />

                            <div className="flex flex-col items-center justify-center space-y-3">
                                {file ? (
                                    <>
                                        <FileText className="w-12 h-12 text-purple-400" />
                                        <div>
                                            <p className="font-medium text-white">{file.name}</p>
                                            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <p className="text-xs text-green-400">Đã chọn file. Bấm nút bên dưới để upload.</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 transition">
                                            <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-300 font-medium">Kéo thả hoặc chọn file</p>
                                            <p className="text-xs text-gray-500 mt-1">Hỗ trợ PDF, Word (.docx)</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <p className="text-xs text-center text-gray-500 italic">
                            *AI sẽ đọc nội dung file và tự động tạo danh sách từ vựng quan trọng nhất.
                        </p>
                    </TabsContent>
                </Tabs>

                {/* --- BUTTON SUBMIT --- */}
                <button
                    onClick={activeTab === "file" ? handleFileUpload : handleSubmit}
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl flex justify-center items-center mt-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin" />
                            {activeTab === 'file' ? "Đang đọc file & Tạo thẻ..." : "Đang xử lý..."}
                        </span>
                    ) : (
                        activeTab === 'file' ? "Upload & Tạo thẻ" : "Thêm vào bộ thẻ"
                    )}
                </button>
            </DialogContent>
        </Dialog>
    );
};