import ProfilePageComponent from "@/components/profile/profile-page-component";
import {useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getPlongeur} from "@/api/plongeurApi";

interface PlongeurPageFromIdProps {
    idPlongeur: string;
}

export default function PlongeurPageFromId({idPlongeur: idPlongeur}: PlongeurPageFromIdProps) {
    const {
        data: user,
        isLoading
    } = useCustomQuery(['plongeur', idPlongeur], () => getPlongeur(parseInt(idPlongeur)), {enabled: !!idPlongeur});
    return (
        <>
            {
                isLoading ? (
                    "loading...") : (
                    <ProfilePageComponent user={user} profile={false}/>
                )
            }
        </>
    );
}