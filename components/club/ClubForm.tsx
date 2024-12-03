'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DonneeClub } from "@/types/DonneeClub";
import {createDonneeClub, findGroupIdSpond, getDonneeClub, updateDonneeClub} from "@/api/donneeClubApi";
import toast from "react-hot-toast";
import {useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {useUser} from "@/lib/useUser";

export function ClubForm() {
    const [isEditingSpond, setIsEditingSpond] = useState(false);
    const [firstTime, setFirstTime] = useState(false);
    const [donneeClub, setDonneeClub] = useState<DonneeClub>({
        emailSpond: '',
        plainPasswordSpond: '',
        groupNameSpond: '',
        emailHA: '',
        passwordHA: '',
        groupIdSpond: '',
        id: undefined
    });

    useEffect(() => {
        getDonneeClub().then((data) => {
            if (data) {
                setDonneeClub(data);
            }
        });
    }, [firstTime]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!(donneeClub.emailSpond && donneeClub.plainPasswordSpond && donneeClub.groupNameSpond)) {
            setIsEditingSpond(true);
            return;
        }
        setIsEditingSpond(false);

        await findGroupIdSpond(donneeClub)
            .then((response) => {
                if (response.status !== 200) {
                    if (response.status === 404) {
                        toast.error("Groupe Spond introuvable", { icon: '⚠' });
                        return null
                    }
                    toast.error("Erreur serveur, veuillez réessayé", { icon: '⚠' });
                    return null
                }
                return response.data;
            })
            .then(async (data) => {
                if (data) {
                    const updatedDonneeClub = {
                        ...donneeClub,
                        groupIdSpond: data.groupId,
                    };

                    try {
                        if (!donneeClub.id) {
                            await createDonneeClub(updatedDonneeClub).then(() => setFirstTime(!firstTime));
                        } else {
                            await updateDonneeClub(updatedDonneeClub);
                        }
                        toast.success("Données enregistrées avec succès", { icon: '🎉' });
                    } catch (e) {
                        toast.error("Erreur lors de l'enregistrement des données", { icon: '⚠' });
                    }
                }

            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDonneeClub((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Card className={"mt-10 w-full md:w-3/4 mx-auto"}>
            <CardHeader>
                <CardTitle>Information du club</CardTitle>
            </CardHeader>
            <CardContent>
                <Form action={'/api/club'} className={"grid grid-cols-1 sm:grid-cols-2 gap-10"} onSubmit={handleSubmit}>
                    <div className={"sm:col-span-1 col-span-2"}>
                        <legend className={"mt-5 border-b w-fit"}>Identifiants Spond</legend>
                        <div className={"mt-5 flex flex-col gap-2"}>
                            <Label htmlFor={"groupNameSpond"}>Nom du groupe</Label>
                            <Input
                                id={"groupNameSpond"}
                                name={'groupNameSpond'}
                                placeholder={'Veuillez respecter les majuscules et minuscules'}
                                value={donneeClub.groupNameSpond || ''}
                                className={"focus-visible:ring-offset-0 focus-visible:ring-[#2f3570] "}
                                onChange={handleChange}
                            />

                            <Label htmlFor={"emailSpond"}>Email</Label>
                            <Input
                                id={"emailSpond"}
                                type={'email'}
                                name={'emailSpond'}
                                placeholder={'example@gmail.com'}
                                value={donneeClub.emailSpond || ''}
                                className={"focus-visible:ring-offset-0 focus-visible:ring-[#2f3570] "}
                                onChange={handleChange}
                            />
                            <Label htmlFor={"plainPasswordSpond"}>Mot de passe</Label>
                            <Input
                                id={"plainPasswordSpond"}
                                name={'plainPasswordSpond'}
                                type={'password'}
                                autoComplete={'new-password'}
                                value={donneeClub.plainPasswordSpond || ''}
                                className={"focus-visible:ring-offset-0 focus-visible:ring-[#2f3570] "}
                                onChange={handleChange}
                            />
                            <p className={`text-justify text-sm ${isEditingSpond ? "text-red-500" : "text-gray-500"}`}>
                                Pour permettre l&#39;importation des sorties depuis Spond, veuillez renseigner tous les champs en lien avec Spond s'il vous plaît.
                                De plus, assurez-vous de rentrer les bons identifiants Spond, le cas échéant, un trop grand nombre de tentative de connexion peut bloquer votre compte Spond.
                            </p>
                        </div>
                    </div>
                    <div className={"sm:col-span-1 col-span-2"}>
                        <legend className={"mt-5 border-b w-fit"}>Identifiants HelloAsso</legend>
                        <div className={"mt-5 flex flex-col gap-2"}>
                            <Label htmlFor={"emailHA"}>Email</Label>
                            <Input
                                id={"emailHA"}
                                name={'emailHA'}
                                defaultValue={donneeClub.emailHA || ''}
                                className={"focus-visible:ring-offset-0 focus-visible:ring-[#2f3570] "}
                                onChange={handleChange}
                            />
                            <Label htmlFor={"passwordHA"}>Mot de passe</Label>
                            <Input
                                id={"passwordHA"}
                                name={'passwordHA'}
                                defaultValue={donneeClub.passwordHA || ''}
                                type={'password'}
                                className={"focus-visible:ring-offset-0 focus-visible:ring-[#2f3570] "}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <Button type={'submit'} className={"col-span-2 w-full md:w-1/4 whitespace-normal bg-[#2f3570] hover:bg-[#2f3570] hover:bg-[#43497E] transition-colors "}>Enregistrer les modifications</Button>
                </Form>
            </CardContent>
        </Card>
    );
}
