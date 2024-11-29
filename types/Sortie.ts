import {Plongeur} from "@/types/Plongeur";
import {Palanquee} from "@/types/Palanquee";
import {Bateau} from "@/types/Bateau";
import {InscriptionSortie} from "@/types/InscriptionSortie";
import {Lieu} from "@/types/Lieu";

export type Sortie = {
    id: number | null;
    type: string | null;
    dateSortie: string | null; // Date sous forme de chaîne (ex: "YYYY-MM-DD")
    idLieu: Lieu;
    directeurPlongee: Plongeur | null;
    securiteSurface: Plongeur | null;
    palanquees: Palanquee[]; // Tableau de Palanquee
    bateau: Bateau | null;
    piloteBateau: Plongeur | null;
    inscriptions: InscriptionSortie[]; // Tableau de InscriptionSortie
    heureSortie: string|null,
    nbMaxInscription: number|null
};




