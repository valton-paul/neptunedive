'use client'
// pages/commentaires/page.tsx
import { MainLayout } from "@/components/app-layout";
import { PageComments } from "@/components/page-comments";
import {useParams} from "next/navigation";
import {SafetySheet} from "@/components/sorties/safety-sheet/safety-sheet";

export default function Page() {
    const params = useParams<{ id: string}>()
    return (
        <MainLayout>
            <SafetySheet idSortie={params.id}/>
        </MainLayout>
    );
}
