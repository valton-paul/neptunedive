import {Calendar, ClipboardList, Clock, EyeOff, MapPin, Waves} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {cn, formatDate} from "@/lib/utils"
import {Sortie} from "@/types/Sortie";
import {useUser} from "@/lib/useUser";
import {EnrollmentButton} from "@/components/sorties/enroll-button";
import IconButtonWithTooltip from "@/components/ui/tooltip-button-component";

interface SortieCardProps {
    sortie: Sortie
    displayEnrollButton?: boolean
    isEnrolled?: boolean
    onEnrollmentChange?: () => void
    displayIgnoreButton?: boolean
    onIgnoreChange?: () => void
    className?: string
}

export function SortieCard({
                               sortie,
                               displayEnrollButton = true,
                               isEnrolled = false,
                               onEnrollmentChange,
                               displayIgnoreButton = true,
                               onIgnoreChange,
                               className
                           }: SortieCardProps) {
    const {user, loading} = useUser();
    return (
        <Card className={cn("mb-4 overflow-hidden", className)}>
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-xl font-semibold">
                    Sortie à {sortie.idLieu.nomLieu}
                </CardTitle>
                <div className="flex items-center space-x-2">
                    {user?.isMoniteur && (
                        <IconButtonWithTooltip
                            tooltipText="Voir la fiche de sécurité"
                            icon={ClipboardList}
                            href={`/sorties/${sortie.id}`}
                            className="h-8 w-8 text-gray-500 hover:text-[#2f3570] hover:bg-gray-100"
                        />

                    )}
                    {displayIgnoreButton && onIgnoreChange && (

                        <IconButtonWithTooltip
                            tooltipText="Ignorer cette sortie"
                            icon={EyeOff}
                            onClick={onIgnoreChange}
                            className="h-8 w-8 text-gray-500 hover:text-[#2f3570] hover:bg-gray-100"
                        />


                    )}
                </div>
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
                <div className="space-y-2">
                    {displayEnrollButton &&
                        <EnrollmentButton
                            isEnrolled={isEnrolled}
                            onEnrollmentChange={onEnrollmentChange}
                            currentEnrollment={sortie.inscriptions.length}
                            maxEnrollment={sortie.nbMaxInscription}
                        />
                    }
                </div>
            </CardContent>
        </Card>
    )
}