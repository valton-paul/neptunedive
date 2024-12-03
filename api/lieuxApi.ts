import axios from "@/api/Axios";

export const getAllLieux = async () => {
    try {
        const response = await axios.get('/api/lieus');
        return response.data.member;
    } catch (error) {
        console.error('Error getting all lieux', error);
    }
}

export const postCreateLieu = async (formData: FormData) => {
    try {
        const response = await axios.post("/api/lieus", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du lieu :", error);
        throw error;
    }
}