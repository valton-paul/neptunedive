import {MainLayout} from "@/components/app-layout";
import LateFeedBacks from "@/components/commentaires/lateFeedback/page-late-feedback";
import {RoleGuard} from "@/components/role-guard";

export default function Page(){
    return (
        <MainLayout>
            <RoleGuard role={'ROLE_MONITEUR'}>
                <LateFeedBacks />
            </RoleGuard>
        </MainLayout>
    );
}