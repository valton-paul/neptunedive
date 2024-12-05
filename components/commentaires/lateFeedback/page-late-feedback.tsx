'use client';
import { FeedBackCard } from "@/components/commentaires/lateFeedback/FeedBackCard";
import {useCustomMutation, useCustomQuery} from "@/tanStackQuery/queryGenerator";
import {getLateFeedbacks, postCommentaire} from "@/api/commentairesAPI";
import {useUser} from "@/lib/useUser";
import {FeedBack} from "@/types/FeedBack";
import React, {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Commentaire} from "@/types/Commentaire";
import eventEmitter from "@/lib/utils";
import toast from "react-hot-toast";


export default function LateFeedbacks(){
    const {user, loading: userLoading} = useUser();
    const [isAddFeedbackWindowOpen, setIsAddFeedbackWindowOpen] = useState(false);
    const [selectedDiver, setSelectedDiver] = useState<FeedBack | null>(null);
    const [textComment, setTextComment] = useState<string>('');
    const onAddFeedback = (isOpen: boolean, feedback: FeedBack) => {
        setIsAddFeedbackWindowOpen(isOpen);
        setSelectedDiver(feedback);
    }

    const {data: lateFeedbacks = [], isLoading: isLoadingLateFeedbacks} = useCustomQuery<FeedBack[]>(
        ['lateFeedbacks', user?.id.toString()],
        () => getLateFeedbacks(user?.id.toString()),
        {enabled: !!user?.id}
    );

    const {mutate: postNewCommentaire} = useCustomMutation(
        async (comment: Commentaire) => {

            return await postCommentaire(comment).then(() => eventEmitter.emit('newFeedback', () => {}));
        },
        [["lateFeedbacks"]],
        {
            onSuccess: () => {
                toast.success('Feedback donné avec succes', { icon: '🎉' });
            },
            onError: () => {
                toast.error("Erreur lors de l'envoie du feedback", { icon: '⚠' });
            }
        }
    );

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            {!isLoadingLateFeedbacks && lateFeedbacks.length > 0 ? lateFeedbacks.map((feedback) => (
                <FeedBackCard key={feedback.sortie_id+""+feedback.plongeur_id} feedback={feedback} onAddFeedback={onAddFeedback} />
            ))
            :
            isLoadingLateFeedbacks ? <p className="text-center text-gray-500">Chargement...</p> :
            <div className={"h-[60vh] flex items-center"}>
                <div className="text-center rounded-md flex-grow bg-white p-4 ">
                    Vous n'avez pas de feedback à donner
                </div>
            </div>
            }
            {isAddFeedbackWindowOpen ?  (
                <Dialog open={isAddFeedbackWindowOpen} onOpenChange={setIsAddFeedbackWindowOpen}>
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
                                className="min-h-[400px]"
                            />
                            <Button
                                className="w-full bg-[#2f3570] hover:bg-[#43497E]"
                                onClick={() => {
                                    postNewCommentaire({
                                        plongeur: selectedDiver?.plongeur_id,
                                        sortie: parseInt(selectedDiver?.sortie_id),
                                        message: textComment
                                    } as unknown as Commentaire)
                                    setIsAddFeedbackWindowOpen(false)
                                }}
                            >
                                Confirmez
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            ): null}
        </div>
    )
}