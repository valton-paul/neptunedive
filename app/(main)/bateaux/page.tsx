import {RoleGuard} from "@/components/role-guard";
import {BateauList} from "@/components/bateaux/bateauList";

export default function Home() {
    return (
        <RoleGuard role={"ROLE_MONITEUR"}>
            <BateauList/>
        </RoleGuard>
    )
}

