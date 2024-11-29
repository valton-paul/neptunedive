import {MainLayout} from "@/components/app-layout";
import {RoleGuard} from "@/components/role-guard";
import {BateauList} from "@/components/bateaux/bateauList";

export default function Home() {
    return (
        <MainLayout>
            <RoleGuard role={"ROLE_MONITEUR"}>
                <BateauList/>
            </RoleGuard>
        </MainLayout>
    )
}

