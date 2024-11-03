'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {SortieCard} from "@/components/sorties/sortie-card";
import {SortieDetails} from "@/components/sorties/sortie-detail";
import {useEffect, useState} from "react";
import {Sortie} from "@/types/Sortie";
import {getSortiesUserDone} from "@/api/sortiesApi";
import {useUser} from "@/lib/useUser";

export function HistoriqueSortie() {
    const [sortiesDone, setSortieDone] = useState<Sortie[]>([]);
    const {user, loading: userLoading} = useUser();


    useEffect(() => {
        // Si l'utilisateur n'est pas en cours de chargement et qu'on a l'ID utilisateur
        if (!userLoading && user?.id) {
            getSortiesUserDone(user.id.toString()).then((sorties) => {
                setSortieDone(sorties);
            });
        }
    }, [user, userLoading]);

return (
    <div className="space-y-6">
        <section>
            <h2 className="text-2xl font-bold mb-4">Mon historique de sorties</h2>
            {sortiesDone.map(sortie => (
                <Dialog key={sortie.id}>
                    <DialogTrigger asChild>
                        <div>
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
            ))}
        </section>
    </div>
);
}