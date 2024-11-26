import React from "react";
import {Card} from "@/components/ui/card";
import {DroppableArea} from "./DroppableArea";
import {DraggableDiver} from "./DraggableDiver";
import {Trash2} from "lucide-react";
import PalanqueeTimeDetail from "@/components/sorties/safety-sheet/PalanqueeTime";

export function PalanqueeCard({
                                  palanquee,
                                  assignationsPalanquees,
                                  updateDebouncedPalanquee,
                                  onAddComment,
                                  onDeletePalanquee
                              }) {
    return (
        <Card className="p-4 relative">
            <div className="space-y-4 ">
                <Trash2 className="absolute top-2 right-2 cursor-pointer h-4 w-4"
                        onClick={() => onDeletePalanquee(palanquee.id)}/>
                <div className="bg-gray-50 p-3 rounded">
                    <label>Encadrant</label>
                    <DroppableArea id={`supervisor-${palanquee.id}`}>
                        {palanquee.encadrant ? <DraggableDiver diver={palanquee.encadrant} key={palanquee.encadrant.id}
                                                               onAddComment={onAddComment}/> : null}
                    </DroppableArea>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                    <label>Plongeurs</label>
                    <DroppableArea id={`divers-${palanquee.id}`}>
                        {assignationsPalanquees.filter(ap => ap.palanquee.id === palanquee.id)
                            .map(assignationsPalanquee => (
                                <DraggableDiver key={assignationsPalanquee.plongeur.id}
                                                diver={assignationsPalanquee.plongeur} onAddComment={onAddComment}/>
                            ))}
                    </DroppableArea>
                </div>

                <PalanqueeTimeDetail palanquee={palanquee} assignationsPalanquees={assignationsPalanquees}
                                     updateDebouncedPalanquee={updateDebouncedPalanquee}/>
            </div>
        </Card>
    );
}

