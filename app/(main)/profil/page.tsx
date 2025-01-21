"use client"
import {RoleGuard} from "@/components/role-guard";
import ProfilePageComponent from "@/components/profile/profile-page-component";
import {useUser} from "@/lib/useUser";

export default function ProfilePage() {
    const {user, loading} = useUser();
    if (!user) {
        return <div>loading...</div>
    }
    const isAdminOrMoniteur = user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_MONITEUR');
    return (


        
            <RoleGuard role={'ROLE_USER'}>
                <>
                    {loading ? (
                        "loading...") : (
                        <ProfilePageComponent user={user} profile={!isAdminOrMoniteur}/>
                    )
                    }
                </>
            </RoleGuard>
        
    );
}
