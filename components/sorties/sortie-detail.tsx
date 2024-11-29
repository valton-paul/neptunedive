import {Sortie} from "@/types/Sortie";
import {Calendar, Clock, Droplet, MapPin} from "lucide-react";
import {Button} from "@/components/ui/button";

export function SortieDetails({ sortie, estInscrit }: { sortie: Sortie, estInscrit: boolean }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{sortie.dateSortie}</span>
            </div>
            <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{sortie.idLieu.nomLieu}</span>
            </div>
            <div className="flex items-center space-x-2">
                <Droplet className="w-5 h-5" />
                <span>{sortie.type}</span>
            </div>
            <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{sortie.dateSortie}</span>
            </div>
            <p>{sortie.type}</p>
            {!estInscrit && (
                <Button className="w-full">S&#39;inscrire à cette sortie</Button>
            )}
        </div>
    )
}