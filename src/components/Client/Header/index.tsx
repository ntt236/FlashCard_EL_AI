import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
// import logo from "@/assets/flash-card.png"
import { BookTextIcon, HelpCircleIcon, HomeIcon, LogIn, LogOut, User, UserPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 1. Lấy thông tin user từ Redux Store
  const { user } = useAppSelector((state) => state.auth);

  // 2. Hàm xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logout()); // Xóa token trong redux & cookie
    navigate("/home"); // Chuyển về trang login
  };

  // Hàm lấy chữ cái đầu tên user để làm Avatar mặc định (Fallback)
  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };
  return (
    <>
      <header className="w-full border-b sticky top-0 bg-[#63377763] border-white/10 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6C4BFF] shadow-[0_0_10px_#6C4BFF]" />
            <span className="font-semibold text-white">FlashCard AI</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="lg:flex hidden gap-6 text-white/70">
            <Link to="/home" className="flex items-center gap-2 hover:text-white transition-colors">
              <HomeIcon className="w-5 h-5" />
              <li>Home</li>
            </Link>
            <Link to="/flash-card" className="flex items-center gap-2 hover:text-white transition-colors">
              <BookTextIcon className="w-5 h-5" />
              <li>FlashCard</li>
            </Link>
            <Link to="/quiz" className="flex items-center gap-2 hover:text-white transition-colors">
              <HelpCircleIcon className="w-5 h-5" />
              <li>Quiz</li>
            </Link>
          </ul>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer">
              <Avatar className="border-2 border-transparent hover:border-[#6C4BFF] transition-all">
                <AvatarImage src={(user as any)?.avatarUrl} alt={user?.username} />
                <AvatarFallback className="bg-purple-600 text-white font-bold">
                  {getInitials(user?.username || "")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-[#1C1C28] border-white/10 text-white" align="end">
              {user ? (
                // --- TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP ---
                <>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.username}</p>
                      <p className="text-xs leading-none text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                    <Link to="/profile" className="flex">
                      <User className="mr-2 h-4 w-4" />
                      <span>Hồ sơ cá nhân</span>
                    </Link>

                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-500 hover:bg-red-500/10 hover:text-red-500 focus:bg-red-500/10 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </>
              ) : (
                // --- TRƯỜNG HỢP CHƯA ĐĂNG NHẬP ---
                <>
                  {/* Xóa Label rỗng ở đây để tránh khoảng trắng thừa */}
                  <DropdownMenuItem asChild>
                    <Link to='/login' className="cursor-pointer flex items-center w-full hover:bg-white/10 focus:bg-white/10 focus:text-white">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Đăng nhập</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to='/register' className="cursor-pointer flex items-center w-full hover:bg-white/10 focus:bg-white/10 focus:text-white">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Đăng ký</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Nav - Giữ nguyên của bạn */}
      <nav
        className="fixed bottom-0 left-0 w-full z-50 bg-[#0C0B11]/90 backdrop-blur-xl border-t border-white/10 
        flex justify-around items-center h-14 
        lg:hidden"
      >
        <Link to="/home" className="text-white/70 text-sm flex flex-col items-center gap-1">
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link to="/flash-card" className="text-white/70 text-sm flex flex-col items-center gap-1">
          <BookTextIcon className="w-5 h-5" />
          <span>FlashCard</span>
        </Link>
        <Link to="/quiz" className="text-white/70 text-sm flex flex-col items-center gap-1">
          <HelpCircleIcon className="w-5 h-5" />
          <span>Quiz</span>
        </Link>
      </nav>
    </>
  );
};

export default Header;
