const Footer = () => {
    return (
        <footer className="bg-[#0B0B1F] text-gray-300 py-10 px-6 bottom-0 ">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

                <div>
                    <h3 className="font-semibold text-white">FlashcardAI</h3>
                    <p className="text-gray-400 text-sm mt-2">Học thông minh với công nghệ AI.</p>
                </div>

                <div>
                    <p className="font-semibold text-white">Sản phẩm</p>
                    <ul className="text-sm mt-2 space-y-1">
                        <li>Tính năng</li>
                        <li>Giá cả</li>
                        <li>API</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold text-white">Hỗ trợ</p>
                    <ul className="text-sm mt-2 space-y-1">
                        <li>Trung tâm trợ giúp</li>
                        <li>Liên hệ</li>
                        <li>Blog</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold text-white">Theo dõi</p>
                    <div className="flex gap-3 mt-2">
                        🌐 📘 🐦
                    </div>
                </div>

            </div>

            <p className="text-center text-gray-500 text-sm mt-10">© 2024 FlashcardAI. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
