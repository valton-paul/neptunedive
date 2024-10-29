import {Sortie} from "@/types/Sortie";

export type Bateau = {
    id: number | null;
    immatriculation: string | null;
    sorties: Sortie[]; // Liste des sorties associées au bateau
    nbPlaces: number | null;
};
