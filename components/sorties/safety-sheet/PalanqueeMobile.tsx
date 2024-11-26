import React from "react"
import {Card} from "@/components/ui/card"
import {PlusCircle, Trash2} from 'lucide-react'
import PalanqueeTimeDetail from "@/components/sorties/safety-sheet/PalanqueeTime";
import {Palanquee} from "@/types/Palanquee";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {Button} from "@/components/ui/button";
import {DiverSelector} from "@/components/sorties/safety-sheet/diver-selector";
import {Plongeur} from "@/types/Plongeur";

interface PalanqueeMobileCardProps {
    indexPalanquee: number;
    nombrePalanquees: number;
    palanquee: Palanquee;
    assignationsPalanquees: AssignationPalanquee[];
    updateDebouncedPalanquee: (palanquee: Palanquee) => void;
    onDeletePalanquee: (id: string) => void;
    onAddDiver: ({idPlongeur, idPalanquee}: { idPlongeur: string, idPalanquee: string }) => void;
    onRemoveDiver: ({idPlongeur, idPalanquee}: { idPlongeur: string, idPalanquee: string }) => void;
    divers: Plongeur[];
    setMoniteur: (palanquee: Palanquee, idPlongeur: string) => void;
    onRemoveMoniteur: (palanquee: Palanquee) => void;
}

export function PalanqueeMobileCard({
                                        indexPalanquee,
                                        nombrePalanquees,
                                        palanquee,
                                        assignationsPalanquees,
                                        updateDebouncedPalanquee,
                                        onDeletePalanquee,
                                        onAddDiver,
                                        onRemoveDiver,
                                        divers,
                                        setMoniteur,
                                        onRemoveMoniteur
                                    }: PalanqueeMobileCardProps) {
    const removeDiver = (diverId: string) => {
        onRemoveDiver({idPlongeur: diverId, idPalanquee: palanquee.id})
    }

    const addDiver = (diverId: string) => {
        onAddDiver({idPlongeur: diverId, idPalanquee: palanquee.id})
    }

    const addMoniteur = (diverId: string) => {
        setMoniteur(palanquee, diverId)
    }

    const removeMoniteur = () => {
        onRemoveMoniteur(palanquee)
    }

    return (
        <Card
            className={`p-4 relative`}
        >
            <div className="space-y-4">
                {nombrePalanquees > 1 && (
                <span
                    className="text-lg font-semibold text-[#2f3570]">{indexPalanquee + 1} / {nombrePalanquees}</span>
                )}
                <Trash2
                    className="absolute top-2 right-2 cursor-pointer h-4 w-4"
                    onClick={() => onDeletePalanquee(palanquee.id)}
                />
                <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Encadrant</label>
                        {!palanquee.encadrant ? (
                            <DiverSelector
                                divers={divers.filter((diver) => diver.isMoniteur === true)}
                                onSelectDiver={addMoniteur}
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center text-[#2f3570]"
                                    >
                                        <PlusCircle className="w-5 h-5"/>
                                    </Button>
                                }
                            />
                        ) : null}
                    </div>
                    <div className="mt-2">
                        {palanquee.encadrant ? (
                            <div className="flex justify-between items-center">
                                <span>{`${palanquee.encadrant.prenom} ${palanquee.encadrant.nom}`}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center text-[#2f3570]"
                                    onClick={removeMoniteur}
                                >
                                    <Trash2
                                        className="cursor-pointer h-4 w-4 text-red-500"
                                    />
                                </Button>
                            </div>

                        ) : (
                            <span className="text-gray-500">Aucun encadrant assigné</span>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Plongeurs</label>
                        <DiverSelector
                            divers={divers}
                            onSelectDiver={addDiver}
                            trigger={
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center text-[#2f3570]"
                                >
                                    <PlusCircle className="w-5 h-5"/>
                                </Button>
                            }
                        />
                    </div>
                    <div className="mt-2 space-y-2">
                        {assignationsPalanquees
                            .filter((ap) => ap.palanquee.id === palanquee.id)
                            .map((assignationPalanquee) => (
                                <div key={assignationPalanquee.plongeur.id}
                                     className="flex justify-between items-center">
                                    <span>{`${assignationPalanquee.plongeur.prenom} ${assignationPalanquee.plongeur.nom}`}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center text-[#2f3570]"
                                        onClick={() =>
                                            removeDiver(assignationPalanquee.plongeur.id.toString())
                                        }
                                    >
                                        <Trash2
                                            className="cursor-pointer h-4 w-4 text-red-500"
                                        />
                                    </Button>
                                </div>
                            ))}
                    </div>
                </div>

                <PalanqueeTimeDetail assignationsPalanquees={assignationsPalanquees} palanquee={palanquee}
                                     updateDebouncedPalanquee={updateDebouncedPalanquee}/>
            </div>
        </Card>
    )
}