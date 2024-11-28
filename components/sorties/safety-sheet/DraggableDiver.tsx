import React, { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS, Transform } from "@dnd-kit/utilities";
import { MessageSquarePlus } from "lucide-react";
import PlongeurBadge from "@/components/profile/PlongeurBadge";

export function DraggableDiver({ diver, onAddComment, isInSidebar = false }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: diver.id });
    const [isHovered, setIsHovered] = useState(false);

    let newT
    if (transform) {
        // Intégration du décalage de scroll dans le calcul des positions
        newT = {
            ...transform,
            x: transform.x ,
            y: transform.y,
            scaleX: 1,
            scaleY: 1
        };
    }

    useEffect(() => setIsHovered(isDragging), [isDragging]);

    return (
        <>
        {!isDragging ? (
            <div className="bg-gray-50 rounded border flex flex-wrap justify-between items-center relative">
                <div
                    ref={setNodeRef}
                    style={{transform: CSS.Transform.toString(newT)}}
                    {...attributes}
                    {...listeners}
                    className="p-2 bg-gray-50 rounded cursor-grab flex flex-wrap justify-between w-full items-center z-5 relative"
                >
                    <span className={"me-1"}>{diver.nom} {diver.prenom}</span>

                {!diver.isMoniteur && !isInSidebar ? (
                    <MessageSquarePlus
                        className={`cursor-pointer me-2 2xl:order-last`}
                        style={{zIndex: 11, bottom: "7px"}}
                        onClick={() => onAddComment(true, diver)}
                    />
                ) : null}
                <PlongeurBadge plongeur={diver} />
                </div>
            </div>
        ) : (
            <div
                className="p-2 bg-gray-50 opacity-[.65] rounded cursor-grab flex flex-wrap justify-between w-full items-center z-5 relative"
            >
                <span className={"me-1"}>{diver.nom} {diver.prenom}</span>

                {!diver.isMoniteur && !isInSidebar ? (
                    <MessageSquarePlus
                        className={`cursor-pointer me-2 2xl:order-last`}
                        style={{zIndex: 11, bottom: "7px"}}
                        onClick={() => onAddComment(true, diver)}
                    />
                ) : null}
                <PlongeurBadge plongeur={diver}/>
            </div>
        )}
        </>
    );
}
