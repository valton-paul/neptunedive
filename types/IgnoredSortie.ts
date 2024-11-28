import {Plongeur} from "@/types/Plongeur";
import {Sortie} from "@/types/Sortie";

export type IgnoredSortie = {
    id: number | null;
    plongeur: Plongeur | null;
    sortie: Sortie | null;
}