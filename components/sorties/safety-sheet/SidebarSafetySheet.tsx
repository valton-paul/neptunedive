import React from "react";
import {DroppableArea} from "./DroppableArea";
import {DraggableDiver} from "./DraggableDiver";

export function SidebarSafetySheet({ divers, onAddComment }) {
    return (
        <div className="w-64 bg-white p-4 shadow-md ">
            <h2 className="font-semibold mb-4">Moniteurs</h2>
            <DroppableArea id="sidebar-monitor">
                {divers.filter(diver => diver.isMoniteur).map(diver => (
                    <DraggableDiver key={diver.id} diver={diver} onAddComment={onAddComment} />
                ))}
            </DroppableArea>

            <h2 className="font-semibold mt-6 mb-4">Plongeurs</h2>
            <DroppableArea id="sidebar-divers">
                {divers.filter(diver => !diver.isMoniteur).map(diver => (
                    <DraggableDiver key={diver.id} diver={diver} onAddComment={onAddComment} isInSidebar={true}/>
                ))}
            </DroppableArea>
        </div>
    );
}
