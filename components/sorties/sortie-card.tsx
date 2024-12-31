import React from 'react'
import {Calendar, CheckCircle, ClipboardList, Clock, CreditCard, EyeOff, MapPin, Waves} from 'lucide-react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {cn, formatDate, formatPrice} from "@/lib/utils"
import {Sortie} from "@/types/Sortie"
import {useUser} from "@/lib/useUser"
import {EnrollmentButton} from "@/components/sorties/enroll-button"
import IconButtonWithTooltip from "@/components/ui/tooltip-button-component"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {ImageFromBase64} from "@/components/ui/ImageFromBase64";

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
    const {user, loading} = useUser()

    const hasPaid = sortie.inscriptions.find(i => i.plongeur?.id === user?.id)?.paymentDate
    return (
        <Card className={cn("mb-4 overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300", className)}>
            <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/5 h-48 sm:h-auto">
                    <ImageFromBase64
                        base64String={sortie.idLieu.photo}
                        className={"relative overflow-hidden w-full h-48 sm:h-60 object-cover"}
                    />
                    <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs font-medium bg-white text-[#2f3570]">
                            {sortie.type}
                        </Badge>
                    </div>
                </div>
                <div className="flex-1">
                    <CardHeader className="pb-2 bg-gradient-to-r from-[#2f3570] to-[#4a5180] text-white p-4">
                        <div className="flex flex-row justify-between items-center">
                            <CardTitle className="text-xl font-semibold">
                                Sortie à {sortie.idLieu.nomLieu}
                            </CardTitle>
                            {sortie.price !== null && sortie.price !== undefined && (
                                <div className="flex items-center bg-white text-[#2f3570] px-3 py-1 rounded-full">
                                    <span className="text-lg font-bold">{formatPrice(sortie.price)}</span>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-[#2f3570]"/>
                                <span className="text-sm">{formatDate(sortie.dateSortie)}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-[#2f3570]"/>
                                <span className="text-sm">{sortie.heureSortie?.slice(0, 5)}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-[#2f3570]"/>
                                <span className="text-sm">{sortie.idLieu.nomLieu}</span>
                            </div>
                            <div className="flex items-center">
                                <Waves className="w-4 h-4 mr-2 text-[#2f3570]"/>
                                <span className="text-sm">{sortie.type}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <div className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-start mb-2 sm:mb-0">
                            {user?.isMoniteur && (
                                <IconButtonWithTooltip
                                    tooltipText="Voir la fiche de sécurité"
                                    icon={ClipboardList}
                                    href={`/sorties/${sortie.id}`}
                                    className="h-8 w-8 text-[#2f3570] hover:bg-[#e0e1e8]"
                                />
                            )}
                            {displayIgnoreButton && onIgnoreChange && (
                                <IconButtonWithTooltip
                                    tooltipText="Ignorer / Afficher la sortie"
                                    icon={EyeOff}
                                    onClick={onIgnoreChange}
                                    className="h-8 w-8 text-[#2f3570] hover:bg-[#e0e1e8]"
                                />
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                            {displayEnrollButton && (
                                <EnrollmentButton
                                    isEnrolled={isEnrolled}
                                    onEnrollmentChange={onEnrollmentChange}
                                    currentEnrollment={sortie.inscriptions.length}
                                    maxEnrollment={sortie.nbMaxInscription}
                                />
                            )}
                            {isEnrolled && sortie.price !== null && sortie.price !== undefined && (
                                hasPaid ? (
                                    <div className="flex items-center text-green-600">
                                        <CheckCircle className="w-4 h-4 mr-2"/>
                                        <span>Payé le {formatDate(hasPaid)}</span>
                                    </div>
                                ) : (
                                    <Link href={`/sorties/${sortie.id}/payment`} passHref className="w-full sm:w-auto">
                                        <Button variant="outline" className="w-full">
                                            <CreditCard className="w-4 h-4 mr-2"/>
                                            Payer
                                        </Button>
                                    </Link>
                                )
                            )}
                        </div>
                    </CardFooter>
                </div>
            </div>
        </Card>
    )
}