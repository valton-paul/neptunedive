import {MainLayout} from "@/components/app-layout";
import {ListeSorties} from "@/components/page-liste-sorties";
import {RoleGuard} from "@/components/role-guard";

export default function Home() {
    return (
        <MainLayout>
            <RoleGuard role={'ROLE_USER'}>
                <ListeSorties/>
            </RoleGuard>
        </MainLayout>
    );
}
