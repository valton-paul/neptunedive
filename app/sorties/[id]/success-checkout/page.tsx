'use client'

import { useEffect, useState } from 'react'
import {useParams, useRouter, useSearchParams} from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
    const router = useRouter()
    const params = useParams()
    const [sortieId, setSortieId] = useState<string | null>(null)

    useEffect(() => {
        const id = params.id
        if (id) {
            setSortieId(id)
        }
    }, [params])

    return (
        <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader className="bg-gradient-to-r from-[#2f3570] to-[#4a5180] text-white">
                    <div className="flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-16 w-16 text-green-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Paiement Réussi</CardTitle>
                    <CardDescription className="text-gray-200 text-center">
                        Votre paiement a été traité avec succès
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-center text-gray-600 mb-4">
                        Merci pour votre paiement. Votre place pour la sortie est maintenant confirmée.
                    </p>
                    <div className="flex justify-center items-center text-[#2f3570]">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>Vous recevrez bientôt un email avec les détails de votre réservation.</span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    {sortieId && (
                        <Link href={`/sorties/${sortieId}`} passHref className="w-full">
                            <Button className="w-full bg-[#2f3570] hover:bg-[#4a5180] text-white">
                                Voir les détails de la sortie
                            </Button>
                        </Link>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => router.push('/')}
                        className="w-full"
                    >
                        Retour à l'accueil
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}