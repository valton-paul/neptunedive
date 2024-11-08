'use client'

// app/finaliser-demande/[id]/page.tsx

import { MainLayout } from "@/components/app-layout";
import { useParams } from "next/navigation";
import { FinaliserDemande } from "@/components/demandeInscription/app-finalisation-demande";

export default function Page() {
    const params = useParams();

    if (!params.id) {
        return <div>Erreur : aucun ID de demande spécifié.</div>;
    }

    return (
        <MainLayout>
            <FinaliserDemande idDemande={params.id as string}/>
        </MainLayout>
    );
}
