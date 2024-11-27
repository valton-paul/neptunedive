'use client'
// pages/commentaires/page.tsx
import { MainLayout } from "@/components/app-layout";
import { PageComments } from "@/components/commentaires/page-comments";
import {useParams} from "next/navigation";
import {RoleGuard} from "@/components/role-guard";

export default function Page() {
    const params = useParams<{ id: string}>()
    return (
        <MainLayout>
            <RoleGuard role={'ROLE_MONITEUR'}>
                <PageComments idPlongeur={params.id} />
            </RoleGuard>
        </MainLayout>
    );
}
