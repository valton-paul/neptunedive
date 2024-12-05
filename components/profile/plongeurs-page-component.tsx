import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {GraduationCap, User} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getAllPlongeurs} from "@/api/plongeurApi";
import {Plongeur} from "@/types/Plongeur";
import {useRouter} from "next/navigation";
import {Label} from "@/components/ui/label";
import {useUser} from "@/lib/useUser";
import {FeedBack} from "@/types/FeedBack";
import {getLateFeedbacksAllEncadrant} from "@/api/commentairesAPI";
import PlongeurBadge from "@/components/profile/PlongeurBadge";
import {getLatePayement} from "@/api/paymentAPI";

export default function PlongeursPageComponent() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const {data: plongeurs, isLoading} = useCustomQuery<Plongeur[]>(
        ['plongeurs'],
        () => getAllPlongeurs()
    )
    const [filteredPlongeurs, setFilteredPlongeurs] = useState<Plongeur[]>([])
    const [isOnlyMoniteur, setIsOnlyMoniteur] = useState(false)
    const [isOnlyMoniteurFeedback, setIsOnlyMoniteurFeedback] = useState(false)
    const [isOnlyFormation, setisOnlyFormation] = useState(false)
    const [isOnlyPayement, setIsOnlyPayement] = useState(false)
    const {user, loading} = useUser()

    const {data: lateFeedbacks = [], isLoading: isLoadingLateFeedbacks} = useCustomQuery<FeedBack[]>(
        ['lateFeedbacks'],
        () => getLateFeedbacksAllEncadrant(),
        {enabled: (!loading && user?.roles.includes('ROLE_ADMIN'))}
    )

    const {data: latePayement = [], isLoading: isLoadingLatePayement} = useCustomQuery<Plongeur[]>(
        ['latePayement'],
        () => getLatePayement(),
        {enabled: (!loading && user?.roles.includes('ROLE_ADMIN'))}
    )

    useEffect(() => {
        if (!isLoading) {
            let filtered = plongeurs;
            if (isOnlyMoniteur) {
                filtered = filtered.filter(plongeur => plongeur.isMoniteur);
            }

            if (isOnlyMoniteurFeedback) {
                filtered = filtered.filter(plongeur => lateFeedbacks.some(feedback => parseInt(feedback.encadrant_id) === plongeur.id));
            }

            if (isOnlyFormation) {
                filtered = filtered.filter(plongeur => plongeur.formation)
            }

            if (isOnlyPayement) {
                filtered = filtered.filter(plongeur => latePayement.some(payement => payement.id === plongeur.id))
            }

            // Filtrer par le terme de recherche
            setFilteredPlongeurs(
                filtered.filter(plongeur =>
                    plongeur.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    plongeur.prenom?.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [isLoading, plongeurs, searchTerm, isOnlyMoniteur, isOnlyMoniteurFeedback, isOnlyFormation, isOnlyPayement]);

    const isLatePayers = (id: number) => {
        return latePayement.some(payement => payement.id === id)
    }

    const redirect = (id: number) => {
        const path = `/plongeurs/${id}`
        router.push(path)
    }

    return (
        <div className="container mx-auto p-4 bg-[#e6f4ff] min-h-screen">
            <h1 className="text-3xl font-bold text-center text-[#2f3570] mb-6">Liste des Plongeurs</h1>

            <div className="mb-6 flex items-center flex-col mx-auto ">
                <Input
                    type="text"
                    placeholder="Rechercher un plongeur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                />
                <div className={"flex mt-3 gap-2 items-center flex-wrap sm:flex-nowrap"}>
                    <div className={"flex items-center"}>
                        <Input
                            type={"checkbox"}
                            className={"mx-2  h-fit"}
                            id={"moniteur"}
                            checked={isOnlyMoniteur}
                            onChange={(e) => setIsOnlyMoniteur(e.target.checked)}
                        />
                        <Label htmlFor="moniteur">Moniteur</Label>
                    </div>
                    {user?.roles.includes('ROLE_ADMIN') && (
                        <>
                            <div className={"flex items-center"}>
                                <Input
                                    type={"checkbox"}
                                    className={"mx-2 w-min h-full"}
                                    id={"moniteurFeedback"}
                                    checked={isOnlyMoniteurFeedback}
                                    onChange={(e) => setIsOnlyMoniteurFeedback(e.target.checked)}/>
                                <Label htmlFor="moniteurFeedback" className={"bg-orange-400 rounded p-1 text-center"}>
                                    Doit renseigner une fiche de suivie
                                </Label>
                            </div>
                            <div className={"flex items-center"}>
                                <Input
                                    type={"checkbox"}
                                    className={"mx-2 w-min h-full"}
                                    id={"checkPaiement"}
                                    checked={isOnlyPayement}
                                    onChange={(e) => setIsOnlyPayement(e.target.checked)}
                                />
                                <Label htmlFor="checkPaiement" className={"bg-red-400 rounded p-1 text-center"}>
                                    En attente de paiement
                                </Label>
                            </div>
                        </>
                    )}
                    <div className={"flex items-center"}>
                        <Input
                            type={"checkbox"}
                            className={"mx-2 w-min h-full"}
                            id={"checkFormation"}
                            checked={isOnlyFormation}
                            onChange={(e) => setisOnlyFormation(e.target.checked)}
                        />
                        <Label htmlFor="checkFormation" className={"flex"}>
                            <span className={"rounded p-1 text-center"}> En formation </span>
                            <GraduationCap className="!h-6 !w-6 bg-[#4a5180] text-white p-1 rounded-full me-1"/>
                        </Label>

                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPlongeurs.map((plongeur) => (
                    <Card key={plongeur.id} className="bg-white hover:shadow-lg transition-shadow duration-300"
                          onClick={() => redirect(plongeur.id)}>
                        <CardContent className="p-4 flex flex-col items-center relative">
                            <>
                                {plongeur.isMoniteur && (
                                    <span
                                        className="mt-1 px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full absolute left-3 top-3">Moniteur</span>
                                )}
                                <div className={"flex items-center flex-col absolute top-3 right-3 gap-2"}>
                                    {lateFeedbacks.some(feedback => parseInt(feedback.encadrant_id) === plongeur.id) && (
                                        <div
                                            className={"bg-orange-400 h-[20px] w-[20px] rounded-full"}></div>
                                    )}
                                    {
                                        isLatePayers(plongeur.id) &&
                                            <div
                                                className={"bg-red-400 h-[20px] w-[20px] rounded-full"}></div>
                                    }
                                </div>

                                <div
                                    className="w-16 h-16 bg-[#2f3570] rounded-full flex items-center justify-center mb-3">
                                    <User className="h-8 w-8 text-white"/>
                                </div>
                                <h2 className="text-lg font-semibold text-[#2f3570] text-center">{`${plongeur.prenom} ${plongeur.nom}`}</h2>
                                <PlongeurBadge plongeur={plongeur}/>
                            </>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredPlongeurs.length === 0 && (
                <p className="text-center text-gray-500 mt-6">Aucun plongeur trouvé.</p>
            )}
        </div>
    )
}