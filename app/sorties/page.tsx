import {MainLayout} from "@/components/app-layout";
import {AgendaSortie} from "@/components/sorties/agenda/agenda";

export default function Page(){
    return (
        <MainLayout>
            <AgendaSortie />
        </MainLayout>
    );
}