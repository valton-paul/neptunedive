import {RoleGuard} from "@/components/role-guard";
import LieuManagement from "@/components/lieux/lieuList";

export default function Home() {
    return (
        
            <RoleGuard role={"ROLE_MONITEUR"}>
                <LieuManagement/>
            </RoleGuard>
        
    )
}

