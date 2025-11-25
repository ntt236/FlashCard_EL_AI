import CTASection from "@/components/Client/Home/CTASection";
import FeaturesSection from "@/components/Client/Home/FeaturesSection";
import HeroSection from "@/components/Client/Home/HeroSection";
import StepsSection from "@/components/Client/Home/StepsSection";
import TestimonialSection from "@/components/Client/Home/TestimonialSection";

export const HomePage = () => {
    return (
        <div className="bg-[#f8f8f8] text-[#111]">
            <HeroSection />
            <FeaturesSection />
            <StepsSection />
            <TestimonialSection />
            <CTASection />
            {/* <Footer /> */}
        </div>
    );
};