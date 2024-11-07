"use client"
import {MainLayout} from "@/components/app-layout";
import {RoleGuard} from "@/components/role-guard";
import PlongeursPageComponent from "@/components/profile/plongeurs-page-component";

export default function PlongeurPage() {
    return (
        <MainLayout>
            <RoleGuard role={'ROLE_MONITEUR'}>
                <PlongeursPageComponent/>
            </RoleGuard>
        </MainLayout>
    );
}
