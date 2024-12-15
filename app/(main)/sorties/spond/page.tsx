import {RoleGuard} from "@/components/role-guard";
import {ImportSpond} from "@/components/sorties/add/import-spond";

export default function Page() {
    return (
        
            <RoleGuard role={'ROLE_MONITEUR'}>
                <ImportSpond />
            </RoleGuard>
        
    )
}