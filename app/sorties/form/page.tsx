import {MainLayout} from "@/components/app-layout";
import SortieForm from "@/components/sorties/add/create-sortie";
import {RoleGuard} from "@/components/role-guard";

export default function Page() {
    return (
        <MainLayout>
            <RoleGuard role={'ROLE_MONITEUR'}>
                <SortieForm />
            </RoleGuard>
        </MainLayout>
    )
}