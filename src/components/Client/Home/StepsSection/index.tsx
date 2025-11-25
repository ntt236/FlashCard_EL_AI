const StepsSection = () => {
    const steps = [
        { step: 1, title: "Nhập nội dung", desc: "Upload tài liệu hoặc nhập text bạn muốn học" },
        { step: 2, title: "AI xử lý", desc: "AI phân tích và tạo flashcard tối ưu" },
        { step: 3, title: "Bắt đầu học", desc: "Chọn chế độ học phù hợp và theo dõi tiến trình" },
    ];

    return (
        <section className="py-20 bg-white">
            <h2 className="text-3xl font-bold text-center">3 bước đơn giản</h2>
            <p className="text-center text-gray-600">
                Từ ý tưởng đến flashcard chỉ trong vài phút
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mt-12">
                {steps.map((s) => (
                    <div className="text-center" key={s.step}>
                        <div className="w-16 h-16 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                            {s.step}
                        </div>
                        <h3 className="mt-4 font-semibold text-xl">{s.title}</h3>
                        <p className="text-gray-600 mt-1">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StepsSection;
