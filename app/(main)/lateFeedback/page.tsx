import LateFeedBacks from "@/components/commentaires/lateFeedback/page-late-feedback";
import {RoleGuard} from "@/components/role-guard";

export default function Page(){
    return (
        
            <RoleGuard role={'ROLE_MONITEUR'}>
                <LateFeedBacks />
            </RoleGuard>
        
    );
}