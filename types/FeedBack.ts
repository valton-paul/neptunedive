import {Creneaux} from "@/types/Creneaux";

export interface FeedBack {
    sortie_id: string
    plongeur_id: string
    encadrant_id: string
    nom: string
    prenom: string
    duree_prevue: string
    duree_realisee: string
    profondeur_prevue: number
    profondeur_realisee: number
    type: string
    date_sortie: string
    lieu: string
    creneau: Creneaux
}