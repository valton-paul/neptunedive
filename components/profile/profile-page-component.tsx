'use client'

import {useRouter} from 'next/navigation'
import {Anchor, Award, Book, FileText, Mail, User} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Plongeur} from "@/types/Plongeur"
import {useUser} from "@/lib/useUser";


interface ProfilePageComponentProps {
    user: Plongeur;
}

export default function ProfilePageComponent({ user }: ProfilePageComponentProps) {
    const router = useRouter()
    const {user: loggedUser, loading} = useUser()

    const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | null }) => (
        <div className="flex items-center space-x-2 py-2">
            <Icon className="h-5 w-5 text-[#2f3570]" />
            <span className="font-medium text-gray-600">{label}:</span>
            <span className="text-gray-800">{value || 'Non spécifié'}</span>
        </div>
    )

    const redirect = () => {
        const path = `/commentaires/${user.id}`
        router.push(path)
    }

    return (
        <div className="container mx-auto p-4 bg-[#e6f4ff] min-h-screen">
            <Card className="max-w-md mx-auto shadow-lg">
                <CardHeader className="bg-[#2f3570] text-white">
                    <CardTitle className="text-2xl font-bold text-center">Profil du Plongeur</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-[#4a5180] rounded-full flex items-center justify-center mb-4">
                                <User className="h-12 w-12 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-[#2f3570]">{`${user.prenom} ${user.nom}`}</h2>
                        </div>

                        <InfoItem icon={Mail} label="Email" value={user.email} />
                        <InfoItem icon={Book} label="En formation" value={user.formation ? 'Oui' : 'Non'} />
                        <InfoItem icon={Anchor} label="Niveau Plongée Autonome" value={user.niveauPlongeeAutonome} />
                        <InfoItem icon={Anchor} label="Niveau Plongée Encadré" value={user.niveauPlongeeEncadre} />

                        {user.isMoniteur && (
                            <InfoItem icon={Award} label="Niveau Moniteur" value={user.niveauMoniteur} />
                        )}
                    </div>
                </CardContent>

                <CardFooter className="bg-gray-50 p-4">
                    { loggedUser?.isMoniteur && (
                    <Button
                        onClick={() => redirect()}
                        className="w-full bg-[#2f3570] hover:bg-[#4a5180] text-white"
                    >
                        <FileText className="mr-2 h-4 w-4" /> Voir la fiche de suivi
                    </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}