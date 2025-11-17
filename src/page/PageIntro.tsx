import LiquidEther from "@/components/LiquidEther"
import { Button } from "@/components/ui/button"

export const PageIntro = () => {
    return (

        <div className="w-full h-svh relative bg-black">
            {/* <Header /> */}
            <div
                className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-center text-3xl text-white z-10 font-bold space-y-6"
            >
                <h1>Chào mừng đến với FlashCard AI</h1>
                <div className="flex justify-center gap-2 ">
                    <Button className="rounded-3xl bg-white text-black">Get started</Button>
                    <Button className="rounded-3xl bg-gray-600 text-black">Learn more</Button>
                </div>
            </div>
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
        </div>

    )
}