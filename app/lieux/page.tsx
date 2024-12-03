import {MainLayout} from "@/components/app-layout";
import {RoleGuard} from "@/components/role-guard";
import LieuManagement from "@/components/lieux/lieuList";

export default function Home() {
    return (
        <MainLayout>
            <RoleGuard role={"ROLE_MONITEUR"}>
                <LieuManagement/>
            </RoleGuard>
        </MainLayout>
    )
}

