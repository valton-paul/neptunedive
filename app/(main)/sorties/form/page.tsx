import SortieForm from "@/components/sorties/add/create-sortie";
import {RoleGuard} from "@/components/role-guard";

export default function Page() {
    return (
        
            <RoleGuard role={'ROLE_MONITEUR'}>
                <SortieForm />
            </RoleGuard>
        
    )
}