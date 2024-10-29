import {MainLayout} from "@/components/app-layout";
import {ListeSorties} from "@/components/page-liste-sorties";

export default function Home() {
    return (
        <MainLayout>
            <ListeSorties />
        </MainLayout>
    );
}
