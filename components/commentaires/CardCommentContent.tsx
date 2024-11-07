import {useState, useRef, useEffect} from "react";
import {ChevronLeft} from "lucide-react";
import './cardCommentContent.css'
import { Commentaire } from "@/types/Commentaire";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {patchCommentaire} from "@/api/commentairesAPI";
import Link from "next/link";


export function CardCommentContent({ comment }: { comment: Commentaire }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");
    const [textHeight, setTextHeight] = useState<number | null>(null);
    const contentRef = useRef<HTMLParagraphElement>(null);


    useEffect(() => {
        const element = contentRef.current;
        if (element) {
            setIsOverflowed(element.scrollHeight > element.clientHeight);
        }
        setTextHeight(comment.message ? Math.ceil(comment.message?.length/90)*24 : 0);

    }, [comment.message]);


    const handleSave = () => {
        if (editContent.length > 1024){
            /*
            * A modifier pour afficher un message d'erreur plus propre dans le commentaire
            */
            alert("Le commentaire ne peut pas dépasser 1024 caractères\nIl y a actuellement " + (editContent.length - 1024) + " caractères en trop");
            return;
        }
        if (editContent.length !== 0){
            comment.message = editContent;
        }
        if (comment.message !== null){
            patchCommentaire(comment, comment.message);
        }
        setIsEditing(false);
    }

    return (
        <>
            <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{comment.moniteur?.prenom} {comment.moniteur?.nom}</span>
                <span className="text-sm text-muted-foreground">{comment.dateCommentaire}</span>
            </div>

            {isEditing ? (
                <div className="space-y-2">
                    <Textarea
                        defaultValue={comment.message ? comment.message : ''}
                        onChange={(e) => setEditContent(e.target.value)}
                        className={`w-full resize-none`}
                        style={{minHeight: textHeight ? textHeight : 0}}
                    />
                    <Button onClick={() => handleSave()} size="sm" className={'bg-[#2f3570] hover:bg-[#43497E]'}>
                        Save
                    </Button>
                </div>
            ) : (
                <p
                    ref={contentRef}
                    className={`text-sm text-[#555555] mb-2 hover:bg-[#f3f3f3] hover:text-[#222] p-2 pb-1 rounded comment-content ${isExpanded ? 'expanded' : 'line-clamp-3'}`}
                    onClick={() => setIsEditing(true)}
                >
                    {comment.message}
                </p>
            )}

            <div className={"flex justify-between mt-3"}>
                {isOverflowed && !isEditing ? (
                    <button
                        className="flex items-center text-sm text-primary hover:underline"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Voir moins" : "Voir plus"}
                        <ChevronLeft className={`h-4 w-4 ml-1 ${isExpanded ? 'rotate-90' : 'rotate-180'}`}/>
                    </button>
                ) : ''}
                <Link className={"text-sm hover:underline"} href={`/sorties/${comment.sortie?.id}`}>Accedez à la fiche de sécurité</Link>
            </div>

        </>
    );
}
