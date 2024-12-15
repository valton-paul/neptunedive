import {ListeSorties} from "@/components/page-liste-sorties";
import {RoleGuard} from "@/components/role-guard";

export default function Home() {
    return (
        <RoleGuard role={'ROLE_USER'}>
            <ListeSorties/>
        </RoleGuard>
    );
}
