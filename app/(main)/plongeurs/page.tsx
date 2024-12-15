"use client"
import {RoleGuard} from "@/components/role-guard";
import PlongeursPageComponent from "@/components/profile/plongeurs-page-component";

export default function PlongeurPage() {
    return (
        
            <RoleGuard role={'ROLE_MONITEUR'}>
                <PlongeursPageComponent/>
            </RoleGuard>
        
    );
}
