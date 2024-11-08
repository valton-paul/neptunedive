import {NiveauMoniteur} from "@/types/NiveauMoniteur";
import {NiveauPlongeeEncadre} from "@/types/NiveauPlongeeEncadre";
import {NiveauPlongeeAutonome} from "@/types/NiveauPlongeeAutonome";

export type InscriptionPlongeur = {
    email: string | null;
    nom: string | null;
    prenom: string | null;
    formation: boolean | null;
    niveauPlongeeAutonome: NiveauPlongeeAutonome | null;
    niveauPlongeeEncadre: NiveauPlongeeEncadre | null;
    niveauMoniteur: NiveauMoniteur | null;
    validee: boolean | null;
};