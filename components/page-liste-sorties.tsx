'use client'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sortie } from "@/types/Sortie";
import { SortieCard } from "@/components/sorties/sortie-card";
import { enrollToSortie, getFutureSortieUserHasntEnrolledTo, getSortiesWhereUserIsEnrolled, quitSortie } from "@/api/sortiesApi";
import { useUser } from "@/lib/useUser";
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator";

export function ListeSorties() {
    const { user, loading: userLoading } = useUser();

    const { data: enrolledSorties = [], isLoading: isLoadingEnrolled } = useCustomQuery(
        ['enrolledSorties', user?.id],
        () => getSortiesWhereUserIsEnrolled(user?.id),
        { enabled: !!user?.id }
    );

    const { data: upcomingSorties = [], isLoading: isLoadingFuture } = useCustomQuery(
        ['upcomingSorties', user?.id],
        () => getFutureSortieUserHasntEnrolledTo(user?.id),
        { enabled: !!user?.id }
    );

    const mutationOptions = [['enrolledSorties'], ['upcomingSorties']];

    const { mutate: toggleEnrollment } = useCustomMutation(
        async (sortie: Sortie) => {
            if (enrolledSorties.some(s => s.id === sortie.id)) {
                return await quitSortie(user.id.toString(), sortie.id.toString());
            } else {
                return await enrollToSortie(user.id.toString(), sortie.id.toString());
            }
        },
        mutationOptions
    );

    return (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold mb-4">Mes Prochaines Sorties</h2>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {isLoadingEnrolled ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : enrolledSorties.length > 0 ? (
                        enrolledSorties.map(sortie => (
                            <div key={sortie.id}>
                                <SortieCard sortie={sortie} isEnrolled={true} onEnrollmentChange={() => toggleEnrollment(sortie)} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            Vous êtes inscrit à aucune sortie
                        </p>
                    )}
                </ScrollArea>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Sorties à venir</h2>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {isLoadingFuture ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : upcomingSorties.length > 0 ? (
                        upcomingSorties.map(sortie => (
                            <div key={sortie.id}>
                                <SortieCard sortie={sortie} onEnrollmentChange={() => toggleEnrollment(sortie)} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            Pas de sortie à venir
                        </p>
                    )}
                </ScrollArea>
            </section>
        </div>
    );
}
