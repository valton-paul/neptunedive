'use client'

import React from "react"
import {Sortie} from "@/types/Sortie"
import {Palanquee} from "@/types/Palanquee"
import {format} from "date-fns"
import {fr} from "date-fns/locale"

interface PrintableSafetySheetProps {
    sortie: Sortie
}

export function PrintableSafetySheetComponent({sortie}: PrintableSafetySheetProps) {

    // On s'assure d'avoir 6 palanquées (2 lignes × 3 colonnes)
    const palanquees = [...Array(6)].map((_, index) =>
        sortie.palanquees?.[index] || createEmptyPalanquee()
    )

    return (
        <div
            className="mx-auto max-w-[1200px] bg-white p-8 shadow-md print:shadow-none border border-gray-200 rounded-md"
        >
            {/* TITRE */}
            <h1 className="text-center text-2xl font-bold mb-6">FICHE DE SÉCURITÉ</h1>

            {/* INFORMATIONS GÉNÉRALES */}
            <div className="grid grid-cols-3 gap-6 mb-8 text-sm">
                {/* Bloc de gauche */}
                <div className="p-4 border border-gray-300 rounded-md space-y-4">
                    <InfoRow label="Nom de l'établissement d'APS :"/>
                    <InfoRow label="Référence (n° de club, RCS...) :"/>
                    <InfoRow label="Bateau :" value={sortie.bateau}/>
                    <InfoRow label="Pilote :"/>
                    <InfoRow label="Directeur de plongée :" value={sortie.directeurPlongee?.nom}/>
                    <InfoRow label="Sécurité de surface :" value={sortie.securiteSurface?.nom}/>
                </div>

                {/* Bloc du milieu (ex: logo) */}
                <div className="p-4 flex items-center justify-center border border-gray-300 rounded-md">
                    {/* Optionnel : Logo au centre */}
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

            {/* TABLE DES PALANQUÉES : 3 COLONNES × 2 LIGNES */}
            <div className="grid grid-cols-3 gap-6">
                {palanquees.map((palanquee, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-md">
                        {/* Tableau de la palanquée */}
                        <table className="w-full table-fixed border-collapse text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-2 h-8 align-top text-left">
                                    NOM
                                </th>
                                <th className="border border-gray-300 px-2 h-8 align-top text-left">
                                    PRÉNOM
                                </th>
                                <th className="border border-gray-300 px-2 h-8 align-top text-left">
                                    APT*
                                </th>
                                <th className="border border-gray-300 px-2 h-8 align-top text-left">
                                    GAZ*
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Titre ENCADRANT* */}
                            <tr className="bg-blue-50 text-blue-800 font-bold">
                                <td colSpan={4} className="border border-gray-300 px-2 h-8 align-top">
                                    ENCADRANT*
                                </td>
                            </tr>
                            {/* Ligne encadrant (Nom / Prénom / APT / GAZ) */}
                            <tr className="bg-blue-50 text-blue-800">
                                <td className="border border-gray-300 px-2 h-8 align-top">
                                    {palanquee?.encadrant?.nom || ""}
                                </td>
                                <td className="border border-gray-300 px-2 h-8 align-top">
                                    {palanquee?.encadrant?.prenom || ""}
                                </td>
                                <td className="border border-gray-300 px-2 h-8 align-top">
                                    {palanquee?.encadrant?.niveauMoniteur || ""}
                                </td>
                                <td className="border border-gray-300 px-2 h-8 align-top"/>
                            </tr>

                            {/* Plongeurs (4 lignes) */}
                            {[...Array(4)].map((_, i) => (
                                <tr key={i}>
                                    <td className="border border-gray-300 px-2 h-8 align-top">
                                        {palanquee?.plongeurAssignes?.[i]?.plongeur?.nom || ""}
                                    </td>
                                    <td className="border border-gray-300 px-2 h-8 align-top">
                                        {palanquee?.plongeurAssignes?.[i]?.plongeur?.prenom || ""}
                                    </td>
                                    <td className="border border-gray-300 px-2 h-8 align-top">
                                        {palanquee?.plongeurAssignes?.[i]?.plongeur?.niveauPlongeeEncadre || ""}
                                    </td>
                                    <td className="border border-gray-300 px-2 h-8 align-top"/>
                                </tr>
                            ))}

                            {/* Paramètres de plongée */}
                            <tr>
                                <td colSpan={4} className="pt-2">
                                    <table className="w-full table-fixed border-collapse text-sm">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="border border-gray-300 px-2 h-8 align-top text-left">
                                                Paramètres
                                            </th>
                                            <th className="border border-gray-300 px-2 h-8 align-top text-left">
                                                Durée
                                            </th>
                                            <th className="border border-gray-300 px-2 h-8 align-top text-left">
                                                Profondeur
                                            </th>
                                            <th className="border border-gray-300 px-2 h-8 align-top text-left">
                                                H. mise à l&#39;eau
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-2 h-8 align-top">
                                                Prévus
                                            </td>
                                            <td className="border border-gray-300 px-2 h-8 align-top">
                                                {formatTime(palanquee?.dureePrevue)}
                                            </td>
                                            <td className="border border-gray-300 px-2 h-8 align-top">
                                                {palanquee?.profondeurPrevue || ""}
                                            </td>
                                            <td className="border border-gray-300 px-2 h-8 align-top"/>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 h-8 align-top">
                                                Réalisés*
                                            </td>
                                            <td className="border border-gray-300 px-2 h-8 align-top">
                                                {formatTime(palanquee?.dureeRealisee)}
                                            </td>
                                            <td className="border border-gray-300 px-2 h-8 align-top">
                                                {palanquee?.profondeurRealisee || ""}
                                            </td>
                                            <td className="border border-gray-300 px-2 h-8 align-top"/>
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
            <div className="mt-6 text-xs text-gray-700">
                <p>* Mentions obligatoires</p>
                <p>APT : Aptitudes (niveau de plongée)</p>
                <p>GAZ : Type de gaz utilisé si différent de l&#39;air</p>
            </div>
        </div>
    )
}

/** Composant utilitaire pour l'affichage d'une étiquette + sa valeur */
function InfoRow({label, value}: { label: string; value?: string }) {
    return (
        <div className="grid grid-cols-[auto,1fr] gap-2 items-center">
            <div className="whitespace-nowrap">{label}</div>
            <div className="border-b border-gray-400 h-5 leading-none">
                {value || ""}
            </div>
        </div>
    )
}


/** Génère une palanquée vide si nécessaire */
function createEmptyPalanquee(): Palanquee {
    return {
        id: '',
        encadrant: null,
        plongeurs: [],
        dureePrevue: null,
        dureeRealisee: null,
        profondeurPrevue: null,
        profondeurRealisee: null,
        sortie: null
    }
}

/** Formate une chaîne de temps (HH:MM:SS) en HH:MM */
function formatTime(time: string | null): string {
    if (!time) return ''
    const match = time.match(/(\d{2}):(\d{2}):/)
    if (!match) return ''
    return `${match[1]}:${match[2]}`
}
