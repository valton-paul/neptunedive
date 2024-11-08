'use client'

import React, {useCallback, useState} from "react"
import {DndContext, DragOverlay} from "@dnd-kit/core"
import {MessageSquarePlus, Plus} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getPlongeursNotAssignedSortie} from "@/api/sortiesApi";
import {
    assignPlongeurToPalanquee, createPalanquee, deletePalanquee,
    getAssignationPalanqueeSortie,
    getPalanqueesSortie,
    unassignPlongeurToPalanquee,
    updatePalanquee
} from "@/api/palanqueesApi";
import {AssignationPalanquee} from "@/types/AssignationPalanquee";
import {Palanquee} from "@/types/Palanquee";
import {Plongeur} from "@/types/Plongeur";
import debounce from "debounce";
import {SidebarSafetySheet} from "@/components/sorties/safety-sheet/SidebarSafetySheet";
import {PalanqueeCard} from "@/components/sorties/safety-sheet/PalanqueeCard";
import {handleDragEnd, handleDragStart} from "@/lib/dragHandlers";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {postCommentaire} from "@/api/commentairesAPI";
import {Commentaire} from "@/types/Commentaire";


export function SafetySheet({idSortie} : {idSortie: string}) {

  const [activeDiver, setActiveDiver] = useState<Plongeur | null>(null)
  const [addCommentActive, setAddCommentActive] = useState<boolean>(false)
  const [selectedDiver, setSelectedDiver] = useState<Plongeur | null>(null)
  const onAddComment = (isActive, Diver) => {
    setAddCommentActive(isActive)
    setSelectedDiver(Diver)
  }

  const {data: divers  = [], isLoading: isLoadingDivers} = useCustomQuery<Plongeur[]>(
    ['plongeursNotAssigned', idSortie],
    () => getPlongeursNotAssignedSortie(idSortie),
    {enabled: !!idSortie}
  )

  const {data: palanquees = [], isLoading: isLoadingPalanquee} = useCustomQuery<Palanquee[]>(
    ['palanquees', idSortie],
    () => getPalanqueesSortie(idSortie),
    {enabled: !!idSortie}
  )

  const {data: assignationsPalanquees = [], isLoading: isLoadingAssignationPalanquee} = useCustomQuery<AssignationPalanquee[]>(
      ['assignationsPalanquees', idSortie],
      () => getAssignationPalanqueeSortie(idSortie),
      {enabled: !!idSortie}
  )

  const { mutate: moveDiverInPalanqueeDivers} = useCustomMutation(
      async ({idPlongeur, idPalanquee} : {idPlongeur: string, idPalanquee: string}) => {
        return await assignPlongeurToPalanquee(idPalanquee, idPlongeur)
      },
      [['assignationsPalanquees'], ['plongeursNotAssigned']]
  );

  const { mutate: moveDiverOutPalanqueeDivers } = useCustomMutation(
        async ({idPlongeur, idPalanquee} : {idPlongeur: string, idPalanquee: string}) => {
            return await unassignPlongeurToPalanquee(idPalanquee, idPlongeur)
        },
        [['assignationsPalanquees'], ['plongeursNotAssigned']]
    );

  const { mutate: updateAPalanquee } = useCustomMutation(
        async (palanquee: Palanquee) => {
            return await updatePalanquee(palanquee)
        },
         [['palanquees'], ['plongeursNotAssigned']]
    );

  const { mutate: addPalanquee } = useCustomMutation(
        async (palanquee: Palanquee) => {
            return await createPalanquee(palanquee)
        },
        [['palanquees']]
    )

    const { mutate: delPalanquee } = useCustomMutation(
        async (palanqueeId: string) => {
            return await deletePalanquee(palanqueeId)
        },
        [['palanquees']]
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

  const [textComment, setTextComment] = useState<string>('')

  return (

      <div className="flex bg-gray-100 rounded">
        <DndContext
            onDragStart={handleDragStartFn}
            onDragEnd={handleDragEndFn}
        >
          {/* Left Sidebar - Divers List */}
          <SidebarSafetySheet divers={divers} onAddComment={onAddComment} />

          {/* Main Content - Groups */}
          <div className="flex-1 p-6 overflow-visible ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {palanquees.map((palanquee) => (
                  <PalanqueeCard
                      key={palanquee.id} palanquee={palanquee}
                      assignationsPalanquees={assignationsPalanquees}
                      updateDebouncedPalanquee={updateDebouncedPalanquee}
                      onAddComment={onAddComment}
                      onDeletePalanquee={delPalanquee}
                  />
              ))}
            <div className={"flex items-center"}>
                <Button
                    onClick={()=>addPalanquee({sortie: parseInt(idSortie) } as Palanquee)}
                    className="flex mx-auto bg-[#2f3570] hover:bg-[#43497E]"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un groupe
                </Button>
            </div>

            </div>
          </div>

          <DragOverlay
              style={{
                zIndex: 9,
              }}

          >
            {activeDiver ? (
                <div className={"flex justify-between bg-white rounded border items-center relative p-2 shadow-lg cursor-grabbing"}>
                    <div
                        className=""
                    >
                        {activeDiver.nom} {activeDiver.prenom}
                    </div>

                    {!activeDiver.isMoniteur ? (
                        <MessageSquarePlus
                            className={` absolute right-0 me-2 `}
                            style={{ zIndex: 11, bottom: "7px" }}
                        />
                    ) : null}
                </div>

            ) : null}
          </DragOverlay>
        </DndContext>

        <Dialog open={addCommentActive} onOpenChange={setAddCommentActive}>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedDiver?.nom}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="diver-comment">Ajoutez un commentaire pour cette sortie</Label>
              <Textarea
                  id="diver-comment"
                  defaultValue={''}
                  onChange={(e) => {
                    if (selectedDiver) {
                        setTextComment(e.target.value)
                    }
                  }}
                  className="min-h-[100px]"
              />
              <Button
                  className="w-full bg-[#2f3570] hover:bg-[#43497E]"
                  onClick={() => {
                    postCommentaire({
                      plongeur: selectedDiver?.id,
                      sortie: parseInt(idSortie),
                      message: textComment
                    } as Commentaire)
                    setAddCommentActive(false)
                  }}
              >
                Confirmez
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>

  )
}
