import api from '@/lib/api';
import type { FlashcardSetResponse } from '@/types/flashCard';


export const getMyFlashcardSets = async (): Promise<FlashcardSetResponse[]> => {
    const response = await api.get('/flashcards/my-sets');
    return response.data;
};

export interface CreateSetPayload {
    title: string;
    description: string;
    isPublic: boolean;
    language: string; // Mặc định 'en' hoặc 'vi'
}

// Hàm tạo bộ thẻ mới
export const createFlashcardSet = async (data: CreateSetPayload): Promise<FlashcardSetResponse> => {
    const response = await api.post('/flashcards', data);
    return response.data;
};

export const getFlashcardSetDetail = async (setId: string): Promise<FlashcardSetResponse> => {
    const response = await api.get(`/flashcards/${setId}`);
    return response.data;
};

export const addCardToSet = async (setId: string, payload: { mode: 'manual' | 'ai', input: any }) => {
    const response = await api.post(`/flashcards/${setId}/cards`, payload);
    return response.data;
};