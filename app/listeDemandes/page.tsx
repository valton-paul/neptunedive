import {MainLayout} from "@/components/app-layout";
import {DemandesList} from "@/components/demandeInscription/app-liste-demandes";

export default function Page(){
    return (
        <MainLayout>
            <DemandesList />
        </MainLayout>
    );
}