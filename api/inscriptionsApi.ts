import axios from "@/api/Axios";
import {InscriptionPlongeur} from "@/types/InscriptionPlongeur";

export const postCreateDemande = async (demande: InscriptionPlongeur) => {
    try {
        await axios.post(`/api/inscription_plongeurs`, demande);
    } catch (error) {
        console.error(`Error creating demande inscription`, error);
    }
};

export const getAllDemande = async () => {
    try {
        const response = await axios.get(`/api/inscription_plongeurs`);
        return response.data.member as InscriptionPlongeur[];
    } catch (error) {
        console.error(`Error fetching demandes inscription`, error);
        return [];
    }
};

export const getDemandeById = async (demandeId: string) => {
    try {
        const response = await axios.get(`/api/inscription_plongeurs/${demandeId}`);
        return response.data as InscriptionPlongeur;
    } catch (error) {
        console.error(`Error fetching demande of id ${demandeId}`, error);
    }
};

export const postValidateDemande = async (demandeId: string) => {
    try {
        await axios.post(`/api/inscription_plongeurs/${demandeId}/valider`);
    } catch (error) {
        console.error(`Error validating demande inscription of id ${demandeId}`, error);
    }
};


export const postFinalizeDemande = async (demandeId: string, plainPassword: string) => {
    try {
        await axios.post(`/api/inscription_plongeurs/${demandeId}/finaliser`, plainPassword);
    } catch (error) {
        console.error(`Error finalizing demande inscription of id ${demandeId}`, error);
    }
};
