"use client"
import {MainLayout} from "@/components/app-layout";
import {RoleGuard} from "@/components/role-guard";
import ProfilePageComponent from "@/components/profile/profile-page-component";
import {Plongeur} from "@/types/Plongeur";
import {useUser} from "@/lib/useUser";

export default function ProfilePage() {
    const {user, loading} = useUser();
    return (


        <MainLayout>
            <RoleGuard role={'ROLE_USER'}>
                <>
                    {loading ? (
                        "loading...") : (
                        <ProfilePageComponent user={user}/>
                    )
                    }
                </>
            </RoleGuard>
        </MainLayout>
    );
}
