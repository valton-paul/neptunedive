import {useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getSortiesUserDone} from "@/api/sortiesApi";
import {Sortie} from "@/types/Sortie";
import {SortieCard} from "@/components/sorties/sortie-card";

interface PlongeurPageFromIdProps {
    idPlongeur: number;
}

export function PlongeurHistorique({idPlongeur}: PlongeurPageFromIdProps) {
    const {data: sorties = [], isLoading} = useCustomQuery<Sortie[]>(
        ['sorties'],
        () => getSortiesUserDone(idPlongeur.toString()), {enabled: !!idPlongeur});

    return (
        <>
            {
                isLoading ? (
                    "Loading..."
                ) : (
                    sorties && sorties.length > 0 ? (
                        <ul>
                            {sorties.map((sortie: Sortie) => (
                                <div key={sortie.id}>
                                    <SortieCard
                                        sortie={sortie}
                                        isEnrolled={true}
                                    />
                                </div>
                            ))}
                        </ul>
                    ) : (
                        "Aucune sortie trouvée."
                    )
                )
            }
        </>
    );
}
