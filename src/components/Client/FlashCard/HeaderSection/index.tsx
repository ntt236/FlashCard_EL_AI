import { Plus, Search } from "lucide-react";
import StatsCard from "./StatsCard";
import { Link } from "react-router-dom";

const HeaderSection = () => {
    const stats = [
        { label: "Tất cả từ vựng", value: 2847, tag: "Tổng", color: "from-blue-500 to-blue-600" },
        { label: "Đã học thuộc", value: 1923, tag: "Hoàn thành", color: "from-green-500 to-green-600" },
        { label: "Đang ghi nhớ", value: 624, tag: "Ghi nhớ", color: "from-purple-500 to-purple-600" },
        { label: "Cần ôn tập", value: 300, tag: "Cần ôn", color: "from-orange-500 to-orange-600" },
    ];

    return (
        <div className="space-y-6">

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <StatsCard key={i} {...s} />
                ))}
            </div>

            {/* Tabs + Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* Tabs */}
                <div className="flex gap-2 bg-[#1A1A25] p-1 rounded-xl">
                    <button className="px-4 py-2 text-white bg-[#2D2D3A] rounded-lg">
                        Bộ flashcard của tôi
                    </button>
                    <button className="px-4 py-2 text-gray-400 hover:text-white transition">
                        Khám phá cộng đồng
                    </button>
                    <button className="px-4 py-2 text-gray-400 hover:text-white transition">
                        Bộ thẻ đã học xong
                    </button>
                </div>

                {/* Search */}
                <div className="flex gap-3 items-center w-full lg:w-auto">
                    <div className="flex items-center bg-[#1A1A25] px-4 py-2 rounded-xl w-full lg:w-72">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            placeholder="Tìm kiếm flashcard..."
                            className="ml-2 bg-transparent outline-none text-white w-full"
                        />
                    </div>

                    <Link
                        to="/flash-card/create"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
                    >
                        <Plus className="w-5 h-5" />
                        Tạo bộ flashcard mới
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default HeaderSection;
