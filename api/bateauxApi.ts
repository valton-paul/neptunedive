import axios from "@/api/Axios";

export const getAllBateaux = async () => {
    try {
        const response = await axios.get('/api/bateaus');
        return response.data.member;
    } catch (error) {
        console.error('Error getting all bateaux', error);
    }
}

export const createBateau = async (payload: {
    immatriculation: string;
    nbPlaces: number;
})=> {

    try {
        return await axios.post(`/api/bateaus`, payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error creating bateaux:', error);
    }
}

export const deleteBateau = async (bateauId: number) => {
    try{
        await axios.delete(`/api/bateaus/${bateauId}`)
    }catch (error) {
        console.error('Error deleting bateau:', error);
    }
}

export const updateBateau = async (payload: {
    id?: number;
    immatriculation?: string;
    nbPlaces?: number;
}) => {
    try{
        return await axios.patch(`/api/bateaus/${payload.id}`, payload,
        {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }catch (error) {
        console.error('Error patch bateau:', error);
    }
}