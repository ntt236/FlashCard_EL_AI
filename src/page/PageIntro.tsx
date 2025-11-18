import LiquidEther from "@/components/LiquidEther"
import { Button } from "@/components/ui/button"

export const PageIntro = () => {
    return (
        <div className="w-full h-svh relative bg-black overflow-hidden">

            {/* Layer hiệu ứng nền */}
            <LiquidEther
                colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                mouseForce={20}
                cursorSize={100}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.5}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
            />

            {/* Hero Content */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    z-20 text-center text-white px-4 space-y-6"
            >
                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                    FlashCard AI
                </h1>

                {/* Subtitle */}
                <p className="max-w-lg mx-auto text-lg text-white/70 leading-relaxed">
                    Tạo flashcard tự động bằng trí tuệ nhân tạo — học nhanh hơn, ghi nhớ lâu hơn,
                    phù hợp mọi cấp độ học tập.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4 pt-2">
                    <Button className="
                        rounded-3xl px-6 py-3 text-lg font-semibold
                        bg-[#6C4BFF] hover:bg-[#6C4BFF]/80
                        text-white shadow-[0_0_20px_#6C4BFF55]
                        hover:shadow-[0_0_35px_#6C4BFFAA]
                        transition-all duration-300 hover:scale-[1.05]
                    ">
                        Get Started 🚀
                    </Button>

                    <Button
                        variant="outline"
                        className="rounded-3xl px-6 py-3 text-lg font-semibold text-white border-white/40 hover:bg-white/20 hover:scale-105 transition-transform bg-white/20"
                    >
                        Learn More
                    </Button>
                </div>
            </div>
        </div>
    )
}
