import {RoleGuard} from "@/components/role-guard";
import {ClubForm} from "@/components/club/ClubForm";


export default function Page() {
    return (
        <RoleGuard role={"ROLE_ADMIN"}>
            <ClubForm/>
        </RoleGuard>
    );
}