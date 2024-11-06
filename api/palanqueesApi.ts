import axios from "@/api/Axios";
import {Plongeur} from "@/types/Plongeur";
import {Palanquee} from "@/types/Palanquee";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {assign} from "next/dist/shared/lib/router/utils/querystring";

export const getDiversPalanquee = async (palanqueeId: string) => {
    try {
        const response = await axios.get(`/api/palanquees/${palanqueeId}/plongeurs`);
        return response.data.member as Plongeur[];
    } catch (error) {
        console.error(`Error fetching plongeurs of palanquee ${palanqueeId}`, error);
        return [];
    }
};

export const getPalanqueesSortie = async (sortieId: string) => {
    try {
        const response = await axios.get(`/api/sorties/${sortieId}/palanquees`);
        return response.data.member as Palanquee[];
    } catch (error) {
        console.error(`Error fetching palanquees of sortie ${sortieId}`, error);
        return [];
    }
};

export const getAssignationPalanqueeSortie = async (sortieId: string) => {
    try {
        const response = await axios.get(`/api/sorties/${sortieId}/assignationPalanquees`);
        return response.data.member as AssignationPalanquee[];
    } catch (error) {
        console.error(`Error fetching assignationPalanquees of sortie ${sortieId}`, error);
        return null;
    }
}

export const assignPlongeurToPalanquee = async (palanqueeId: string, plongeurId: string) => {
    try {
        await axios.put(`/api/plongeurs/${plongeurId}/palanquees/${palanqueeId}`);
    } catch (error) {
        console.error(`Error assigning plongeur ${plongeurId} to palanquee ${palanqueeId}`, error);
    }
}

export const unassignPlongeurToPalanquee = async (palanqueeId: string, plongeurId: string) => {
    try {
        await axios.delete(`/api/plongeurs/${plongeurId}/palanquees/${palanqueeId}`);
    } catch (error) {
        console.error(`Error unassigning plongeur ${plongeurId} to palanquee ${palanqueeId}`, error);
    }
}

export const createPalanquee = async (palanquee: Palanquee) => {
    try {
        await axios.post(`/api/palanquees`, palanquee);
    } catch (error) {
        console.error(`Error creating palanquee`, error);
    }
}

export const updatePalanquee = async (palanquee: Palanquee) => {
    try {
        await axios.patch(`/api/palanquees/${palanquee.id}`, palanquee);
    } catch (error) {
        console.error(`Error updating palanquee ${palanquee.id}`, error);
    }
}

export const deletePalanquee = async (palanqueeId: string) => {
    try {
        await axios.delete(`/api/palanquees/${palanqueeId}`);
    } catch (error) {
        console.error(`Error deleting palanquee ${palanqueeId}`, error);
    }
}

