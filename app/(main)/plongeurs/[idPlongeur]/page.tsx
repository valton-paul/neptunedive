'use client'
import {useParams} from "next/navigation";
import {RoleGuard} from "@/components/role-guard";
import PlongeurPageFromId from "@/components/profile/plongeur-page-from-id-component";

export default function Page() {
    const params = useParams<{ idPlongeur: string }>()
    return (
        
            <RoleGuard role={'ROLE_MONITEUR'}>
                <PlongeurPageFromId idPlongeur={params.idPlongeur}/>
            </RoleGuard>
        
    );
}
