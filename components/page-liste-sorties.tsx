'use client'

import React from "react"
import { SortieCard } from "@/components/sorties/sortie-card"
import { Sortie } from "@/types/Sortie"
import {
    enrollToSortie,
    getAllIgnoredSorties, getAllSortiesWhereUserIsEnrolled,
    getSortie, ignoreSortie, unignoreSortie,
} from "@/api/sortiesApi"
import { useUser } from "@/lib/useUser"
import { Card, CardContent } from "@/components/ui/card"
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator"
import toast from "react-hot-toast";
import {IgnoredSortie} from "@/types/IgnoredSortie";

export function ListeSorties() {
    const { user } = useUser()

    const { data: alreadyEnrolledSorties, isLoading: isLoadingEnrolled } = useCustomQuery<Sortie[]>(
        ["enrolledSorties", user?.id],
        () => getAllSortiesWhereUserIsEnrolled(user?.id),
        { enabled: !!user?.id }
    )

    const { data: ignoredSortieIds, isLoading: isLoadingIgnored } = useCustomQuery<IgnoredSortie[]>(
        ["ignoredSorties", user?.id],
        () => getAllIgnoredSorties(user?.id?.toString() ?? ""),
        { enabled: !!user?.id }
    )

    const mutationOptions = [["sorties"], ["ignoredSorties"], ["enrolledSorties"], ["filteredSorties"]]

    const {mutate: toggleEnrollment} = useCustomMutation(
        async (sortie: Sortie) => {
                return await enrollToSortie(user.id.toString(), sortie.id.toString());
        },
        mutationOptions,
        {
            onSuccess: () => {
                toast.success('Sortie modifiée avec succès', {icon: '🎉'});
            },
            onError: () => {
                toast.error('Erreur lors de la modification de la sortie', {icon: '⚠'});
            }
        }
    );

    const { mutate: unignoreSortieMutation } = useCustomMutation(
        async (sortieId: string) => {
            return await unignoreSortie(sortieId, user.id.toString());
        },
        [['ignoredSorties']]
    )

    const {mutate: ignoreSortieMutation} = useCustomMutation(
        async (sortieId: string) => {
            return await ignoreSortie(sortieId, user.id.toString());
        },
        [['ignoredSorties']],
        {
            onSuccess: () => {
                toast.success('Sortie ignorée avec succès', {icon: '🎉'});
            },
            onError: () => {
                toast.error('Erreur lors de l\'ignorance de la sortie', {icon: '⚠'});
            }
        }
    );


    const toggleIgnore = (sortieId: string) => {
        if (!ignoredSortieIds) {
            return
        }
        if (ignoredSortieIds.filter(s => s.sortie?.id === parseInt(sortieId)).length > 0) {
            unignoreSortieMutation(sortieId)
        } else {
            ignoreSortieMutation(sortieId)
        }
    }


    const isLoading = isLoadingIgnored

    const renderSortieCard = (sortie: Sortie) => {
        const isIgnored = ignoredSortieIds.some(s => s.sortie?.id === sortie.id)
        return (
            <div className={isIgnored ? "opacity-50" : ""} key={sortie.id}>
                <SortieCard sortie={sortie} displayEnrollButton={!isIgnored}
                            onEnrollmentChange={() => {toggleEnrollment(sortie)}}
                            displayIgnoreButton={true} onIgnoreChange={
                    () => toggleIgnore(sortie.id.toString())
                }/>
            </div>
        )
    }


    const filterSorties = async (enrolled: Sortie[]) => {
        return (await getSortie(user?.id?.toString() ?? "")).filter(sortie => !enrolled.some(s => s.id === sortie.id))
    }

    const { data: filteredSorties, isLoading: isfilteredLoading } = useCustomQuery<Sortie[]>(
        ["filteredSorties", ignoredSortieIds, alreadyEnrolledSorties],
        () => filterSorties(alreadyEnrolledSorties),
        { enabled: !isLoadingIgnored && !isLoadingEnrolled && !!ignoredSortieIds && !!alreadyEnrolledSorties }
    )

    if (!alreadyEnrolledSorties || !ignoredSortieIds) {
        return <p>Chargement des sorties...</p>
    }


    if (isfilteredLoading ||!filteredSorties) {
        return <p>Chargement des sorties...</p>
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Toutes les sorties</h2>
                {isLoading ? (
                    <p>Chargement des sorties...</p>
                ) : (
                    <div className="space-y-4">
                        {
                            filteredSorties.length === 0 && <p>Il n&#39;y a pas de sorties à afficher</p>
                        }
                        {filteredSorties.map(renderSortieCard)}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}