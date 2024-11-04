import { useEffect, useState } from 'react';
import { Sortie } from '@/types/Sortie';

export function useFetchSorties(userId: string | undefined, fetchFunction: (id: string) => Promise<Sortie[]>) {
    const [sorties, setSorties] = useState<Sortie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSorties = async () => {
            setIsLoading(true);
            if (!userId) {
                setIsLoading(false);
                return;
            }
            const data = await fetchFunction(userId);
            setSorties(data);
            setIsLoading(false);
        };

        fetchSorties();
    }, [userId, fetchFunction]);

    return { sorties, isLoading };
}
