'use client'
import {useEffect, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Sortie} from "@/types/Sortie";
import {SortieCard} from "@/components/sorties/sortie-card";
import {SortieDetails} from "@/components/sorties/sortie-detail";
import {getFutureSortieUserHasntEnrolledTo, getSortiesWhereUserIsEnrolled} from "@/api/sortiesApi";
import {useUser} from "@/lib/useUser";
import {useFetchSorties} from "@/lib/useFetchSorties";


export function ListeSorties() {
    const {user, loading: userLoading} = useUser();
    const [selectedSortie, setSelectedSortie] = useState<Sortie | null>(null);
    const { sorties: enrolledSorties, isLoading: isLoadingEnrolled } = useFetchSorties(
        user?.id,
        getSortiesWhereUserIsEnrolled
    );

    const { sorties: upcomingSorties, isLoading: isLoadingFuture } = useFetchSorties(
        user?.id,
        getFutureSortieUserHasntEnrolledTo
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
                            <Dialog key={sortie.id}>
                                <DialogTrigger asChild>
                                    <div onClick={() => setSelectedSortie(sortie)}>
                                        <SortieCard sortie={sortie}/>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{sortie.lieu}</DialogTitle>
                                        <DialogDescription>Détails</DialogDescription>
                                    </DialogHeader>
                                    <SortieDetails sortie={sortie} estInscrit={true}/>
                                </DialogContent>
                            </Dialog>
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
                    ) : (
                        upcomingSorties.length > 0 ? (
                            upcomingSorties.map(sortie => (
                                <Dialog key={sortie.id}>
                                    <DialogTrigger asChild>
                                        <div onClick={() => setSelectedSortie(sortie)}>
                                            <SortieCard sortie={sortie}/>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{sortie.lieu}</DialogTitle>
                                            <DialogDescription>Détails</DialogDescription>
                                        </DialogHeader>
                                        <SortieDetails sortie={sortie} estInscrit={false}/>
                                    </DialogContent>
                                </Dialog>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">
                                Pas de sortie à venir
                            </p>
                        ))}
                </ScrollArea>
            </section>
        </div>
    )
}