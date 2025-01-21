import React from "react";
import {DroppableArea} from "./DroppableArea";
import {DraggableDiver} from "./DraggableDiver";

export function SidebarSafetySheet({divers, onAddComment, equipment}) {
    return (
        <div className="w-64 bg-white p-4 shadow-md flex flex-col h-85">
            {/* Section supérieure : contenu principal */}
            <div className="flex-grow">
                <h2 className="font-semibold mb-4">Moniteurs</h2>
                <DroppableArea id="sidebar-monitor">
                    {divers.filter(diver => diver.isMoniteur).map(diver => (
                        <DraggableDiver key={diver.id} diver={diver} onAddComment={onAddComment}/>
                    ))}
                </DroppableArea>

                <h2 className="font-semibold mt-6 mb-4">Plongeurs</h2>
                <DroppableArea id="sidebar-divers">
                    {divers.filter(diver => !diver.isMoniteur).map(diver => (
                        <DraggableDiver key={diver.id} diver={diver} onAddComment={onAddComment} isInSidebar={true}/>
                    ))}
                </DroppableArea>
            </div>

            <div className="flex-grow">
                <h2 className="font-semibold mb-4">Matériel à apporter</h2>
                <ul>
                    {Object.entries(equipment.stabs).map(([size, count]) =>
                        count > 0 ? (
                            <li key={`stab-${size}`} className="text-sm">
                                {count} stab(s) taille {size}
                            </li>
                        ) : null
                    )}
                    {Object.entries(equipment.palmes).map(([size, count]) =>
                        count > 0 ? (
                            <li key={`palmes-${size}`} className="text-sm">
                                {count} paire(s) de palmes taille {size}
                            </li>
                        ) : null
                    )}
                    {equipment.masques > 0 && (
                        <li className="text-sm">{equipment.masques} masque(s) de plongée</li>
                    )}
                    {Object.entries(equipment.combinaisons).map(([size, count]) =>
                        count > 0 ? (
                            <li key={`combinaison-${size}`} className="text-sm">
                                {count} combinaison(s) taille {size}
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
        </div>
    );
}
