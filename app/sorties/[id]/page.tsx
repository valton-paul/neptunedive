'use client'
// pages/commentaires/page.tsx
import { MainLayout } from "@/components/app-layout";
import {useParams} from "next/navigation";
import {SafetySheet} from "@/components/sorties/safety-sheet/safety-sheet";
import {RoleGuard} from "@/components/role-guard";

export default function Page() {
    const params = useParams<{ id: string}>()
    return (
        <MainLayout>
            <RoleGuard role={'ROLE_MONITEUR'}>
                <SafetySheet idSortie={params.id}/>
            </RoleGuard>
        </MainLayout>
    );
}
