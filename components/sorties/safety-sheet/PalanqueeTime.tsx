import React from "react";
import {Palanquee} from "@/types/Palanquee";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {maxDepth, parseBDTime, parseTime} from "@/lib/utilsSafetySheet";
import {InputField} from "@/components/sorties/safety-sheet/InputField";

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
                <h3 className="text-lg font-semibold">Durées</h3>
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Prévue"
                        value={parseBDTime(palanquee.dureePrevue)}
                        type="time"
                        step={1}
                        onChange={(val) =>
                            updateDebouncedPalanquee({
                                ...palanquee,
                                encadrant: palanquee.encadrant?.id,
                                dureePrevue: parseTime(val),
                                sortie: palanquee.sortie.id,
                            })
                        }
                    />
                    <InputField
                        label="Réalisée"
                        value={parseBDTime(palanquee.dureeRealisee)}
                        type="time"
                        step={1}
                        onChange={(val) =>
                            updateDebouncedPalanquee({
                                ...palanquee,
                                encadrant: palanquee.encadrant?.id,
                                dureeRealisee: parseTime(val),
                                sortie: palanquee.sortie.id,
                            })
                        }
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
                                profondeurPrevue: parseInt(val),
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
                                profondeurRealisee: parseInt(val),
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
