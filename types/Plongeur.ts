import {Sortie} from "@/types/Sortie";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {InscriptionSortie} from "@/types/InscriptionSortie";
import {Palanquee} from "@/types/Palanquee";
import {NiveauMoniteur} from "@/types/NiveauMoniteur";
import {NiveauPlongeeEncadre} from "@/types/NiveauPlongeeEncadre";
import {Commentaire} from "@/types/Commentaire";
import {NiveauPlongeeAutonome} from "@/types/NiveauPlongeeAutonome";

export type Plongeur = {
    id: number ;
    email: string | null;
    roles: string[]; // Liste de rôles
    password?: string; // Non retourné par l'API, mais défini dans l'entité
    plainPassword?: string | null; // Non retourné par l'API
    nom: string | null;
    prenom: string | null;
    formation: boolean | null;
    niveauPlongeeAutonome: NiveauPlongeeAutonome | null;
    commentaires: Commentaire[]; // Tableau de commentaires
    niveauPlongeeEncadre: NiveauPlongeeEncadre | null;
    niveauMoniteur: NiveauMoniteur | null;
    sortiesDP: Sortie[]; // Sorties en tant que directeur
    palanquees: Palanquee[]; // Palanquées assignées
    isMoniteur: boolean | null;
    sorties: InscriptionSortie[]; // Sorties où le plongeur est inscrit
    assignationPalanquees: AssignationPalanquee[]; // Assignations aux palanquées
};