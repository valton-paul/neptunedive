import axios from "@/api/Axios";
import {Sortie} from "@/types/Sortie";

export const getSortiesWhereUserIsEnrolled = async (userId: string) => {
    try {
        const response = await axios.get(`/api/plongeurs/${userId}/sorties`);
        const allSorties = response.data.member as Sortie[];
        return allSorties.filter(sortie => new Date(sortie.dateSortie).getTime() > Date.now());
    } catch (error) {
        console.error('Error fetching sorties:', error);
        return [];
    }
}

export const getSortiesUserDone = async (userId: string) => {
    try {
        const response = await axios.get(`/api/plongeurs/${userId}/historique`);
        return response.data.member as Sortie[];
    } catch (error) {
        console.error('Error fetching sorties:', error);
        return [];
    }
}

export const getFutureSortieUserHasntEnrolledTo = async (userId: string) => {
    try {
        const response = await axios.get(`/api/plongeurs/${userId}/sorties-not-inscrit`);
        const sorties = response.data.member as Sortie[];
        return sorties.filter(sortie => new Date(sortie.dateSortie).getTime() > Date.now());
    } catch (error) {
        console.error('Error fetching sorties:', error);
        return [];
    }
}