import React from 'react'
import Image from 'next/image'
import { Calendar, ClipboardList, Clock, EyeOff, MapPin, Waves, CreditCard, Euro } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, formatDate, formatPrice } from "@/lib/utils"
import { Sortie } from "@/types/Sortie"
import { useUser } from "@/lib/useUser"
import { EnrollmentButton } from "@/components/sorties/enroll-button"
import IconButtonWithTooltip from "@/components/ui/tooltip-button-component"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
    const { user, loading } = useUser()

    return (
        <Card className={cn("mb-4 overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300", className)}>
            <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/5 h-48 sm:h-auto">
                    <Image
                        src={"https://media.discordapp.net/attachments/1288761280659722250/1312075220416335894/la-rochelle-887448_1920.webp?ex=674b2cc5&is=6749db45&hm=e5d139386f6e9baadc5fbff7d48353767a66f411f9e35fcfced7397b3fda4b2f&=&format=webp&width=993&height=662" || "/placeholder.svg?height=400&width=300"}
                        alt={`Image de ${sortie.lieu}`}
                        layout="fill"
                        objectFit="cover"
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
                                Sortie à {sortie.lieu}
                            </CardTitle>
                            {sortie.price !== null && (
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
                                <span className="text-sm">{sortie.creneau}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-[#2f3570]"/>
                                <span className="text-sm">{sortie.lieu}</span>
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
                                    tooltipText="Ignorer cette sortie"
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
                            {isEnrolled && sortie.price !== null && (
                                <Link href={`/sorties/${sortie.id}/checkout`} passHref className="w-full sm:w-auto">
                                    <Button variant="outline" className="w-full">
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Payer
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardFooter>
                </div>
            </div>
        </Card>
    )
}