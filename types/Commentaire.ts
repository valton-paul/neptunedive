import {Plongeur} from "@/types/Plongeur";
import {Sortie} from "@/types/Sortie";

export type Commentaire = {
    id: number | null;
    message: string | null;
    dateCommentaire: string | null; // La date est représentée sous forme de chaîne (ex: "YYYY-MM-DD")
    sortie: Sortie | null; // La sortie associée au commentaire
    plongeur: Plongeur | null; // Le plongeur qui a créé le commentaire
    moniteur: Plongeur | null; // Le moniteur associé au commentaire
};