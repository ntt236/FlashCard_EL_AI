import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { registerUser } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Lấy state từ Redux
    const { loading, error } = useAppSelector((state: any) => state.auth);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Gọi action login
        const resultAction = await dispatch(registerUser({ username, email, password }));
        console.log("🚀 ~ handleRegister ~ resultAction:", resultAction)

        // Kiểm tra kết quả
        if (registerUser.fulfilled.match(resultAction)) {
            navigate("/"); // Chuyển về trang chủ nếu thành công
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F0F16] text-white">
            {/* 2. Thêm class 'relative' vào thẻ cha để nút mũi tên định vị theo thẻ này */}
            <div className="bg-[#1C1C28] p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/10 relative">

                {/* 3. Nút mũi tên quay về */}
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
                    title="Quay lại"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-center mb-6">Đăng Nhập</h2>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">UserName</label>
                        <input
                            type="text"
                            className="w-full bg-[#2D2D3A] rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full bg-[#2D2D3A] rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            className="w-full bg-[#2D2D3A] rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition flex justify-center items-center"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Đăng ký"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Đã có tài khoản? <span className="text-purple-400 cursor-pointer" onClick={() => navigate("/login")}>Đăng nhập ngay</span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;