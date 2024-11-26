import React, { useState } from 'react';
import {Plongeur} from "@/types/Plongeur";
import {Commentaire} from "@/types/Commentaire";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"; // Assurez-vous de typer correctement Commentaire

interface AddCommentDialogProps {
    addCommentActive: boolean;
    setAddCommentActive: (active: boolean) => void;
    selectedDiver: Plongeur | null;
    idSortie: string;
    postCommentaire: (comment: Commentaire) => void;
}

const AddCommentDialog: React.FC<AddCommentDialogProps> = ({
                                                               addCommentActive,
                                                               setAddCommentActive,
                                                               selectedDiver,
                                                               idSortie,
                                                               postCommentaire,
                                                           }) => {
    const [textComment, setTextComment] = useState('');

    const handlePostComment = () => {
        if (selectedDiver) {
            postCommentaire({
                plongeur: selectedDiver.id,
                sortie: parseInt(idSortie, 10),
                message: textComment,
            } as Commentaire);
            setAddCommentActive(false);
        }
    };

    return (
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
                        defaultValue=""
                        onChange={(e) => setTextComment(e.target.value)}
                        className="min-h-[100px]"
                    />
                    <Button
                        className="w-full bg-[#2f3570] hover:bg-[#43497E]"
                        onClick={handlePostComment}
                    >
                        Confirmez
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddCommentDialog;
