import axios from "./Axios";
import {Plongeur} from "@/types/Plongeur";

export const getPaymentLink = async (sortieId: string) => {
    if (!sortieId) {
        throw new Error("Identifiant de sortie manquant.")
    }
    const response = await axios.get(`/payment/${sortieId}`);
    return response.data.url as string;
}

export const getPaymentStatus = async (sortieId: string) => {
    if (!sortieId) {
        throw new Error("Identifiant de sortie manquant.")
    }
    const response = await axios.get(`/payment/${sortieId}/status`);
    return response.data.status;
}

export const postPaymentStatus = async (sortieId: string) => {
    if (!sortieId) {
        throw new Error("Identifiant de sortie manquant.")
    }
    await axios.post(`/payment/${sortieId}/status`);
}

export const getLatePayement = async () => {
    try {
        const response = await axios.get('/api/filter/hasNotPaidInscriptionSortie');
        return response.data as Plongeur[];
    } catch (error) {
        console.error('Error fetching late feedbacks:', error);
        return [];
    }
}