'use client'

import {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {createSortie} from "@/api/sortiesApi";
import {useUser} from "@/lib/useUser";
import {Creneaux} from "@/types/Creneaux";
import React from 'react'
import {
    Select,
    SelectContent,
    SelectIcon,
    SelectItem, SelectItemText,
    SelectTrigger,
    SelectValue,
    SelectViewport
} from "@radix-ui/react-select";

export default function SortieForm() {

    const {user, loading: userLoading} = useUser();

    const [error, setError] = useState(false);

    const [payload, setPayload] = useState({
        type: '',
        dateSortie: '',
        lieu: '',
        creneau: '',
        directeurPlongee: '',
        securiteSurface: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setPayload(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleCreneauSelectChange = (value: Creneaux) => {
        payload.creneau = value
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userLoading && user?.id) {
            payload.directeurPlongee = user.id.toString();
            payload.securiteSurface = user.id.toString();
        }

        console.log(payload)

        try {
            const sortieCreeeAvecSucces = await createSortie(
                payload.type,
                payload.dateSortie,
                payload.lieu,
                payload.creneau,
                payload.directeurPlongee,
                payload.securiteSurface
            );

            if (!sortieCreeeAvecSucces) {
                setError(true);
            }
        } catch (error) {
            console.error("Erreur lors de la création de la sortie :", error);
            setError(true);
        }
    };


    return (
        <Card className="w-full max-w-md mx-auto">
            <h3 className="text-red-800 text-2xl font-bold text-center">{error ? "Champ(s) manquant(s)" : ''}</h3>
            <CardHeader>
                <CardTitle>Créer une Sortie</CardTitle>
                <CardDescription>Remplissez les détails de la sortie</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            name="type"
                            value={payload.type}
                            onChange={handleChange}
                            placeholder="Type de sortie"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dateSortie">Date de Sortie</Label>
                        <Input
                            id="dateSortie"
                            name="dateSortie"
                            type="date"
                            value={payload.dateSortie}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lieu">Lieu</Label>
                        <Input
                            id="lieu"
                            name="lieu"
                            value={payload.lieu}
                            onChange={handleChange}
                            placeholder="Lieu de la sortie"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Créneau</Label>
                        <Select onValueChange={(value) => handleCreneauSelectChange(value)}>
                            <SelectTrigger
                                aria-label="Créneaux"
                                className="
                w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm
                inline-flex items-center justify-between
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                            ">
                                <SelectValue placeholder="Choisir un Créneau"/>
                                <SelectIcon>⌄</SelectIcon>
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg mt-2">
                                <SelectViewport>
                                    <SelectItem value="MATIN" className="hover:bg-gray-100 px-4 py-2">
                                        <SelectItemText>Matin</SelectItemText>
                                    </SelectItem>
                                    <SelectItem value="APRES-MIDI" className="hover:bg-gray-100 px-4 py-2">
                                        <SelectItemText>Après-midi</SelectItemText>
                                    </SelectItem>
                                    <SelectItem value="NUIT" className="hover:bg-gray-100 px-4 py-2">
                                        <SelectItemText>Nuit</SelectItemText>
                                    </SelectItem>
                                </SelectViewport>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full bg-[#2f3570]">Créer la Sortie</Button>
                </form>
            </CardContent>
        </Card>
    )
}