export interface FlashcardSetData {
    _id?: string;
    title: string;
    desc: string;
    learned: number;
    learning: number;
    newWord: number;
    accuracy: number;
}

export interface IFlashcard {
    _id: string;
    term: string;
    definition: string;
    phonetic?: string;
    type?: string;
    status?: 'new' | 'learning' | 'learned';
    examples?: { en: string; vi: string }[];
    note?: string;
}

export interface FlashcardSetResponse {
    _id: string;
    title: string;
    desc: string;
    description?: string;
    learned: number;
    learning: number;
    newWord: number;
    accuracy: number;
    cards?: IFlashcard[];
}

export interface StatsCardProps {
    label: string;
    value: number;
    tag: string;
    color: string;
} 