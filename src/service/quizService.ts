import api from "@/lib/api";

// Định nghĩa Type cơ bản (hoặc import từ file types nếu bạn đã tách)
export interface Quiz {
    _id: string;
    title: string;
    topic: string;
    difficulty: string;
    questions: any[];
    createdAt: string;
}

export const getMyQuizzes = async (): Promise<Quiz[]> => {
    const response = await api.get('/quiz');
    return response.data;
};

export const getQuizDetail = async (id: string): Promise<Quiz> => {
    const response = await api.get(`/quiz/${id}`);
    return response.data;
};

// ...
export const updateQuiz = async (id: string, data: any) => {
    const response = await api.put(`/quiz/${id}`, data);
    return response.data;
};

export const deleteQuiz = async (id: string) => {
    const response = await api.delete(`/quiz/${id}`);
    return response.data;
};