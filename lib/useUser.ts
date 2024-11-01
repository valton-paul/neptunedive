import {useEffect, useState} from 'react';
import axios from "@/api/Axios";
import {Plongeur} from "@/types/Plongeur";

export function useUser() {
    const [user, setUser] = useState<Plongeur|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/me')
                setUser(res.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return {user, loading};
}
