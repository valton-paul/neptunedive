import React from "react";
import {Palanquee} from "@/types/Palanquee";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {maxDepth} from "@/lib/utilsSafetySheet";
import {InputField} from "@/components/sorties/safety-sheet/InputField";

// 1) Les deux fonctions d’utilitaires :
function timeDBToMinutes(dbTime?: string | null): number {
    if (!dbTime) return 0;
    const time = dbTime.split("T")[1];
    const parts = time.split(":");
    if (parts.length < 2) return 0;

    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    return hours * 60 + minutes;
}

function minutesToTimeDB(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

interface PalanqueeTimeDetailProps {
    palanquee: Palanquee;
    assignationsPalanquees: AssignationPalanquee[];
    updateDebouncedPalanquee: (palanquee: Palanquee) => void;
}

const PalanqueeTimeDetail: React.FC<PalanqueeTimeDetailProps> = ({
                                                                     palanquee,
                                                                     assignationsPalanquees,
                                                                     updateDebouncedPalanquee,
                                                                 }) => {
    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Durations Section */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Durées (en minutes)</h3>
                <div className="grid grid-cols-2 gap-4">

                    {/* Durée Prévue */}
                    <InputField
                        label="Prévue"
                        // On convertit la valeur BD en minutes pour l'affichage
                        value={timeDBToMinutes(palanquee.dureePrevue)}
                        type="number"
                        step={1}
                        min={0}
                        max={23*60 + 59}
                        onChange={(val) => {
                            const minutesVal = parseInt(val, 10);
                            if (minutesVal < 0 || minutesVal > 23*60 + 59) return;
                            // On repasse en format BD avant d'envoyer au backend
                            updateDebouncedPalanquee({
                                ...palanquee,
                                encadrant: palanquee.encadrant?.id,
                                dureePrevue: minutesToTimeDB(minutesVal),
                                sortie: palanquee.sortie.id,
                            });
                        }}
                    />

                    {/* Durée Réalisée */}
                    <InputField
                        label="Réalisée"
                        value={timeDBToMinutes(palanquee.dureeRealisee)}
                        type="number"
                        step={1}
                        min={0}
                        max={23*60 + 59}
                        onChange={(val) => {
                            const minutesVal = parseInt(val, 10);
                            if (minutesVal < 0 || minutesVal > 23*60 + 59) return;
                            updateDebouncedPalanquee({
                                ...palanquee,
                                encadrant: palanquee.encadrant?.id,
                                dureeRealisee: minutesToTimeDB(minutesVal),
                                sortie: palanquee.sortie.id,
                            });
                        }}
                    />
                </div>
            </div>

            {/* Depths Section */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Profondeurs</h3>
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Prévue"
                        value={palanquee.profondeurPrevue}
                        type="number"
                        max={maxDepth(palanquee, assignationsPalanquees)}
                        onChange={(val) =>
                            updateDebouncedPalanquee({
                                ...palanquee,
                                encadrant: palanquee.encadrant?.id,
                                profondeurPrevue: parseInt(val, 10),
                                sortie: palanquee.sortie.id,
                            })
                        }
                    />
                    <InputField
                        label="Réalisée"
                        value={palanquee.profondeurRealisee}
                        type="number"
                        max={maxDepth(palanquee, assignationsPalanquees)}
                        onChange={(val) =>
                            updateDebouncedPalanquee({
                                ...palanquee,
                                encadrant: palanquee.encadrant?.id,
                                profondeurRealisee: parseInt(val, 10),
                                sortie: palanquee.sortie.id,
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default PalanqueeTimeDetail;
