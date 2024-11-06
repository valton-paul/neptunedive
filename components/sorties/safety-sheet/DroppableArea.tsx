import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function DroppableArea({ id, children }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="min-h-[50px] p-2 border rounded bg-gray-100">
            {children}
        </div>
    );
}
