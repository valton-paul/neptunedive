import {MainLayout} from "@/components/app-layout";
import {HistoriqueSortie} from "@/components/page-historique-sortie";

export default function Page(){
    return (
        <MainLayout>
            <HistoriqueSortie />
        </MainLayout>
    );
}