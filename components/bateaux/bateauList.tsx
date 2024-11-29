'use client'

import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {createBateau, deleteBateau, getAllBateaux, updateBateau} from "@/api/bateauxApi";
import {Bateau} from "@/types/Bateau";
import BateauCard from "@/components/bateaux/bateauCard";
export function BateauList() {
    const [bateaux, setBateaux] = useState<Bateau[]>([]);
    const [immatriculation, setImmatriculation] = useState('');
    const [places, setPlaces] = useState(0);

    useEffect(() => {
        getAllBateaux().then((e) => {
            setBateaux(e);
        })
    }, []);

    const handleDelete = (id: number) => {
        setBateaux(bateaux.filter(bateau => bateau.id !== id));
        deleteBateau(id);
    };

    const handleModification = async (payload) => {
        setBateaux(bateaux.filter(bateau => bateau.id !== payload.id));
        await updateBateau(payload);
        getAllBateaux().then((e) => setBateaux(e))
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createBateau({immatriculation: immatriculation, nbPlaces: Number(places)})
            .then(() => {
                getAllBateaux().then((e) => setBateaux(e))
                setImmatriculation("");
                setPlaces(0);
            })
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestion des Bateaux</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Ajouter un nouveau bateau</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="immatriculation" className="block text-sm font-medium text-gray-700">
                                Immatriculation
                            </label>
                            <Input
                                type="text"
                                id="immatriculation"
                                value={immatriculation}
                                onChange={(e) => setImmatriculation(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="places" className="block text-sm font-medium text-gray-700">
                                Nombre de places
                            </label>
                            <Input
                                type="number"
                                id="places"
                                value={places}
                                onChange={(e) => setPlaces(e.target.value)}
                                required
                                min="1"
                                className="mt-1"
                            />
                        </div>
                        <Button type="submit" className={"bg-[#2f3570]"}>Ajouter le bateau</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des Bateaux</CardTitle>
                </CardHeader>
                <CardContent>
                    {bateaux.length === 0 ? (
                        <p className="text-center text-gray-500 my-4">Aucun bateau enregistré pour le moment.</p>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {bateaux.map((bateau) => (
                                <BateauCard
                                    key={bateau.id}
                                    bateau={bateau}
                                    onModify={handleModification}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

