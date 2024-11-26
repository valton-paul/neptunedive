'use client'

import React, {useCallback, useEffect, useRef, useState} from "react"
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getPlongeursNotAssignedSortie} from "@/api/sortiesApi";
import {
    assignPlongeurToPalanquee,
    createPalanquee,
    deletePalanquee,
    getAssignationPalanqueeSortie,
    getPalanqueesSortie,
    unassignPlongeurToPalanquee,
    updatePalanquee
} from "@/api/palanqueesApi";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {Palanquee} from "@/types/Palanquee";
import {Plongeur} from "@/types/Plongeur";
import debounce from "debounce";
import {handleDragEnd, handleDragStart} from "@/lib/dragHandlers";
import {postCommentaire} from "@/api/commentairesAPI";
import SafetySheetContent from "@/components/sorties/safety-sheet/MobileSafetySheet";
import DndSafetySheet from "@/components/sorties/safety-sheet/DndSafetySheet";


export function SafetySheet({idSortie}: { idSortie: string }) {

    const [activeDiver, setActiveDiver] = useState<Plongeur | null>(null)
    const [addCommentActive, setAddCommentActive] = useState<boolean>(false)
    const [selectedDiver, setSelectedDiver] = useState<Plongeur | null>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
    }, []);

    const onAddComment = (isActive, Diver) => {
        setAddCommentActive(isActive)
        setSelectedDiver(Diver)
    }

    const {data: divers = []} = useCustomQuery<Plongeur[]>(
        ['plongeursNotAssigned', idSortie],
        () => getPlongeursNotAssignedSortie(idSortie),
        {enabled: !!idSortie}
    )

    const {data: palanquees = []} = useCustomQuery<Palanquee[]>(
        ['palanquees', idSortie],
        () => getPalanqueesSortie(idSortie),
        {enabled: !!idSortie}
    )

    const {
        data: assignationsPalanquees = [],
    } = useCustomQuery<AssignationPalanquee[]>(
        ['assignationsPalanquees', idSortie],
        () => getAssignationPalanqueeSortie(idSortie),
        {enabled: !!idSortie}
    )

    const {mutate: moveDiverInPalanqueeDivers} = useCustomMutation(
        async ({idPlongeur, idPalanquee}: { idPlongeur: string, idPalanquee: string }) => {
            return await assignPlongeurToPalanquee(idPalanquee, idPlongeur)
        },
        [['assignationsPalanquees'], ['plongeursNotAssigned']]
    );

    const {mutate: moveDiverOutPalanqueeDivers} = useCustomMutation(
        async ({idPlongeur, idPalanquee}: { idPlongeur: string, idPalanquee: string }) => {
            return await unassignPlongeurToPalanquee(idPalanquee, idPlongeur)
        },
        [['assignationsPalanquees'], ['plongeursNotAssigned']]
    );

    const {mutate: updateAPalanquee} = useCustomMutation(
        async (palanquee: Palanquee) => {
            return await updatePalanquee(palanquee)
        },
        [['palanquees'], ['plongeursNotAssigned']]
    );

    const {mutate: addPalanquee} = useCustomMutation(
        async (palanquee: Palanquee) => {
            return await createPalanquee(palanquee)
        },
        [['palanquees',]]
    )

    const {mutate: delPalanquee} = useCustomMutation(
        async (palanqueeId: string) => {
            return await deletePalanquee(palanqueeId)
        },
        [['palanquees'], ['plongeursNotAssigned']]
    )


    const updateDebouncedPalanquee = useCallback(
        debounce((palanquee) => updateAPalanquee(palanquee), 300),
        [updateAPalanquee]
    );

    const handleDragStartFn = (event) => {
        handleDragStart(event, divers, palanquees, assignationsPalanquees, setActiveDiver)
    }

    const handleDragEndFn = (event) => {
        handleDragEnd(event, divers, parseInt(idSortie), palanquees, assignationsPalanquees, setActiveDiver, moveDiverInPalanqueeDivers, moveDiverOutPalanqueeDivers, updateAPalanquee)
    }

    const setEncadrant = (palanquee: Palanquee, idPlongeur: string) => {
        updateAPalanquee({
            ...palanquee,
            encadrant: idPlongeur,
            sortie: parseInt(idSortie)
        })
    }

    const removeEncadrant = (palanquee: Palanquee) => {
        updateAPalanquee({
            ...palanquee,
            encadrant: null,
            sortie: parseInt(idSortie)
        })
    }

    const handleScroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (

        <div className="flex bg-gray-100 rounded">
            {isMobile ? (
                <SafetySheetContent
                    palanquees={palanquees}
                    assignationsPalanquees={assignationsPalanquees}
                    divers={divers}
                    idSortie={idSortie}
                    sliderRef={sliderRef}
                    updateDebouncedPalanquee={updateDebouncedPalanquee}
                    delPalanquee={delPalanquee}
                    addPalanquee={addPalanquee}
                    onAddDiver={moveDiverInPalanqueeDivers}
                    onRemoveDiver={moveDiverOutPalanqueeDivers}
                    onRemoveMoniteur={removeEncadrant}
                    setMoniteur={setEncadrant}
                    handleScroll={handleScroll}
                />
            ) : (
                <DndSafetySheet
                    divers={divers}
                    palanquees={palanquees}
                    assignationsPalanquees={assignationsPalanquees}
                    activeDiver={activeDiver}
                    addCommentActive={addCommentActive}
                    selectedDiver={selectedDiver}
                    idSortie={idSortie}
                    handleDragStartFn={handleDragStartFn}
                    handleDragEndFn={handleDragEndFn}
                    updateDebouncedPalanquee={updateDebouncedPalanquee}
                    onAddComment={onAddComment}
                    delPalanquee={delPalanquee}
                    addPalanquee={addPalanquee}
                    setAddCommentActive={setAddCommentActive}
                    postCommentaire={postCommentaire}
                />
            )}

        </div>

    )
}
