import {MainLayout} from "@/components/app-layout";
import {RoleGuard} from "@/components/role-guard";
import {ClubForm} from "@/components/club/ClubForm";


export default function Page(){
    return (
        <MainLayout>
            <RoleGuard role={"ROLE_ADMIN"}>
                <ClubForm/>
            </RoleGuard>
        </MainLayout>
    );
}