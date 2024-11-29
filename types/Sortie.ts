import {Plongeur} from "@/types/Plongeur";
import {Palanquee} from "@/types/Palanquee";
import {Bateau} from "@/types/Bateau";
import {InscriptionSortie} from "@/types/InscriptionSortie";
import {Creneaux} from "@/types/Creneaux";

export type Sortie = {
    id: number | null;
    type: string | null;
    dateSortie: string | null; // Date sous forme de chaîne (ex: "YYYY-MM-DD")
    lieu: string | null;
    creneau: Creneaux | null;
    directeurPlongee: Plongeur | null;
    securiteSurface: Plongeur | null;
    palanquees: Palanquee[]; // Tableau de Palanquee
    bateau: Bateau | null;
    piloteBateau: Plongeur | null;
    inscriptions: InscriptionSortie[]; // Tableau de InscriptionSortie
    nbMaxInscription: number | null;
    price: number | null;
};




