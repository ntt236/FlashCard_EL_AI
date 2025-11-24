import { Link } from "react-router-dom"

export const FlashCardPage = () => {
    const mockSets = [
        { id: 1, title: "Basic English", count: 20 },
        { id: 2, title: "TOEIC Common Words", count: 50 },
        { id: 3, title: "Phrasal Verbs", count: 30 },
        { id: 4, title: "Animals", count: 10 },
    ]

    return (
        <div className="max-w-7xl mx-auto px-6 py-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Flashcard Sets</h1>

                <button className="
          bg-[#6C4BFF] px-4 py-2 rounded-xl 
          hover:bg-[#6C4BFF]/80 transition
        ">
                    + Create New
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockSets.map(set => (
                    <Link key={set.id} to={`/flash-card/${set.id}`}>
                        <div className="
              bg-[#0B0A10]/80 border border-white/10 rounded-xl 
              p-4 hover:bg-[#14121B] transition
            ">
                            <h2 className="font-semibold">{set.title}</h2>
                            <p className="text-white/60 text-sm">{set.count} cards</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
