import axios from "@/api/Axios";
import {Commentaire} from "@/types/Commentaire";

export const getCommentaireUser = async (userId: string) => {
    try {
        const response = await axios.get(`/api/plongeurs/${userId}/commentaires`);
        return response.data.member as Commentaire[];
    } catch (error) {
        console.error('Error fetching commentaires:', error);
        return [];
    }
};


export const patchCommentaire = async (commentaire: Commentaire, message: string) => {
    try {
        await axios.patch(`/api/commentaires/${commentaire.id}`,
            { message: message }, // Structure le message en JSON
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error updating commentaire:', error);
    }
};

export const postCommentaire = async (commentaire: Commentaire) => {
    try {
        await axios.post(`/api/commentaires`, commentaire);
    } catch (error) {
        console.error('Error posting commentaire:', error);
    }
};

export const getLateFeedbacks = async (idEncadrant: string) => {
    try {
        const response = await axios.get(`/api/encadrants/${idEncadrant}/plongeursNoComments`);
        return response.data as never[];
    } catch (error) {
        console.error('Error fetching late feedbacks:', error);
        return [];
    }
}

export const getLateFeedbacksAllEncadrant = async () => {
    try {
        const response = await axios.get(`/api/encadrants/plongeursNoComments`);
        return response.data as never[];
    } catch (error) {
        console.error('Error fetching late feedbacks:', error);
        return [];
    }
}


