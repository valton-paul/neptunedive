import {Calendar, Clock, MapPin, Waves} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {cn, formatDate} from "@/lib/utils"
import {Sortie} from "@/types/Sortie";
import Link from "next/link";
import {useUser} from "@/lib/useUser";

interface SortieCardProps {
    sortie: Sortie
    displayEnrollButton?: boolean
    isEnrolled?: boolean
    onEnrollmentChange?: () => void
    className?: string
}

export function SortieCard({
                               sortie,
                               displayEnrollButton = true,
                               isEnrolled = false,
                               onEnrollmentChange,
                               className
                           }: SortieCardProps) {
    const {user, loading} = useUser();
    return (
        <Card className={cn("mb-4 overflow-hidden", className)}>
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-xl font-semibold">
                    Sortie à {sortie.idLieu.nomLieu}
                </CardTitle>
                {user?.isMoniteur  ?(
                <Link className="text-sm bg-[#2f3570] hover:bg-[#43497E] !mt-0 p-3 rounded-md text-white" href={`/sorties/${sortie.id}`}>Voir la fiche de sécurité</Link>
                ) : null}
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Lieux</div>
                        <div className="flex items-center text-base">
                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground"/>
                            {sortie.idLieu.nomLieu}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Type</div>
                        <div className="flex items-center text-base">
                            <Waves className="w-4 h-4 mr-2 text-muted-foreground"/>
                            {sortie.type}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Date</div>
                        <div className="flex items-center text-base">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground"/>
                            {formatDate(sortie.dateSortie)
                            }
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">Crénaux</div>
                        <div className="flex items-center text-base">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground"/>
                            {sortie.heureSortie}
                        </div>
                    </div>
                </div>
                {displayEnrollButton ?
                    <Button
                        className="w-full bg-[#2f3570] hover:bg-[#4a5180]"
                        onClick={onEnrollmentChange}
                    >
                        {isEnrolled ? "Se désinscrire de cette sortie" : "S'inscrire à cette sortie"}
                    </Button>
                    : null}
            </CardContent>
        </Card>
    )
}