import axios from "@/api/Axios";
import {Plongeur} from "@/types/Plongeur";
import {useCustomQuery} from "@/tanStackQuery/queryGenerator";

export function useUser() {
    const {data: user, isLoading: loading} =
        useCustomQuery(['me'],
            async () => (await axios.get<Plongeur>('/api/me')).data);
    return {user, loading};
}
