import axios from "@/api/Axios";
import {Sortie} from "@/types/Sortie";
import {Plongeur} from "@/types/Plongeur";

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

export const enrollToSortie = async (userId: string, sortieId: string) => {
    try {
        await axios.put(`/api/plongeurs/${userId}/sorties/${sortieId}`);
    } catch (error) {
        console.error('Error enrolling to sortie:', error);
    }
}

export const quitSortie = async (userId: string, sortieId: string) => {
    try {
        await axios.delete(`/api/plongeurs/${userId}/sorties/${sortieId}`);
    }
    catch (error) {
        console.error('Error quitting sortie:', error);
    }
}

export const getPlongeursNotAssignedSortie = async (sortieId: string) => {
    try {
        const response = await axios.get(`/api/sorties/${sortieId}/plongeursNotAssigned`);
        return response.data.member as Plongeur[];
    } catch (error) {
        console.error('Error fetching sortie:', error);
        return null;
    }
}