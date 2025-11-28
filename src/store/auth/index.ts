import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../lib/api";
import type { AuthState } from "@/types/auth";

// Định nghĩa kiểu dữ liệu User

// Khởi tạo state ban đầu (thử lấy token từ cookie nếu user F5 trang)
const initialState: AuthState = {
    user: null, // Tạm thời null, sau này có thể gọi API /me để lấy lại info
    token: Cookies.get("accessToken") || null,
    isAuthenticated: !!Cookies.get("accessToken"),
    loading: false,
    error: null,
};

// --- THUNKS (Xử lý bất đồng bộ gọi API) ---

// 1. Đăng nhập
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", userData);
            return response.data; // Trả về { user, token }
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Lỗi đăng nhập");
        }
    }
);

// 2. Đăng ký
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/register", userData);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Lỗi đăng ký");
        }
    }
);

// --- SLICE ---
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Hàm đăng xuất
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            Cookies.remove("accessToken"); // Xóa cookie
        },
    },
    extraReducers: (builder) => {
        builder
            // Xử lý Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Backend trả về thông tin user
                state.token = action.payload.token;

                // Lưu token vào Cookie (Hết hạn sau 7 ngày)
                Cookies.set("accessToken", action.payload.token, { expires: 7 });
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Xử lý Register (Tương tự login)
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.token = action.payload.token;
                Cookies.set("accessToken", action.payload.token, { expires: 7 });
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
