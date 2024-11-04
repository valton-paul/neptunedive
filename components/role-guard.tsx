"use client"
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/api/Axios';
import {Plongeur} from "@/types/Plongeur";

interface RoleGuardProps {
    role: string;
    children: ReactNode;
}

export const RoleGuard = ({ role, children }: RoleGuardProps) => {
    const [hasAccess, setHasAccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const response = await axios.get('/api/me');
                const user: Plongeur = response.data;

                if (user && user.roles.includes(role)) { //TODO changer pour qu'on puisse avoir plusieurs roles (ex une page ou un moniteur et / ou un admin puisse acceder)
                    setHasAccess(true);
                } else {
                    setHasAccess(false);
                    router.push('/unauthorized'); // Redirige si l'utilisateur n'a pas accès
                }
            } catch (error) {
                console.error("Erreur d'accès :", error);
                router.push('/login'); // Redirige vers la connexion en cas d'erreur
            }
        };

        checkUserRole();
    }, [role, router]);

    if (!hasAccess) {
        return null; // Retourne rien si l'utilisateur n'a pas accès
    }

    return <>{children}</>;
};
