import axios from "@/api/Axios";
import {DonneeClub} from "@/types/DonneeClub";
import {Dispatcher} from "undici-types";
import ResponseData = Dispatcher.ResponseData;
import {AxiosResponse} from "axios";

export const getDonneeClub = async () => {
    try {
        const response = await axios.get(`/api/donnee_clubs`);
        return response.data.member[0] as DonneeClub;
    } catch (error) {
        console.error('Error fetching donnee club:', error);
        return null;
    }
}

export const updateDonneeClub = async (donneeClub: DonneeClub) => {
    try {
        await axios.patch(`/api/donnee_clubs/${donneeClub.id}`, donneeClub);
    } catch (error) {
        console.error('Error updating donnee club:', error);
    }
}

export const createDonneeClub = async (donneeClub: DonneeClub) => {
    try {
        await axios.post(`/api/donnee_clubs`, donneeClub);
    } catch (error) {
        console.error('Error creating donnee club:', error);
    }
}

export const findGroupIdSpond = async (donneeClub: DonneeClub) => {
    try {
        return await axios.post(`/donneeClub/findGroupId`, donneeClub) as AxiosResponse;
    } catch (error) {
        console.error('Error fetching donnee club:', error);
        return error as never;
    }
}

export const updateInterval = async (intervalle: string) => {
    try {
        const response = await axios.patch(`/donneeClubs/intervalUpdate`, {"interval": intervalle}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.status;
    } catch (error) {
        return error;
    }
}