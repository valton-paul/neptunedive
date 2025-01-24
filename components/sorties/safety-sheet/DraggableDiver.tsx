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
            <div className="bg-gray-50 rounded border flex flex-col xl:flex-row justify-between xl:items-center relative">
                <div
                    ref={setNodeRef}
                    style={{transform: CSS.Transform.toString(newT)}}
                    {...attributes}
                    {...listeners}
                    className={`p-2 bg-gray-50 rounded cursor-grab flex flex-wrap justify-between ${!diver.isMoniteur && !isInSidebar ? "w-10/12" : "w-full"} xl:gap-2 items-center z-5 relative`}
                >
                    <span className={"me-1"}>{diver.nom} {diver.prenom}</span>
                    <PlongeurBadge plongeur={diver} />
                </div>
                    {!diver.isMoniteur && !isInSidebar ? (
                        <MessageSquarePlus
                            className={`cursor-pointer xl:me-2 m-2 2xl:order-last absolute right-0 top-0.5`}
                            style={{zIndex: 11, bottom: "7px"}}
                            onClick={() => onAddComment(true, diver)}
                        />
                    ) : null}
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
