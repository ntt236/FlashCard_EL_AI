interface StatsCardProps {
    label: string;
    value: number;
    tag: string;
    color: string;
}

const StatsCard = ({ label, value, tag, color }: StatsCardProps) => {
    return (
        <div className={`rounded-xl p-6 text-white bg-linear-to-br ${color} shadow-lg`}>
            <span className="text-sm">{tag}</span>
            <h2 className="text-4xl font-bold mt-2">{value}</h2>
            <p className="mt-1">{label}</p>

            <div className="mt-4 bg-white/30 h-1 rounded-full">
                <div className="bg-white h-full w-1/2 rounded-full"></div>
            </div>
        </div>
    );
};

export default StatsCard;
