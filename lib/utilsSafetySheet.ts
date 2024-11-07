import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {Palanquee} from "@/types/Palanquee";




export function maxDepth(palanquee: Palanquee, assignationsPalanquees: AssignationPalanquee[]) {
    const assignations = assignationsPalanquees.filter(ap => ap.palanquee.id === palanquee.id)
    if (!palanquee.encadrant){
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