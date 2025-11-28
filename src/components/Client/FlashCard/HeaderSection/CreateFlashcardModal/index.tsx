import { useState } from "react";
import { Plus, Loader2, Save } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createFlashcardSet } from "@/service/flashcardService";

interface CreateFlashcardModalProps {
    onSuccess: () => void; // Hàm callback để báo cho cha biết là đã tạo xong
}

export const CreateFlashcardModal = ({ onSuccess }: CreateFlashcardModalProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        language: "en",
        description: "",
        isPublic: false,
    });

    const handleSubmit = async () => {
        // Validate cơ bản
        if (!formData.title.trim()) {
            alert("Vui lòng nhập tên bộ thẻ!");
            return;
        }

        try {
            setLoading(true);
            // Gọi API
            await createFlashcardSet({
                title: formData.title,
                description: formData.description,
                isPublic: formData.isPublic,
                language: formData.language,
            });

            // Reset form và đóng modal
            setFormData({ title: "", language: "en", description: "", isPublic: false });
            setOpen(false);

            // Gọi callback để refresh danh sách bên ngoài
            onSuccess();
        } catch (error) {
            console.error(error);
            alert("Lỗi khi tạo bộ thẻ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition">
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Tạo bộ thẻ mới</span>
                </button>
            </DialogTrigger>

            <DialogContent className="bg-[#1C1C28] border-white/10 text-white sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Tạo bộ Flashcard mới</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Điền thông tin cơ bản cho bộ thẻ của bạn.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Tên bộ thẻ */}
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-gray-300">
                            Tên bộ thẻ <span className="text-red-500">*</span>
                        </Label>
                        <input
                            id="title"
                            className="w-full bg-[#2D2D3A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Ví dụ: Từ vựng IELTS..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Ngôn ngữ */}
                    <div className="grid gap-2">
                        <Label className="text-gray-300">Ngôn ngữ</Label>
                        <Select
                            value={formData.language}
                            onValueChange={(val) => setFormData({ ...formData, language: val })}
                        >
                            <SelectTrigger className="bg-[#2D2D3A] border-white/10 text-white">
                                <SelectValue placeholder="Chọn ngôn ngữ" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2D2D3A] border-white/10 text-white">
                                <SelectItem value="en">Tiếng Anh (English)</SelectItem>
                                <SelectItem value="jp">Tiếng Nhật (Japanese)</SelectItem>
                                <SelectItem value="kr">Tiếng Hàn (Korean)</SelectItem>
                                <SelectItem value="cn">Tiếng Trung (Chinese)</SelectItem>
                                <SelectItem value="vi">Tiếng Việt (Vietnamese)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Mô tả */}
                    <div className="grid gap-2">
                        <Label htmlFor="desc" className="text-gray-300">Mô tả</Label>
                        <textarea
                            id="desc"
                            rows={3}
                            className="w-full bg-[#2D2D3A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            placeholder="Mô tả ngắn gọn..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Quyền riêng tư */}
                    <div className="flex items-center justify-between bg-[#2D2D3A] p-3 rounded-lg border border-white/10">
                        <div className="space-y-0.5">
                            <Label className="text-base text-white">Công khai</Label>
                            <p className="text-xs text-gray-400">
                                Mọi người có thể nhìn thấy bộ thẻ này.
                            </p>
                        </div>
                        <Switch
                            checked={formData.isPublic}
                            onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
                            className="data-[state=checked]:bg-purple-600"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Tạo ngay</>}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};