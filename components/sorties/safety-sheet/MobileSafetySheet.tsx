import React, {RefObject} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Palanquee} from "@/types/Palanquee";
import {Plongeur} from "@/types/Plongeur";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {PalanqueeMobileCard} from "@/components/sorties/safety-sheet/PalanqueeMobile";
import {calculateEquipment} from "@/lib/utilsSafetySheet";

interface SafetySheetContentProps {
    palanquees: Palanquee[];
    assignationsPalanquees: AssignationPalanquee[];
    divers: Plongeur[];
    idSortie: string;
    sliderRef: RefObject<HTMLDivElement>;
    updateDebouncedPalanquee: (palanquee: Palanquee) => void;
    delPalanquee: (id: string) => void;
    addPalanquee: (palanquee: Palanquee) => void;
    onAddDiver: ({idPlongeur, idPalanquee}: { idPlongeur: string, idPalanquee: string }) => void;
    onRemoveDiver: ({idPlongeur, idPalanquee}: { idPlongeur: string, idPalanquee: string }) => void;
    setMoniteur: (palanquee: Palanquee, idPlongeur: string) => void;
    onRemoveMoniteur: (palanquee: Palanquee) => void;
    handleScroll: (direction: 'left' | 'right') => void;

}

const SafetySheetContent: React.FC<SafetySheetContentProps> = ({
                                                                   palanquees,
                                                                   assignationsPalanquees,
                                                                   divers,
                                                                   idSortie,
                                                                   sliderRef,
                                                                   updateDebouncedPalanquee,
                                                                   delPalanquee,
                                                                   addPalanquee,
                                                                   onAddDiver,
                                                                   onRemoveDiver,
                                                                   setMoniteur,
                                                                   onRemoveMoniteur,
                                                                   handleScroll
                                                               }) => {
    const equipment = calculateEquipment(assignationsPalanquees);
    return (
        <>
            <div className="flex flex-col bg-gray-100 rounded p-4 max-w-screen overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[#2f3570] truncate">
                        Fiche de sécurité
                    </h2>
                    <Button
                        onClick={() => addPalanquee({sortie: parseInt(idSortie)} as Palanquee)}
                        className="bg-[#2f3570] hover:bg-[#43497E]"
                    >
                        <Plus className="w-4 h-4"/>
                    </Button>
                </div>

                <div className="relative mt-2">
                    <details className="bg-white shadow-md rounded-lg p-4">
                        <summary className="text-lg font-semibold cursor-pointer text-center text-[#2f3570]">
                            🧳 Voir matériel à apporter
                        </summary>
                        <ul className="mt-2 space-y-2">
                            {Object.entries(equipment.stabs).map(([size, count]) =>
                                count > 0 ? (
                                    <li key={`stab-${size}`} className="text-sm text-gray-700">
                                        {count} stab(s) taille {size}
                                    </li>
                                ) : null
                            )}
                            {Object.entries(equipment.palmes).map(([size, count]) =>
                                count > 0 ? (
                                    <li key={`palmes-${size}`} className="text-sm text-gray-700">
                                        {count} paire(s) de palmes taille {size}
                                    </li>
                                ) : null
                            )}
                            {equipment.masques > 0 && (
                                <li className="text-sm text-gray-700">{equipment.masques} masque(s) de plongée</li>
                            )}
                            {Object.entries(equipment.combinaisons).map(([size, count]) =>
                                count > 0 ? (
                                    <li key={`combinaison-${size}`} className="text-sm text-gray-700">
                                        {count} combinaison(s) taille {size}
                                    </li>
                                ) : null
                            )}
                        </ul>
                    </details>
                </div>

                <div className="relative flex flex-1 items-center justify-center max-w-full">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory scrollbar-hide w-full max-w-full"
                    >
                        {palanquees.map((palanquee) => (
                            <div
                                key={palanquee.id}
                                className="snap-center flex-shrink-0 w-full max-w-full"
                            >
                                <PalanqueeMobileCard
                                    indexPalanquee={palanquees.indexOf(palanquee)}
                                    nombrePalanquees={palanquees.length}
                                    palanquee={palanquee}
                                    assignationsPalanquees={assignationsPalanquees}
                                    updateDebouncedPalanquee={updateDebouncedPalanquee}
                                    onDeletePalanquee={delPalanquee}
                                    divers={divers}
                                    onRemoveDiver={onRemoveDiver}
                                    onAddDiver={onAddDiver}
                                    setMoniteur={setMoniteur}
                                    onRemoveMoniteur={onRemoveMoniteur}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {palanquees.length > 1 && (
                    <div className="flex justify-center space-x-4 mt-4">
                        <Button
                            onClick={() => handleScroll("left")}
                            className="bg-[#2f3570] hover:bg-[#43497E]"
                        >
                            &lt;
                        </Button>
                        <Button
                            onClick={() => handleScroll("right")}
                            className="bg-[#2f3570] hover:bg-[#43497E]"
                        >
                            &gt;
                        </Button>
                    </div>
                )}
            </div>

        </>

    );
};

export default SafetySheetContent;
