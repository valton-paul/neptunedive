
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FeedBack} from "@/types/FeedBack";
import {formatDate} from "@/lib/utils";

export function FeedBackCard({feedback, onAddFeedback}: { feedback: FeedBack, onAddFeedback: (b: boolean, feedback: FeedBack) => void }) {

    return (
        <Card className="p-6 relative">
            <Button
                variant="outline"
                onClick={() => onAddFeedback(true, feedback)}
                className="absolute top-4 right-4 bg-[#2f3570] hover:bg-[#43497E] text-white hover:text-white"
            >
                Ajouter feedback
            </Button>

            <div className="pr-32">
                <h3 className="text-lg font-semibold mb-4">{feedback.prenom} {feedback.nom}</h3>

                <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            Détails de la sortie
                        </h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="font-medium">Lieu</div>
                            <div>{feedback.lieu}</div>
                            <div className="font-medium">Date</div>
                            <div>{formatDate(feedback.date_sortie)}</div>
                            <div className="font-medium">Type</div>
                            <div>{feedback.type}</div>
                            <div className="font-medium">Horaire</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            Détails de la plongée
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm w-max">
                            <div className="font-medium w-fit">Profondeur prévue</div>
                            <div>{feedback.profondeur_prevue ? feedback.profondeur_prevue : 0} m</div>
                            <div className="font-medium w-fit">Profondeur réalisé</div>
                            <div>{feedback.profondeur_realisee ? feedback.profondeur_realisee : 0 } m</div>
                            <div className="font-medium">Durée prévue</div>
                            <div>{feedback.duree_prevue ? feedback.duree_prevue : "00:00:00"}</div>
                            <div className="font-medium">Durée réalisé</div>
                            <div>{feedback.duree_realisee ? feedback.duree_realisee : "00:00:00"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}