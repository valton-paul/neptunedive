'use client'
import {MainLayout} from "@/components/app-layout";
import {ListeSortiesIgnored} from "@/components/sorties/ignored-sorties-page-component";

export default function Page(){
    return (
        <MainLayout>
            <ListeSortiesIgnored/>
        </MainLayout>
    );
}