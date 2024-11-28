import axios from "@/api/Axios";
import {patch} from "axios";

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

export const logout = async () => {
    try {
        const response = await axios.post('/api/logout');
        return response.data;
    } catch (error) {
        console.error('Error logging out', error);
    }
}
export const patchPlongeur = async (id: number, plongeur: any) => {
    try {
        const response = await axios.patch(`/api/plongeurs/${id}`, plongeur);
        return response.data;
    } catch (error) {
        console.error(`Error patching plongeur ${id}`, error);
    }
}