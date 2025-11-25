import FlashcardSetCard, { type FlashcardSetData } from "./FlashcardSetCard";


const FlashcardSetGrid = () => {
    const mock: FlashcardSetData[] = [
        {
            title: "English Vocabulary - IELTS 7.0+",
            desc: "Từ vựng nâng cao cho kỳ thi IELTS",
            learned: 487,
            learning: 123,
            newWord: 90,
            accuracy: 69,
        },
        {
            title: "Japanese N3 Kanji Master",
            desc: "Bộ Kanji cho trình độ JLPT N3",
            learned: 312,
            learning: 88,
            newWord: 150,
            accuracy: 57,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {mock.map((card, i) => (
                <FlashcardSetCard key={i} {...card} />
            ))}
        </div>
    );
};

export default FlashcardSetGrid;
