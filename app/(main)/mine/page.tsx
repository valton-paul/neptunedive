'use client'

import {ScrollArea} from "@/components/ui/scroll-area";
import {Sortie} from "@/types/Sortie";
import {SortieCard} from "@/components/sorties/sortie-card";
import {
    getSortiesWhereUserIsEnrolled,
    getSortiesUserDone,
    enrollToSortie,
    quitSortie,
} from "@/api/sortiesApi";
import {useUser} from "@/lib/useUser";
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator";
import toast from "react-hot-toast";

export default function ListeSortiesInscritesEtPassees() {
    const { user, loading: userLoading } = useUser();

    // Récupère les sorties où l'utilisateur est inscrit
    const {
        data: enrolledSorties = [],
        isLoading: isLoadingEnrolled,
    } = useCustomQuery(
        ["enrolledSorties", user?.id],
        () => getSortiesWhereUserIsEnrolled(user?.id),
        { enabled: !!user?.id }
    );

    // Récupère les sorties passées (déjà effectuées par l'utilisateur)
    const {
        data: doneSorties = [],
        isLoading: isLoadingDone,
    } = useCustomQuery(
        ["doneSorties", user?.id],
        () => getSortiesUserDone(user?.id.toString()),
        { enabled: !!user?.id }
    );

    // Mutation pour s'inscrire ou se désinscrire d'une sortie
    const { mutate: toggleEnrollment } = useCustomMutation(
        async (sortie: Sortie) => {
            if (enrolledSorties.some((s) => s.id === sortie.id)) {
                // L'utilisateur est déjà inscrit -> on se désinscrit
                return await quitSortie(user.id.toString(), sortie.id.toString());
            } else {
                // L'utilisateur n'est pas inscrit -> on s'inscrit
                return await enrollToSortie(user.id.toString(), sortie.id.toString());
            }
        },
        [["enrolledSorties"], ["doneSorties"]], // Invalider les requêtes si besoin
        {
            onSuccess: () => {
                toast.success("Sortie modifiée avec succès", { icon: "🎉" });
            },
            onError: () => {
                toast.error("Erreur lors de la modification de la sortie", {
                    icon: "⚠",
                });
            },
        }
    );

    return (
        <div className="space-y-6">

            {/* Sorties où l'utilisateur est inscrit */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Mes Sorties</h2>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {isLoadingEnrolled ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : enrolledSorties.length > 0 ? (
                        enrolledSorties.map((sortie) => (
                            <div key={sortie.id}>
                                <SortieCard
                                    sortie={sortie}
                                    isEnrolled={true}
                                    onEnrollmentChange={() => toggleEnrollment(sortie)}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            Vous n’êtes inscrit à aucune sortie.
                        </p>
                    )}
                </ScrollArea>
            </section>

            {/* Sorties passées de l'utilisateur */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Mes Sorties Passées</h2>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {isLoadingDone ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : doneSorties.length > 0 ? (
                        doneSorties.map((sortie) => (
                            <div key={sortie.id}>
                                <SortieCard sortie={sortie} isEnrolled={true} displayEnrollButton={false} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            Vous n’avez aucune sortie passée.
                        </p>
                    )}
                </ScrollArea>
            </section>

        </div>
    );
}
