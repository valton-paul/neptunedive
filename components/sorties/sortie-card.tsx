import {Sortie} from "@/types/Sortie";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar, Clock, MapPin} from "lucide-react";
import {formatDate} from "@/lib/utils";

export function SortieCard({ sortie }: { sortie: Sortie }) {
    return (
        <Card className="mb-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{sortie.lieu}</CardTitle>
                <CardDescription className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(sortie.dateSortie)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {sortie.type}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {sortie.creneau}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}