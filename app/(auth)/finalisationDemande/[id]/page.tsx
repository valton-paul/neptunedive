'use client'

// app/finaliser-demande/[id]/lieuList.tsx

import { useParams } from "next/navigation";
import { FinaliserDemande } from "@/components/demandeInscription/app-finalisation-demande";

export default function Page() {
    const params = useParams();

    if (!params.id) {
        return <div>Erreur : aucun ID de demande spécifié.</div>;
    }

    return (
        
            <FinaliserDemande idDemande={params.id as string}/>
        
    );
}
