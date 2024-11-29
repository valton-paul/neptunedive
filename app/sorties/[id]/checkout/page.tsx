'use client'

import {useEffect, useState} from 'react'
import {useParams, useRouter} from 'next/navigation'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {AlertCircle, CheckCircle2, Loader2} from 'lucide-react'
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import axios from "@/api/Axios";

export default function PaymentPage() {
    const router = useRouter()
    const params = useParams()
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPaymentUrl = async () => {
            try {
                const response = await axios.get(`/payment/${params.id}`)
                const data = await response.data
                setPaymentUrl(data.url)
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const response = err.response
                    if (response.status === 404) {
                        setError("Vous n'êtes pas inscrit à cette sortie.")
                    } else if (response.status === 500) {
                        setError("Une erreur est survenue lors de la génération du lien de paiement.")
                    } else if (response.status === 409) {
                        setError("Vous avez déjà payé pour cette sortie.")
                    } else {
                        setError("Une erreur inattendue s'est produite.")
                    }
                } else {
                    setError("Impossible de contacter le serveur.")
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchPaymentUrl()
    }, [params.id])

    const handlePayment = () => {
        if (paymentUrl) {
            window.location.href = paymentUrl
        }
    }

    return (
        <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader className="bg-gradient-to-r from-[#2f3570] to-[#4a5180] text-white">
                    <CardTitle className="text-2xl font-bold">Paiement de la Sortie</CardTitle>
                    <CardDescription className="text-gray-200">
                        Finalisez votre inscription en effectuant le paiement
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loader2 className="h-8 w-8 animate-spin text-[#2f3570]"/>
                            <span className="ml-2">Chargement du paiement...</span>
                        </div>
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : (
                        <Alert>
                            <CheckCircle2 className="h-4 w-4"/>
                            <AlertTitle>Prêt pour le paiement</AlertTitle>
                            <AlertDescription>Cliquez sur le bouton ci-dessous pour procéder au
                                paiement.</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>Retour</Button>
                    <Button
                        onClick={handlePayment}
                        disabled={isLoading || !!error || !paymentUrl}
                        className="bg-[#2f3570] hover:bg-[#4a5180] text-white"
                    >
                        Procéder au paiement
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}