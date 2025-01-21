
import {maxDepth} from "@/lib/utilsSafetySheet";
export const handleDragStart = (event, divers, palanquees, assignationsPalanquees, setActiveDiver) => {
    const { active } = event
    let diver = divers.find(diver => diver.id === active.id)
    diver = !diver ? palanquees.find(palanquee => palanquee.encadrant?.id === active.id)?.encadrant : diver
    diver = !diver ? assignationsPalanquees.find(assignationsPalanquee => assignationsPalanquee.plongeur.id === active.id)?.plongeur : diver
    setActiveDiver(diver)
}


export const handleDragEnd = async (event, divers, sortieId, palanquees, assignationsPalanquees, setActiveDiver, moveDiverInPalanqueeDivers, moveDiverOutPalanqueeDivers, updateAPalanquee) => {
    const { active, over } = event
    if (!over) {
        setActiveDiver(null)
        return
    }
    if (active.id !== over.id) {
        const isMovingToGroupDivers = over.id.startsWith('divers')
        const isMovingToGroupSupervisor = over.id.startsWith('supervisor')
        const isMovingToSidebarDivers = over.id.includes('sidebar-divers')
        const isMovingToSidebarMonitor = over.id.includes('sidebar-monitor')
        if (isMovingToGroupDivers || isMovingToGroupSupervisor) {
            const groupId = over.id.split('-')[1]
            const goupIdInt = parseInt(groupId)
            let diver = divers.find(d => d.id === active.id)
            let group;
            if (isMovingToGroupDivers) {
                let palanquee;
                if (!diver) {
                    group = assignationsPalanquees.find(assignationsPalanquee => assignationsPalanquee.plongeur.id === active.id && assignationsPalanquees.palanquee?.id !== goupIdInt)
                    diver = group ? group.plongeur : undefined
                    palanquee = !diver ? palanquees.find(palanquee => palanquee.encadrant?.id === active.id ) : undefined
                }
                if (diver){
                    if (group) {
                        moveDiverOutPalanqueeDivers({idPlongeur: diver.id, idPalanquee: group.palanquee.id})
                    }
                    setTimeout(() => {
                        moveDiverInPalanqueeDivers({idPlongeur: diver.id, idPalanquee: groupId})
                        const newPalanque = palanquees.find(palanquee => palanquee.id === goupIdInt)
                        updateAPalanquee({...newPalanque, sortie: sortieId, encadrant: newPalanque.encadrant?.id,
                            profondeurPrevue: maxDepth(newPalanque, [...assignationsPalanquees, {palanquee: newPalanque, plongeur: diver}])})
                    }, 50)
                } else if (palanquee) {
                    updateAPalanquee({...palanquee, encadrant: null, sortie: sortieId,
                        profondeurPrevue: maxDepth(palanquee, [...assignationsPalanquees, {palanquee: palanquee, plongeur: palanquee.encadrant.id}])})

                    moveDiverInPalanqueeDivers({idPlongeur: palanquee.encadrant.id, idPalanquee: groupId})
                    const newPalanque = palanquees.find(palanquee => palanquee.id === goupIdInt)

                    updateAPalanquee({...newPalanque, sortie: sortieId, encadrant: palanquee.id == newPalanque.id ? null : newPalanque.encadrant?.id,
                        profondeurPrevue: maxDepth(newPalanque, [...assignationsPalanquees, {palanquee: {...newPalanque, encadrant :null}, plongeur: {niveauPlongeeAutonome: palanquee.encadrant.niveauPlongeeAutonome, niveauPlongeeEncadre: palanquee.encadrant.niveauPlongeeEncadre, id: palanquee.encadrant.id}}])})
                }
            }
            if (isMovingToGroupSupervisor) {
                let isMoniteurInPalanquee = false
                let assignation;
                if (!diver) {
                    group = palanquees.find(palanquee => palanquee.encadrant?.id === active.id && palanquee.id !== goupIdInt)
                    diver = group ? group.encadrant : undefined
                    assignation = !diver ? assignationsPalanquees.find(assignationsPalanquee => assignationsPalanquee.plongeur.id === active.id) : undefined
                }
                if (diver?.isMoniteur || assignation?.plongeur.isMoniteur) {
                    if (assignation) {
                        isMoniteurInPalanquee = true
                    }
                    const palanqueeDestination = palanquees.find(palanquee => palanquee.id === goupIdInt)
                    if (diver && !isMoniteurInPalanquee) {
                        const groupPrevious = palanquees.find(palanquee => palanquee.encadrant?.id === diver.id)
                        if (groupPrevious) {
                            updateAPalanquee({...groupPrevious, encadrant: null, sortie: sortieId})
                        }
                        updateAPalanquee({...palanqueeDestination, encadrant: diver.id, sortie: sortieId})
                    } else if (isMoniteurInPalanquee) {
                        moveDiverOutPalanqueeDivers({idPlongeur: assignation.plongeur.id, idPalanquee: assignation.palanquee.id})
                        updateAPalanquee({...palanqueeDestination, encadrant: assignation.plongeur.id, sortie: sortieId})
                    }
                }
            }
        } else if (isMovingToSidebarDivers || isMovingToSidebarMonitor) {
            if (isMovingToSidebarDivers) {
                const assignationsPalanquee = assignationsPalanquees.find(assignationsPalanquee => assignationsPalanquee.plongeur.id === active.id)
                const diver = assignationsPalanquee ? assignationsPalanquee.plongeur : undefined
                if (diver && diver.isMoniteur === false) {
                    moveDiverOutPalanqueeDivers({idPlongeur: diver.id, idPalanquee: assignationsPalanquee.palanquee.id})
                    updateAPalanquee({...assignationsPalanquee.palanquee,encadrant: assignationsPalanquee.palanquee.encadrant ? assignationsPalanquee.palanquee.encadrant.id : null, sortie: sortieId, profondeurPrevue: maxDepth(assignationsPalanquee.palanquee, assignationsPalanquees.filter(ap => ap.plongeur.id !== diver.id))})
                }
            } else if (isMovingToSidebarMonitor) {
                let isMoniteurInPalanquee = false
                let palanquee = palanquees.find(palanquee => palanquee.encadrant?.id === active.id)
                const diver = palanquee ? palanquee.encadrant : undefined
                const assignation = !diver ? assignationsPalanquees.find(assignationsPalanquee => assignationsPalanquee.plongeur.id === active.id) : undefined
                if (diver?.isMoniteur || assignation?.plongeur.isMoniteur) {
                    if (palanquee) {
                        isMoniteurInPalanquee = true
                    }
                    if (diver && isMoniteurInPalanquee) {
                        updateAPalanquee({...palanquee, encadrant: null, sortie: sortieId})
                    } else if (!isMoniteurInPalanquee) {
                        palanquee = palanquees.find(p => assignation.palanquee.id == p.id)
                        moveDiverOutPalanqueeDivers({idPlongeur: assignation.plongeur.id, idPalanquee: assignation.palanquee.id})
                        updateAPalanquee({...palanquee, encadrant: palanquee.encadrant ? palanquee.encadrant.id : null, sortie: sortieId, profondeurPrevue: maxDepth(palanquee, assignationsPalanquees.filter(ap => ap.plongeur.id !== assignation.plongeur.id))})
                    }
                }
            }
        }
    }
    setActiveDiver(null)
}
