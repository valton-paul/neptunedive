import {Plongeur} from "@/types/Plongeur";
import {Sortie} from "@/types/Sortie";

export type InscriptionSortie = {
    id: number | null;
    sortie: Sortie | null; // Sortie à laquelle le plongeur est inscrit
    plongeur: Plongeur | null; // Plongeur inscrit à la sortie
    paymentDate: Date | null; // Date de paiement
};