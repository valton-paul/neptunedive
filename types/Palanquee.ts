import {Plongeur} from "@/types/Plongeur";
import {Sortie} from "@/types/Sortie";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";

export type Palanquee = {
    id: number | null;
    dureePrevue: string | null; // Durée prévue sous forme de chaîne (ex: "HH:MM:SS")
    dureeRealisee: string | null; // Durée réalisée sous forme de chaîne (ex: "HH:MM:SS")
    profondeurPrevue: number | null;
    profondeurRealisee: number | null;
    sortie: Sortie | null; // Sortie associée
    encadrant: Plongeur | null; // Plongeur encadrant
    plongeurAssignes: AssignationPalanquee[]; // Liste des assignations aux palanquées
};