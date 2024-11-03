'use client'

import { Card } from "@/components/ui/card"
import {CardCommentContent} from "@/components/commentaires/CardCommentContent";
import {Commentaire} from "@/types/Commentaire";
import {useEffect, useState} from "react";
import {getCommentaireUser} from "@/api/commentairesAPI";

function formatDate(isoDate: string|null) {
    if (!isoDate) {
        return '';
    }
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR"); // Formate en dd/MM/yyyy en français
}

export function PageComments({idPlongeur} : {idPlongeur: string}) {
    const [comments, setComments] = useState<Commentaire[]>([]);
    const [name, setName] = useState<{ nom: string|null; prenom: string|null } | null>(null);
    useEffect(() => {
        getCommentaireUser(idPlongeur).then((data) => {
            setComments(data);
            if (data.length > 0 && data[0].plongeur) {
                setName({
                    nom: data[0].plongeur.nom,
                    prenom: data[0].plongeur.prenom,
                });
            }
        });
    }, []);



    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          <h1 className="text-xl font-semibold mb-6">{name?.prenom} { name?.nom}</h1>

          {comments?.length > 0 ? comments.map((comment, index) => (
            <Card
              key={index}
              className={`p-4 ${index % 2 === 1 ? 'bg-orange-50' : 'bg-white'}`}
            >
                <CardCommentContent comment={{...comment, dateCommentaire: formatDate(comment.dateCommentaire)}} />
            </Card>
          )) : <p>Aucun commentaire</p>}
        </div>
  )
}