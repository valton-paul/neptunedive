import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {Palanquee} from "@/types/Palanquee";
import {Plongeur} from "@/types/Plongeur";


export function maxDepth(palanquee: Palanquee, assignationsPalanquees: AssignationPalanquee[]) {
    const assignations = assignationsPalanquees.filter(ap => ap.palanquee.id === palanquee.id)
    if (!palanquee.encadrant) {
        const $niveaux: number[] = assignations.map(ap => {
            if (ap.plongeur?.niveauPlongeeAutonome !== undefined && ap.plongeur?.niveauPlongeeAutonome !== null) {
                return ap.plongeur?.niveauPlongeeAutonome
            }
            return;
        })
        return Math.min(...$niveaux)
    } else {
        const $niveaux: number[] = assignations.map(ap => {
            if (ap.plongeur?.niveauPlongeeEncadre !== undefined && ap.plongeur?.niveauPlongeeEncadre !== null) {
                return ap.plongeur?.niveauPlongeeEncadre
            }
            return;
        })
        let pronfondeurMoniteur
        switch (palanquee.encadrant?.niveauMoniteur) {
            case "E1":
                pronfondeurMoniteur = 6
                break
            case "E2":
                pronfondeurMoniteur = 20
                break
            case "E3":
                pronfondeurMoniteur = 40
                break
            case "E4":
                pronfondeurMoniteur = 60
                break
            default:
                pronfondeurMoniteur = Infinity
        }
        return Math.min(...$niveaux, pronfondeurMoniteur)
    }
}

export function parseTime(timeString: string | null) {
    if (!timeString) {
        return null;
    }
    const [hours, minutes, seconde] = timeString.split(':').map(Number);
    return hours + ':' + minutes + ':' + seconde;
}

export function parseBDTime(timeString: string | null): string {
    if (!timeString) {
        return '';
    }

    const [_, time] = timeString.split('T');
    const [hours, minutes, seconds] = time.split(':');

    return `${hours}:${minutes}:${seconds.slice(0, 2)}`;
}


export interface Equipment {
    stabs: Record<string, number>;
    palmes: Record<string, number>;
    masques: number;
    combinaisons: Record<string, number>;
}

export const calculateEquipment = (
    assignationsPalanquees: AssignationPalanquee[],
): Equipment => {
    const equipment: Equipment = {
        stabs: {},
        palmes: {},
        masques: 0,
        combinaisons: {},
    };

    assignationsPalanquees.forEach((assignation) => {
        const plongeur = assignation.plongeur;

        if (plongeur) {
            equipment.stabs[plongeur.tailleStab] =
                (equipment.stabs[plongeur.tailleStab] || 0) + 1;

            equipment.palmes[plongeur.taillePalmes] =
                (equipment.palmes[plongeur.taillePalmes] || 0) + 1;

            if (!plongeur.possedeMasquePlongee) equipment.masques += 1;

            equipment.combinaisons[plongeur.tailleCombinaison] =
                (equipment.combinaisons[plongeur.tailleCombinaison] || 0) + 1;
        }
    });

    return equipment;
};