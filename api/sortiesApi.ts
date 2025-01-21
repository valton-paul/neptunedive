import axios from "@/api/Axios";
import {Sortie} from "@/types/Sortie";
import {Plongeur} from "@/types/Plongeur";
import {IgnoredSortie} from "@/types/IgnoredSortie";
import {SortieSpond} from "@/types/SortieSPond";



export const getAllSortiesWhereUserIsEnrolled = async (userId: string) => {
    try {
        const response = await axios.get(`/api/plongeurs/${userId}/sorties`);
        return response.data.member as Sortie[];
    } catch (error) {
        console.error('Error fetching sorties:', error);
        return [];
    }
}

export const getSortiesWhereUserIsEnrolled = async (userId: string) => {
    return (await getAllSortiesWhereUserIsEnrolled(userId)).filter(sortie => new Date(sortie.dateSortie).getTime() > Date.now());
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

export const getSortie = async ()=> {
    try {
        const response = await axios.get(`/api/sorties`);
        return response.data.member as Sortie[];
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

export const ignoreSortie = async (sortieId: string, plongeurId: string) => {
    try {
        await axios.put(`/api/plongeurs/${plongeurId}/ignored_sorties/${sortieId}`);
    } catch (error) {
        console.error('Error ignoring sortie:', error);
    }
}

export const unignoreSortie = async (sortieId: string, plongeurId: string) => {
    try {
        await axios.delete(`/api/plongeurs/${plongeurId}/ignored_sorties/${sortieId}`);
    } catch (error) {
        console.error('Error unignoring sortie:', error);
    }
}

export const getAllIgnoredSorties = async (plongeurId: string) => {
    try {
        const response = await axios.get(`/api/plongeurs/${plongeurId}/ignored_sorties`);
        return response.data.member as IgnoredSortie[];
    } catch (error) {
        console.error('Error fetching ignored sorties:', error);
        return [];
    }
}

export const createSortie = async (payload: {
    nbMaxInscription: number;
    directeurPlongee: number;
    dateSortie: string;
    idLieu: string;
    type: string;
    heureSortie: string;
    securiteSurface: number
})=> {

    try {
        return await axios.post(`/api/sorties`, payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error creating sortie:', error);
    }
}

export const getSortiesSpond = async () => {
    return await axios.get(`/sorties/spond`)

}

export const importSortieSpond = async (sortieSpond : SortieSpond | undefined) => {
    try {
        await axios.post(`/sorties/${sortieSpond?.idSpond}/spond`, sortieSpond, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error importing sortie:', error);
    }
}

export const importAllSortiesSpond = async (sortiesSpond : SortieSpond[]) => {
    try {
        await axios.post(`/sorties/spond`, sortiesSpond, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error importing sortie:', error);
    }
}

export const updateCronJob = async (intervalle: string) => {
    try {
        const response = await axios.post(`/sorties/spondCron`, {"intervalle": intervalle}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.status;
    } catch (error) {
        return error;
    }
}