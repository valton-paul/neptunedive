import {MainLayout} from "@/components/app-layout";
import {InscriptionPlongeurForm} from "@/components/demandeInscription/app-form-demande-inscription";

export default function Page(){
    return (
        <MainLayout>
            <InscriptionPlongeurForm />
        </MainLayout>
    );
}