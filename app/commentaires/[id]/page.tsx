'use client'
// pages/commentaires/page.tsx
import { MainLayout } from "@/components/app-layout";
import { PageComments } from "@/components/page-comments";
import {useParams} from "next/navigation";

export default function Page() {
    const params = useParams<{ id: string}>()
    return (
        <MainLayout>
            <PageComments idPlongeur={params.id} />
        </MainLayout>
    );
}
