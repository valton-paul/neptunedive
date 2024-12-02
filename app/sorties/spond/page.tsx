import {MainLayout} from "@/components/app-layout";
import {RoleGuard} from "@/components/role-guard";
import {ImportSpond} from "@/components/sorties/add/import-spond";

export default function Page() {
    return (
        <MainLayout>
            <RoleGuard role={'ROLE_MONITEUR'}>
                <ImportSpond />
            </RoleGuard>
        </MainLayout>
    )
}