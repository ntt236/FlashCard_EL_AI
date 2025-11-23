import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* <header
        className="fixed top-0 left-0 w-full z-50 bg-[#0C0B11]/80 backdrop-blur-xl border-b border-white/10flex justify-center ">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 h-16">

          <Link to="/" className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6C4BFF] shadow-[0_0_10px_#6C4BFF]" />
            <span className="font-semibold text-white">FlashCard AI</span>
          </Link>


          <ul className="hidden lg:flex gap-6 text-white/70">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/flash-card">FlashCard</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
          </ul>


          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
        </div>
      </header>


      <nav
        className="
        fixed bottom-0 left-0 w-full z-50 
        bg-[#0C0B11]/90 backdrop-blur-xl 
        border-t border-white/10 
        flex justify-around items-center h-14 
        lg:hidden
      "
      >
        <Link to="/home" className="text-white/70 text-sm">
          Home
        </Link>
        <Link to="/flash-card" className="text-white/70 text-sm">
          FlashCard
        </Link>
        <Link to="/quiz" className="text-white/70 text-sm">
          Quiz
        </Link>
      </nav> */}

      <header className="w-full border-b sticky top-0 bg-[#0C0B11]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6C4BFF] shadow-[0_0_10px_#6C4BFF]" />
            <span className="font-semibold text-white">FlashCard AI</span>
          </Link>

          <ul className="lg:flex hidden gap-6 text-white/70">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/flash-card">FlashCard</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
          </ul>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
        </div>
      </header>

      <nav
        className="fixed bottom-0 left-0 w-full z-50 bg-[#0C0B11]/90 backdrop-blur-xl border-t border-white/10 
        flex justify-around items-center h-14 
        lg:hidden"
      >
        <Link to="/home" className="text-white/70 text-sm">
          Home
        </Link>
        <Link to="/flash-card" className="text-white/70 text-sm">
          FlashCard
        </Link>
        <Link to="/quiz" className="text-white/70 text-sm">
          Quiz
        </Link>
      </nav>
    </>
  );
};

export default Header;
