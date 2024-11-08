'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';
import { postCreateDemande } from '@/api/inscriptionsApi';
import { InscriptionPlongeur } from '@/types/InscriptionPlongeur';
import { NiveauMoniteur } from '@/types/NiveauMoniteur';
import { NiveauPlongeeAutonome } from '@/types/NiveauPlongeeAutonome';
import { NiveauPlongeeEncadre } from '@/types/NiveauPlongeeEncadre';

export function InscriptionPlongeurForm() {
    const [inscriptionData, setInscriptionData] = useState<InscriptionPlongeur>({
        email: '',
        nom: '',
        prenom: '',
        formation: false,
        niveauPlongeeAutonome: null,
        niveauPlongeeEncadre: null,
        niveauMoniteur: 'NONE',
        validee: false,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setInscriptionData((prevState) => ({
            ...prevState,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value !== ''
                        ? isNaN(Number(value))
                            ? value
                            : Number(value)
                        : null,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postCreateDemande(inscriptionData);
            alert("Demande d'inscription transmise !");
            setInscriptionData({
                email: '',
                nom: '',
                prenom: '',
                formation: false,
                niveauPlongeeAutonome: null,
                niveauPlongeeEncadre: null,
                niveauMoniteur: 'NONE',
                validee: false,
            });
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire', error);
        }
    };

    // Options pour les sélecteurs
    const niveauPlongeeAutonomeOptions = [20, 40, 60];
    const niveauPlongeeEncadreOptions = [12, 20, 40, 60];
    const niveauMoniteurOptions = ['NONE', 'E1', 'E2', 'E3', 'E4'];

    return (
        <div>
            <h2>Inscription Plongeur</h2>
            <p>Veuillez remplir le formulaire ci-dessous.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={inscriptionData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                        id="nom"
                        name="nom"
                        type="text"
                        value={inscriptionData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                        id="prenom"
                        name="prenom"
                        type="text"
                        value={inscriptionData.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Checkbox
                        id="formation"
                        name="formation"
                        checked={inscriptionData.formation}
                        onChange={handleChange}
                        label="Formation"
                    />
                </div>
                <div>
                    <Select
                        id="niveauPlongeeAutonome"
                        name="niveauPlongeeAutonome"
                        value={inscriptionData.niveauPlongeeAutonome ?? ''}
                        onChange={handleChange}
                        label="Niveau Plongée Autonome"
                        options={[
                            ...niveauPlongeeAutonomeOptions.map((value) => ({
                                value: value.toString(),
                                label: value.toString(),
                            })),
                        ]}
                    />
                </div>
                <div>
                    <Select
                        id="niveauPlongeeEncadre"
                        name="niveauPlongeeEncadre"
                        value={inscriptionData.niveauPlongeeEncadre ?? ''}
                        onChange={handleChange}
                        label="Niveau Plongée Encadrée"
                        options={[
                            ...niveauPlongeeEncadreOptions.map((value) => ({
                                value: value.toString(),
                                label: value.toString(),
                            })),
                        ]}
                    />
                </div>
                <div>
                    <Select
                        id="niveauMoniteur"
                        name="niveauMoniteur"
                        value={inscriptionData.niveauMoniteur}
                        onChange={handleChange}
                        label="Niveau Moniteur"
                        options={[
                            ...niveauMoniteurOptions.map((value) => ({
                                value: value,
                                label: value,
                            })),
                        ]}
                    />
                </div>
                <Button type="submit">Soumettre</Button>
            </form>
        </div>
    );
}
