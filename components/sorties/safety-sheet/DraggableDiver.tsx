import React, { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS, Transform } from "@dnd-kit/utilities";
import { MessageSquarePlus } from "lucide-react";

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
            <div className="bg-gray-50 rounded border items-center relative">
                <div
                    ref={setNodeRef}
                    style={{transform: CSS.Transform.toString(newT)}}
                    {...attributes}
                    {...listeners}
                    className="p-2 bg-gray-50 rounded cursor-grab flex flex-wrap items-center z-5 relative"
                >
                    <span>{diver.nom} {diver.prenom}</span>
                    <div className={"flex gap-2 2xl:ms-2 flex-wrap xl:flex-nowrap"}>
                        <div
                            className={"flex divide-x gap-1 border-white  px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full"}>
                        <span>
                            PA{diver.niveauPlongeeAutonome}
                        </span>
                            <span className={'ps-1'}>
                            PE{diver.niveauPlongeeEncadre}
                        </span>
                        </div>
                        {diver.formation && (
                            <span
                                className=" px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full">En formation</span>
                        )}
                    </div>
                </div>

                {!diver.isMoniteur && !isInSidebar ? (
                    <MessageSquarePlus
                        className={`cursor-pointer absolute top-2 right-0 me-2 `}
                        style={{zIndex: 11, bottom: "7px"}}
                        onClick={() => onAddComment(true, diver)}
                    />
                ) : null}
            </div>
        ) : (
            <div className="p-[9px] bg-gray-50 opacity-[.65] rounded cursor-grab z-5 relative p-2 flex flex-wrap items-center">
                <span>{diver.nom} {diver.prenom}</span>
                <div className={"flex gap-2 2xl:ms-2 flex-wrap xl:flex-nowrap"}>
                    <div
                        className={"flex divide-x gap-1 border-white  px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full"}>
                        <span>
                            PA{diver.niveauPlongeeAutonome}
                        </span>
                        <span className={'ps-1'}>
                            PE{diver.niveauPlongeeEncadre}
                        </span>
                    </div>
                    {diver.formation && (
                        <span
                            className=" px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full">En formation</span>
                    )}
                </div>
                {!diver.isMoniteur && !isInSidebar ? (
                    <MessageSquarePlus
                        className={`cursor-pointer absolute right-0 top-2 me-2 `}
                        style={{zIndex: 11, bottom: "7px"}}
                        onClick={() => onAddComment(true, diver)}
                    />
                ) : null}
            </div>
        )}
        </>
    );
}
