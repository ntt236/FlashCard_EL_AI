import { useState } from "react";
import { Plus, Loader2, Sparkles, PenTool } from "lucide-react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addCardToSet } from "@/service/flashcardService";


interface AddCardModalProps {
    setId: string; // ID của bộ thẻ đang đứng
    onSuccess: () => void; // Refresh lại list sau khi thêm
}

export const AddCardModal = ({ setId, onSuccess }: AddCardModalProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("ai");

    // State cho AI
    const [aiInput, setAiInput] = useState("");

    // State cho Manual
    const [manualInput, setManualInput] = useState({
        term: "",
        definition: "",
        phonetic: "",
        type: "noun"
    });

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

            // Gọi API (Lưu ý: "ai" hay "manual" là string literal types)
            await addCardToSet(setId, payload as any);

            // Reset form
            setAiInput("");
            setManualInput({ term: "", definition: "", phonetic: "", type: "noun" });
            setOpen(false);
            onSuccess(); // Load lại trang cha

        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm thẻ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition shadow-lg shadow-purple-900/20">
                    <Plus size={18} />
                    <span>Thêm thẻ mới</span>
                </button>
            </DialogTrigger>

            <DialogContent className="bg-[#1C1C28] border-white/10 text-white sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Thêm từ vựng mới</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="ai" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-[#2D2D3A]">
                        <TabsTrigger value="ai" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <Sparkles className="w-4 h-4 mr-2" /> AI Tự động
                        </TabsTrigger>
                        <TabsTrigger value="manual" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <PenTool className="w-4 h-4 mr-2" /> Nhập tay
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
                </Tabs>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl flex justify-center items-center mt-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : "Thêm vào bộ thẻ"}
                </button>
            </DialogContent>
        </Dialog>
    );
};