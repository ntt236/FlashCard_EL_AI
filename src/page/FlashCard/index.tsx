
import FlashcardSetGrid from "@/components/Client/FlashCard/FlashcardSetGrid";


import HeaderSection from "@/components/Client/FlashCard/HeaderSection";



export const FlashCardPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 ">
            <HeaderSection />
            <FlashcardSetGrid />
        </div>
    );
};