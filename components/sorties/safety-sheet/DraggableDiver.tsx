import React, { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS, Transform } from "@dnd-kit/utilities";
import { MessageSquarePlus } from "lucide-react";

export function DraggableDiver({ diver, onAddComment, isInSidebar = false }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: diver.id });
    const [isHovered, setIsHovered] = useState(false);

    let newT: Transform = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
    if (transform) {
        // Intégration du décalage de scroll dans le calcul des positions
        newT = {
            ...transform,
            x: transform.x + window.scrollX, // Ajoute le scroll horizontal
            y: transform.y + window.scrollY, // Ajoute le scroll vertical
            scaleX: 1,
            scaleY: 1
        };
    }

    useEffect(() => setIsHovered(isDragging), [isDragging]);

    return (
        <div className="bg-gray-50 rounded border items-center relative">
            <div
                ref={setNodeRef}
                style={{ transform: CSS.Transform.toString(newT) }}
                {...attributes}
                {...listeners}
                className="p-2 bg-gray-50 rounded cursor-grab z-5 relative"
            >
                <span>{diver.nom} {diver.prenom}</span>
            </div>
            {!diver.isMoniteur && !isInSidebar ? (
                <MessageSquarePlus
                    className={`cursor-pointer absolute right-0 me-2 ${isHovered ? "hidden" : ""}`}
                    style={{ zIndex: 11, bottom: "7px" }}
                    onClick={() => onAddComment(true, diver)}
                />
            ) : null}
        </div>
    );
}
