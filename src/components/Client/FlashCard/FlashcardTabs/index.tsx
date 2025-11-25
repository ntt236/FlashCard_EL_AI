const FlashcardTabs = () => {
    return (
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
    );
};

export default FlashcardTabs;
