const FeaturesSection = () => {
    const features = [
        {
            title: "AI Tạo Flashcard",
            desc: "Tạo flashcard tự động từ tài liệu hoặc mẫu câu.",
            color: "from-blue-100 to-blue-50",
        },
        {
            title: "Học Thông Minh",
            desc: "Thuật toán spaced repetition giúp bạn nhớ lâu hơn.",
            color: "from-purple-100 to-purple-50",
        },
        {
            title: "Đồng Bộ Mọi Nơi",
            desc: "Học mọi lúc, mọi nơi với chế độ offline.",
            color: "from-green-100 to-green-50",
        },
    ];

    return (
        <section className="py-20">
            <h2 className="text-3xl font-bold text-center">Tính năng nổi bật</h2>
            <p className="text-center text-gray-600 mt-2">Công nghệ AI giúp bạn học tập hiệu quả</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 px-4">
                {features.map((f, i) => (
                    <div key={i} className={`p-6 rounded-2xl bg-linear-to-br ${f.color}`}>
                        <h3 className="font-semibold text-lg">{f.title}</h3>
                        <p className="text-gray-600 mt-1">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
