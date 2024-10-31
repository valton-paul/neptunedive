'use client'
import {useEffect, useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {Sortie} from "@/types/Sortie";
import {SortieCard} from "@/components/sorties/sortie-card";
import {SortieDetails} from "@/components/sorties/sortie-detail";
import {getSortiesWhereUserIsEnrolled} from "@/api/sortiesApi";


export function ListeSorties() {
  const [selectedSortie, setSelectedSortie] = useState<Sortie | null>(null);
  const [enrolledSorties, setEnrolledSorties] = useState<Sortie[]>([]);

  useEffect(() => {
    getSortiesWhereUserIsEnrolled("4").then((sorties) => {
      setEnrolledSorties(sorties);
    });
  }, []);

  const upcomingSorties: Sortie[] = [];

  getSortiesWhereUserIsEnrolled("4");

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Mes Prochaines Sorties</h2>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {enrolledSorties.map(sortie => (
            <Dialog key={sortie.id}>
              <DialogTrigger asChild>
                <div onClick={() => setSelectedSortie(sortie)}>
                  <SortieCard sortie={sortie} />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{sortie.lieu}</DialogTitle>
                  <DialogDescription>Détails</DialogDescription>
                </DialogHeader>
                <SortieDetails sortie={sortie} estInscrit={true} />
              </DialogContent>
            </Dialog>
          ))}
        </ScrollArea>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Sorties à venir</h2>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {upcomingSorties.map(sortie => (
            <Dialog key={sortie.id}>
              <DialogTrigger asChild>
                <div onClick={() => setSelectedSortie(sortie)}>
                  <SortieCard sortie={sortie} />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{sortie.lieu}</DialogTitle>
                  <DialogDescription>Détails</DialogDescription>
                </DialogHeader>
                <SortieDetails sortie={sortie} estInscrit={false} />
              </DialogContent>
            </Dialog>
          ))}
        </ScrollArea>
      </section>
    </div>
  )
}