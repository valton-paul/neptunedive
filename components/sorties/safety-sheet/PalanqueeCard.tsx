import React from "react";
import { Card } from "@/components/ui/card";
import {DroppableArea} from "./DroppableArea";
import {DraggableDiver} from "./DraggableDiver";
import {InputField} from "./InputField";
import {Trash2} from "lucide-react";
import {maxDepth} from "@/lib/utilsSafetySheet";
import {parseTime} from "@/lib/utils";

export function PalanqueeCard({ palanquee, assignationsPalanquees, updateDebouncedPalanquee, onAddComment, onDeletePalanquee }) {
    return (
        <Card className="p-4 relative">
            <div className="space-y-4 ">
                <Trash2 className="absolute top-2 right-2 cursor-pointer h-4 w-4" onClick={() => onDeletePalanquee(palanquee.id)} />
                <div className="bg-gray-50 p-3 rounded">
                    <label>Encadrant</label>
                    <DroppableArea id={`supervisor-${palanquee.id}`}>
                        {palanquee.encadrant ? <DraggableDiver diver={palanquee.encadrant} key={palanquee.encadrant.id} onAddComment={onAddComment} /> : null}
                    </DroppableArea>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                    <label>Plongeurs</label>
                    <DroppableArea id={`divers-${palanquee.id}`}>
                        {assignationsPalanquees.filter(ap => ap.palanquee.id === palanquee.id)
                            .map(assignationsPalanquee => (
                                <DraggableDiver key={assignationsPalanquee.plongeur.id} diver={assignationsPalanquee.plongeur} onAddComment={onAddComment} />
                            ))}
                    </DroppableArea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Durée prévu" value={palanquee.dureePrevue}
                                type="time"
                                step={1}
                                onChange={(val) => updateDebouncedPalanquee({ ...palanquee, encadrant: palanquee.encadrant?.id, dureePrevue: parseTime(val), sortie: palanquee.sortie.id })} />
                    <InputField label="Durée réalisé" value={palanquee.dureeRealisee}
                                type="time"
                                step={1}
                                onChange={(val) => updateDebouncedPalanquee({ ...palanquee, encadrant: palanquee.encadrant?.id, dureeRealisee: parseTime(val), sortie: palanquee.sortie.id })} />
                    <InputField label={"Profondeur prévu"} value={palanquee.profondeurPrevue}
                                type="number"
                                max={maxDepth(palanquee, assignationsPalanquees)}
                                onChange={(val) => updateDebouncedPalanquee({ ...palanquee, encadrant: palanquee.encadrant?.id, profondeurPrevue: parseInt(val), sortie: palanquee.sortie.id })} />
                    <InputField label={"Profondeur réalisé"} value={palanquee.profondeurRealisee}
                                type="number"
                                max={maxDepth(palanquee, assignationsPalanquees)}
                                onChange={(val) => updateDebouncedPalanquee({ ...palanquee, encadrant: palanquee.encadrant?.id , profondeurRealisee: parseInt(val), sortie: palanquee.sortie.id })} />
                </div>
            </div>
        </Card>
    );
}

