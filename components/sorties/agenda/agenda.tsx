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
import {SetStateAction, useEffect, useState} from "react";
import {Sortie} from "@/types/Sortie";
import {getSortie} from "@/api/sortiesApi";
import {useUser} from "@/lib/useUser";

export function AgendaSortie() {
    const [allSorties, setAllSorties] = useState<Sortie[]>([]);
    const {user, loading: userLoading} = useUser();


    useEffect(() => {
        // Si l'utilisateur n'est pas en cours de chargement et qu'on a l'ID utilisateur
        if (!userLoading && user?.id) {
            getSortie(user.id.toString()).then((sorties: SetStateAction<Sortie[]>) => {
                setAllSorties(sorties);
            });
        }
    }, [user, userLoading]);

    return (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold mb-4">Toutes les sorties</h2>
                {allSorties.map(sortie => (
                    <Dialog key={sortie.id}>
                        <DialogTrigger asChild>
                            <div>
                                <SortieCard sortie={sortie} displayEnrollButton={false}/>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{sortie.idLieu.nomLieu}</DialogTitle>
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