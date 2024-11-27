import React from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquarePlus } from "lucide-react";
import AddCommentaireComponent from "@/components/sorties/safety-sheet/AddCommentaireComponent";
import { Palanquee } from "@/types/Palanquee";
import { Plongeur } from "@/types/Plongeur";
import { AssignationPalanquee } from "@/types/AssignationPalanquee";
import {PalanqueeCard} from "@/components/sorties/safety-sheet/PalanqueeCard";
import {SidebarSafetySheet} from "@/components/sorties/safety-sheet/SidebarSafetySheet";

interface DndSafetySheetProps {
    divers: Plongeur[];
    palanquees: Palanquee[];
    assignationsPalanquees: AssignationPalanquee[];
    activeDiver: Plongeur | null;
    addCommentActive: boolean;
    selectedDiver: Plongeur | null;
    idSortie: string;
    handleDragStartFn: (event: any) => void;
    handleDragEndFn: (event: any) => void;
    updateDebouncedPalanquee: (palanquee: Palanquee) => void;
    onAddComment: (isActive: boolean, diver: Plongeur) => void;
    delPalanquee: (id: string) => void;
    addPalanquee: (palanquee: Palanquee) => void;
    setAddCommentActive: (isActive: boolean) => void;
    postCommentaire: (comment: any) => void;
}

const DndSafetySheet: React.FC<DndSafetySheetProps> = ({
                                                           divers,
                                                           palanquees,
                                                           assignationsPalanquees,
                                                           activeDiver,
                                                           addCommentActive,
                                                           selectedDiver,
                                                           idSortie,
                                                           handleDragStartFn,
                                                           handleDragEndFn,
                                                           updateDebouncedPalanquee,
                                                           onAddComment,
                                                           delPalanquee,
                                                           addPalanquee,
                                                           setAddCommentActive,
                                                           postCommentaire,
                                                       }) => {
    return (
        <DndContext onDragStart={handleDragStartFn} onDragEnd={handleDragEndFn}>
            {/* Left Sidebar - Divers List */}
            <SidebarSafetySheet divers={divers} onAddComment={onAddComment} />

            {/* Main Content - Groups */}
            <div className="flex-1 p-6 overflow-visible">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {palanquees.map((palanquee) => (
                        <PalanqueeCard
                            key={palanquee.id}
                            palanquee={palanquee}
                            assignationsPalanquees={assignationsPalanquees}
                            updateDebouncedPalanquee={updateDebouncedPalanquee}
                            onAddComment={onAddComment}
                            onDeletePalanquee={delPalanquee}
                        />
                    ))}
                    <div className="flex items-center">
                        <Button
                            onClick={() => addPalanquee({ sortie: parseInt(idSortie) } as Palanquee)}
                            className="flex mx-auto bg-[#2f3570] hover:bg-[#43497E]"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter un groupe
                        </Button>
                    </div>
                </div>
            </div>

            <DragOverlay style={{ zIndex: 9 }}>
                {activeDiver ? (
                    <div
                        className="flex flex flex-wrap items-center  bg-white rounded border items-center relative p-2 shadow-lg cursor-grabbing">
                        <div>{`${activeDiver.nom} ${activeDiver.prenom}`}</div>
                        <div className={"flex gap-2 2xl:ms-2 flex-wrap xl:flex-nowrap"}>
                            <div
                                className={"flex divide-x gap-1 border-white  px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full"}>
                        <span>
                            PA{activeDiver.niveauPlongeeAutonome}
                        </span>
                                <span className={'ps-1'}>
                            PE{activeDiver.niveauPlongeeEncadre}
                        </span>
                            </div>
                            {activeDiver.formation && (
                                <span
                                    className=" px-2 py-1 bg-[#4a5180] text-white text-xs rounded-full">En formation</span>
                            )}
                        </div>
                        {!activeDiver.isMoniteur ? (
                            <MessageSquarePlus
                                className="absolute right-0 top-2 me-2"
                                style={{zIndex: 11, bottom: "7px"}}
                            />
                        ) : null}
                    </div>
                ) : null}
            </DragOverlay>

            <AddCommentaireComponent
                addCommentActive={addCommentActive}
                setAddCommentActive={setAddCommentActive}
                selectedDiver={selectedDiver}
                idSortie={idSortie}
                postCommentaire={postCommentaire}
            />
        </DndContext>
    );
};

export default DndSafetySheet;
