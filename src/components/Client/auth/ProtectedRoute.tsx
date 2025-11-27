import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    // Nếu chưa đăng nhập, chuyển hướng về trang login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Nếu đã đăng nhập, render các route con (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;