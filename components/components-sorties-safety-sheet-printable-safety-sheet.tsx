"use client";

import React from "react";
import {Sortie} from "@/types/Sortie";
import {Palanquee} from "@/types/Palanquee";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

interface PrintableSafetySheetProps {
    sortie: Sortie;
}

export function PrintableSafetySheetComponent({sortie}: PrintableSafetySheetProps) {
    // Palanquées
    const palanquees = [...Array(6)].map((_, index) =>
        sortie.palanquees?.[index] || createEmptyPalanquee()
    );

    return (
        <div
            className="w-[297mm] min-h-[210mm] bg-white m-auto p-1 text-base leading-normal shadow-md print:shadow-none border border-gray-200 rounded-md">
            <h1 className="text-center text-3xl font-bold mb-2">FICHE DE SÉCURITÉ</h1>

            {/* INFORMATIONS GÉNÉRALES */}
            <div className="grid grid-cols-3 gap-1 mb-2 w-full">
                {/* Bloc de gauche */}
                <div className="p-4 border border-gray-300 rounded-md space-y-4">
                    <InfoRow label="Nom de l'établissement d'APS :"/>
                    <InfoRow label="Référence (n° de club, RCS...) :"/>
                    <InfoRow label="Bateau :" value={sortie.bateau}/>
                    <InfoRow label="Pilote :"/>
                    <InfoRow label="Directeur de plongée :" value={sortie.directeurPlongee?.nom}/>
                    <InfoRow label="Sécurité de surface :" value={sortie.securiteSurface?.nom}/>
                </div>

                {/* Bloc du milieu */}
                <div className="p-4 flex items-center justify-center border border-gray-300 rounded-md">
                    {/* Logo éventuel */}
                </div>

                {/* Bloc de droite */}
                <div className="p-4 border border-gray-300 rounded-md space-y-4">
                    <InfoRow
                        label="Date :"
                        value={
                            sortie.dateSortie
                                ? format(new Date(sortie.dateSortie), "dd/MM/yyyy", {locale: fr})
                                : ""
                        }
                    />
                    <InfoRow label="Matin / A.Midi / Nuit :"/>
                    <InfoRow label="Lieu de plongée :" value={sortie.idLieu?.nomLieu}/>
                    <InfoRow label="Nb plongeurs :"/>
                </div>
            </div>

            {/* PALANQUEES */}
            <div className="grid grid-cols-3 gap-1 w-full">
                {palanquees.map((palanquee, idx) => (
                    <div key={idx} className="p-1 border border-gray-300 rounded-md">
                        <table className="w-full table-fixed border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-xs align-middle">
                            <tr>
                                <th className="border border-gray-300 px-2 py-1 text-left">NOM</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">PRÉNOM</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">APT*</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">GAZ*</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* ENCADRANT */}
                            <tr className="bg-blue-50 text-blue-800 font-bold text-xs align-middle">
                                <td colSpan={4} className="border border-gray-300 px-2 py-1">
                                    ENCADRANT*
                                </td>
                            </tr>
                            <tr className="bg-blue-50 text-blue-800 h-[32px]">
                                <td className="border border-gray-300 px-2 py-1">
                                    {palanquee?.encadrant?.nom || ""}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {palanquee?.encadrant?.prenom || ""}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {palanquee?.encadrant?.niveauMoniteur || ""}
                                </td>
                                <td className="border border-gray-300 px-2 py-1"/>
                            </tr>

                            {/* PLONGEURS */}
                            {[...Array(4)].map((_, i) => (
                                <tr key={i} className={" h-[32px]"}>
                                    <td className="border border-gray-300 px-2 py-1">
                                        {palanquee?.plongeurAssignes?.[i]?.plongeur?.nom || ""}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                        {palanquee?.plongeurAssignes?.[i]?.plongeur?.prenom || ""}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                        {palanquee?.plongeurAssignes?.[i]?.plongeur?.niveauPlongeeEncadre || ""}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1"/>
                                </tr>
                            ))}

                            {/* PARAMETRES DE PLONGEE */}
                            <tr>
                                <td colSpan={4} className="pt-2">
                                    <table className="w-full table-fixed border-collapse">
                                        <thead className="bg-gray-50">
                                        <tr className={"text-xs align-middle"}>
                                            <th className="border border-gray-300 px-2 py-1 text-left">Paramètres</th>
                                            <th className="border border-gray-300 px-2 py-1 text-left">Durée</th>
                                            <th className="border border-gray-300 px-2 py-1 text-left">
                                                Profondeur
                                            </th>
                                            <th className="border border-gray-300 px-2 py-1 text-left">
                                                H. mise à l&#39;eau
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-2 py-1">Prévus</td>
                                            <td className="border border-gray-300 px-2 py-1">
                                                {formatTime(palanquee?.dureePrevue)}
                                            </td>
                                            <td className="border border-gray-300 px-2 py-1">
                                                {palanquee?.profondeurPrevue || ""}
                                            </td>
                                            <td className="border border-gray-300 px-2 py-1"/>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 py-1">Réalisés*</td>
                                            <td className="border border-gray-300 px-2 py-1">
                                                {formatTime(palanquee?.dureeRealisee)}
                                            </td>
                                            <td className="border border-gray-300 px-2 py-1">
                                                {palanquee?.profondeurRealisee || ""}
                                            </td>
                                            <td className="border border-gray-300 px-2 py-1"/>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {/* PIED DE PAGE */}
            <div className="mt-1 text-sm text-gray-700">
                <p>* Mentions obligatoires</p>
                <p>APT : Aptitudes (niveau de plongée)</p>
                <p>GAZ : Type de gaz utilisé si différent de l&#39;air</p>
            </div>
        </div>
    );
}

/** Composant utilitaire pour l'affichage d'une étiquette + sa valeur */
function InfoRow({label, value}: { label: string; value?: string }) {
    return (
        <div className="grid grid-cols-[auto,1fr] gap-2 items-center text-lg">
            <div className="whitespace-nowrap">{label}</div>
            <div className="border-b border-gray-400 h-5 leading-none">{value || ""}</div>
        </div>
    );
}

/** Génère une palanquée vide si nécessaire */
function createEmptyPalanquee(): Palanquee {
    return {
        id: "",
        encadrant: null,
        plongeurs: [],
        dureePrevue: null,
        dureeRealisee: null,
        profondeurPrevue: null,
        profondeurRealisee: null,
        sortie: null,
    };
}

/** Formate une chaîne de temps (HH:MM:SS) en HH:MM */
function formatTime(time: string | null): string {
    if (!time) return "";
    const match = time.match(/(\d{2}):(\d{2}):/);
    if (!match) return "";
    return `${match[1]}:${match[2]}`;
}
