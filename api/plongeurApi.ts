import axios from "@/api/Axios";

export const getAllPlongeurs = async () => {
    try {
        const response = await axios.get('/api/plongeurs');
        return response.data.member;
    } catch (error) {
        console.error('Error getting all plongeurs', error);
    }
}

export const getPlongeur = async (id: number) => {
    try {
        const response = await axios.get(`/api/plongeurs/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting plongeur ${id}`, error);
    }
}