'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getAllLieux, postCreateLieu} from "@/api/lieuxApi";
import LieuCard from "@/components/lieux/lieuCard";
import React, {useState} from "react";

export default function LieuManagement() {
    const [nomLieu, setNomLieu] = useState('')
    const [lienMaps, setLienMaps] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState<File | null>(null);

    const createLieuAndResetForm = async (payload) => {
        await postCreateLieu(payload)
        setNomLieu('');
        setLienMaps('');
        setDescription('');
        setPhoto(null);
    }

    const {data: lieux} = useCustomQuery(
        ['lieux'],
        getAllLieux
    )

    const {mutate: createLieuMutation} = useCustomMutation(
        async (payload) => createLieuAndResetForm(payload),
        [['lieux']]
    )

    const {mutate: createLieuMutation} = useCustomMutation(
        async (payload) => (payload),
        [['lieux']]
    )


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestion des lieux</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <Input
                    name="nomLieu"
                    placeholder="Nom du lieu"
                    onClick={}
                    required
                />
                <Textarea
                    name="description"
                    placeholder="Description"
                />
                <Input
                    name="lienMaps"
                    placeholder="Lien Google Maps"
                    type="text"
                    required
                />
                <Input
                    id={"pp"}
                    type={"file"}
                    onChange={(e) => {
                        setPhoto(e.target.files[0])
                    }}
                />
                <Button type="submit" className={"bg-[#2f3570]"}>
                    Créer un lieu
                </Button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lieux && lieux.map(lieu => (
                    <LieuCard
                        key={lieu.id}
                        lieu={lieu}
                        editLieu={undefined}
                        deleteLieu={undefined}
                    />
                ))}
            </div>
        </div>
    )
}