import {Plongeur} from "@/types/Plongeur";
import {Palanquee} from "@/types/Palanquee";

export
type AssignationPalanquee = {
    id: number | null;
    plongeur: Plongeur | null; // Plongeur assigné à la palanquée
    palanquee: Palanquee | null; // Palanquée à laquelle le plongeur est assigné
};