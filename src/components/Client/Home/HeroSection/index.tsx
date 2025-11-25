const HeroSection = () => {
    return (
        <section className="pt-28 pb-20 text-center bg-[#f0eaf5] ">
            <h1 className="text-5xl font-bold leading-tight">
                Học thông minh với <span className="text-blue-600">AI Flashcard</span>
            </h1>

            <p className="max-w-xl mx-auto text-gray-600 mt-4">
                Tạo flashcard tự động bằng trí tuệ nhân tạo — học nhanh hơn, ghi nhớ lâu hơn, phù hợp mọi cấp độ học tập.
            </p>

            <div className="mt-8 flex justify-center gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                    Bắt đầu học
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100">
                    Dùng thử AI
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
