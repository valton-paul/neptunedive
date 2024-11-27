'use client'

import React, {useEffect, useState} from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {postCreateLieu, getAllLieux} from "@/api/lieuxApi";
import {useUser} from "@/lib/useUser";
import {createSortie} from "@/api/sortiesApi";
import {Textarea} from "@/components/ui/textarea";

export default function SortieForm() {
    const [lieu, setLieu] = useState('')
    const [date, setDate] = useState('')
    const [heure, setHeure] = useState('')
    const [type, setType] = useState('')
    const [nbParticipant, setNbParticipant] = useState(0)
    const [lieuSuggestion, setLieuSuggestion] = useState([]);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [createLieu, setCreateLieu] = useState(false);

    const [googleMapsLink, setGoogleMapsLink] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [description, setDescription] = useState("");


    const {user} = useUser();

    useEffect(() => {
        getAllLieux().then(lieux => setLieuSuggestion(lieux));
    }, []);

    const handleChangeLieu = ((e) => {
        const lieuRenseigner = e.target.value;

        const matchingLieu = lieuSuggestion.some(lieu => lieu.nomLieu.trim() === lieuRenseigner.trim());
        setLieu(lieuRenseigner);
        if (matchingLieu) {
            setCreateLieu(false);
        } else setCreateLieu(true);
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let leLieu = '';
        if(createLieu){
            const formData = new FormData();

            formData.append("nomLieu", lieu)
            formData.append("lienMaps", googleMapsLink);
            formData.append("description", description);

            if (photo) {
                formData.append("photo", photo);
            }

            const lieuResponse = await postCreateLieu(formData);

            leLieu = lieuResponse.id;
        }

        const payloadSortie = {
            "type": type,
            "dateSortie": date,
            "directeurPlongee": user.id,
            "securiteSurface": user.id,
            "idLieu": leLieu,
            "heureSortie": heure,
            "nbMaxInscription": Number(nbParticipant)
        }
        await createSortie(payloadSortie);
    }


    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Création d&#39;une sortie</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className={"space-y-2 relative"}>
                        <Label>Lieu de la sortie</Label>
                        <div className={"flex flex-row space-x-2"}>
                            <Input
                                id={"lieu"}
                                type={"text"}
                                onChange={handleChangeLieu}
                                onFocus={() => setShowSuggestion(true)}
                                onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
                                required={true}
                            />
                        </div>
                        {showSuggestion && (
                            <ul className="font-black absolute z-10 w-full bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-y-auto mt-1">
                                {lieuSuggestion.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className={"w-full p-2 hover:bg-gray-100 cursor-pointer"}
                                        onClick={() => {
                                            setLieu(suggestion.id);
                                            setShowSuggestion(false);
                                            setCreateLieu(false);
                                            const input = document.getElementById('lieu');
                                            input.value = suggestion.nomLieu;
                                        }}
                                    >
                                        {suggestion.nomLieu}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {createLieu && (
                            <div id={"creationLieu"}>
                                <div className={"space-y-2"}>
                                    <Label className={"italic"}>Lien google maps / adresse de la sortie</Label>
                                    <Input
                                        id={"gooleMapsLink"}
                                        type={"text"}
                                        onChange={(e) => setGoogleMapsLink(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className={"space-y-2"}>
                                    <Label className={"italic"}>Photo de profil du lieu (Optionnel)</Label>
                                    <Input
                                        id={"pp"}
                                        type={"file"}
                                        onChange={(e) => {
                                            setPhoto(e.target.files[0])
                                        }}
                                    />
                                </div>
                                <div className={"space-y-2"}>
                                    <Label className={"italic"}>Description du lieu (Optionnel)</Label>
                                    <Textarea
                                        id={"description"}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={"space-y-2"}>
                        <Label>Type de sortie</Label>
                        <Input
                            id={"type"}
                            type={"text"}
                            onChange={(e) => setType(e.target.value)}
                            required={true}
                            placeholder={"Mer, piscine, fosse ..."}
                        />
                    </div>
                    <div className={"space-y-2"}>
                        <Label>Date de sortie</Label>
                        <Input
                            id={"date"}
                            type={"date"}
                            onChange={(e) => setDate(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className={"space-y-2"}>
                        <Label>Heure de la sortie</Label>
                        <Input
                            id={"time"}
                            type={"time"}
                            onChange={(e) => setHeure(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className={"space-y-2"}>
                        <Label>Nombre de participant maximum</Label>
                        <Input
                            id={"nbParticipant"}
                            type={"number"}
                            min={"1"}
                            onChange={(e) => setNbParticipant(e.target.value)}
                            required={true}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full bg-[#2f3570]">Créer sortie</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

