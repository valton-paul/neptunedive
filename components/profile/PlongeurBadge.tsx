import React from "react";
import { GraduationCap } from "lucide-react";
import { Plongeur } from "@/types/Plongeur"; // Assurez-vous que ce type est défini.

interface PlongeurBadgeProps {
    plongeur: Plongeur;
}

const PlongeurBadge: React.FC<PlongeurBadgeProps> = ({ plongeur }) => {
    return (
        <div className="flex gap-2 flex-wrap ">
            <div className="flex mt-1 divide-x gap-1 border-white px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full">
                <span>PA{plongeur.niveauPlongeeAutonome}</span>
                <span className="ps-1">PE{plongeur.niveauPlongeeEncadre}</span>
                {plongeur.isMoniteur && plongeur.niveauMoniteur && (
                    <span className="ps-1">{plongeur.niveauMoniteur}</span>
                )}
            </div>
            {plongeur.formation && (
                <GraduationCap className="mt-1 !h-6 !w-6 bg-[#4a5180] text-white p-1 rounded-full me-1" />
            )}
        </div>
    );
};

export default PlongeurBadge;
