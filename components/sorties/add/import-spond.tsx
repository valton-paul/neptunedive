'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Search, TriangleAlert, AlarmClockPlus} from "lucide-react";
import {useEffect, useState} from "react";
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getSortiesSpond, importAllSortiesSpond, importSortieSpond} from "@/api/sortiesApi";
import {useUser} from "@/lib/useUser";
import {SortieSpond} from "@/types/SortieSPond";
import {SortieSpondCard} from "@/components/sorties/add/SortieSpondCard";
import toast from "react-hot-toast";
import {SetupIntervalTime} from "@/components/sorties/add/setup-interval-time";




export function ImportSpond() {
    const { user, loading: isUserLoading } = useUser();
    const [payload, setPayload] = useState({
        lieu: '',
        dateSortie: '',
        heureSortie: ''
    })
    const [filteredSorties, setFilteredSorties] = useState<SortieSpond[]>([])

    const {mutate: importAllSortiesMutation} = useCustomMutation(
        async (length) => {
            if (length !== 0) {
                return await importAllSortiesSpond(sortiesSpond);
            }
        },
        [['sortiesSpond']],
        {
            onSuccess: () => {
                toast.success('Sorties importées avec succès', {icon: '🎉'});
            },
            onError: () => {
                toast.error('Erreur lors de l\'importation des sorties', {icon: '⚠️'});
            }
        }

    )

    const { mutate: importSortieMutation } = useCustomMutation(
        async (sortieIdSpond: string) => {
            return await importSortieSpond(sortiesSpond.find(sortie => sortie.idSpond === sortieIdSpond));
        },
        [['sortiesSpond']],
        {
            onSuccess: () => {
                toast.success('Sortie importée avec succès', {icon: '🎉'});
            },
            onError: () => {
                toast.error('Erreur lors de l\'importation de la sortie', {icon: '⚠️'});
            }
        }
    )

    const {data: sortiesSpond = [], isLoading} = useCustomQuery(
        ['sortiesSpond', user?.id],
        () =>
            getSortiesSpond()
                .then((response) => response?.data as SortieSpond[])
                .catch((error) => {
                    if (error.response?.status === 500 && error.response?.data?.detail === 'No credentials found') {
                        toast.error("Veuillez entrez vos identifiants Spond dans l'onglet Club ", {icon: '⚠️', duration: 3000});
                    }
                    return [];
                }),
        {enabled: !!user?.id}
    )


    useEffect(() => {
        if (!isLoading) {
            let filtered = sortiesSpond

            if (payload.lieu) {
                filtered = filtered?.filter(sortie => sortie.lieu?.includes(payload.lieu))
            }
            if (payload.dateSortie) {
                filtered = filtered.filter(sortie => sortie.dateSortie?.includes(payload.dateSortie))
            }
            if (payload.heureSortie) {
                filtered = filtered.filter(sortie => sortie.heure_sortie?.includes(payload.heureSortie))
            }
            if (JSON.stringify(filtered) !== JSON.stringify(filteredSorties)) {
                setFilteredSorties(filtered);
            }
        }
    }, [sortiesSpond, payload, isLoading]);

    return (
        <Card className="w-full md:w-3/4 mx-auto mt-5">
            <CardHeader>
                <CardTitle>Importer des sorties depuis spond</CardTitle>
                <CardDescription className={"flex gap-2 !mt-3 items-center"}>
                    <TriangleAlert className={"min-w-5 m-0"} />Attention, si l'un des plongeurs inscrit à la sortie sur Spond n'est pas inscrit sur ce site alors il ne sera pas inscrit à la sortie importé.
                    La limite d'affichage des sorties est de 100 sorties.
                </CardDescription>
            </CardHeader>
            <CardContent className={"!p-3 sm:!p-6"}>
                <div className={"flex gap-3"}>
                    <div className={"flex flex-grow sm:h-[50px] sm:flex-row flex-col sm:gap-0 gap-2 items-center sm:border sm:rounded-full sm:divide-x z-0 sm:shadow"}>
                        <Input
                            className={"sm:basis-3/4 sm:shadow-none  sm:border-0 border-black shadow sm:border-inherit sm:rounded-full sm:focus:z-10 sm:focus:border-0 sm:focus-visible:ring-offset-2 focus-visible:ring-offset-0 focus-visible:ring-[#2f3570] "}
                            type={'text'}
                            name={'spondId'} id={"spondId"}
                            placeholder="Rechercher une sortie..."
                            defaultValue={payload.lieu}
                            onChange={(e) => setPayload({...payload, lieu: e.target.value})}
                        />
                        <Input
                            className={"sm:basis-1/4 sm:shadow-none  sm:justify-center border-black shadow sm:border-inherit sm:border-0 sm:rounded-none sm:focus:z-10 sm:focus:rounded-full sm:focus-visible:ring-offset-2 sm:focus:!border-0 focus-visible:ring-offset-0 focus-visible:ring-[#2f3570]"}
                            type={"date"}
                            name={"dateSortie"} id={"dateSortie"}

                            defaultValue={payload.dateSortie}
                            onChange={(e) => setPayload({...payload, dateSortie: e.target.value})}
                        />
                        <Input
                            className={"sm:basis-1/4 sm:shadow-none sm:justify-center border-black shadow sm:border-inherit sm:border-0  sm:rounded-e-full sm:focus:z-10 sm:focus:rounded-full sm:focus-visible:ring-offset-2 sm:focus:!border-0 focus-visible:ring-offset-0 focus-visible:ring-[#2f3570]"}
                            type={"time"}
                            name={"heureSortie"} id={"heureSortie"}
                            defaultValue={payload.heureSortie}
                            onChange={(e) => setPayload({...payload, heureSortie: e.target.value})}
                        />
                        <div className={"flex items-center h-full p-2 bg-[#2f3570] text-white rounded-e-full hidden sm:flex"}>
                            <Search/>
                        </div>
                    </div>
                    <div className={"flex bg-[#2f3570] rounded-lg text-white divide-x"}>
                        <p
                            className={`p-2 h-full flex items-center hover:bg-[#43497E] rounded-s-lg cursor-pointer 
                            ${sortiesSpond.length === 0 ? "bg-[#43497E] cursor-not-allowed" : ""}`}
                            onClick={() => { if (sortiesSpond.length !== 0) importAllSortiesMutation(sortiesSpond.length)}}
                        >
                            Importer toutes les sorties
                        </p>

                        <SetupIntervalTime/>
                    </div>
                </div>

                <div className={"border-b w-4/5 mx-auto rounded mt-6"}></div>

                <div className={"flex flex-col gap-3 mt-6"}>
                    {!isLoading ? (
                        sortiesSpond.length !== 0 ? filteredSorties.map(sortie => (
                            <SortieSpondCard key={sortie.idSpond} sortie={sortie} onClick={() => importSortieMutation(sortie.idSpond)}/>
                        )) : (
                            <p className={"text-center text-gray-500"}>Aucune sortie trouvée</p>
                        )
                    ) : (
                        <p>Chargement...</p>
                    )}
                </div>
            </CardContent>
        </Card>

    )
}