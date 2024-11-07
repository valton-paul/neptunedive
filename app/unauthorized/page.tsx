'use client'

import { useRouter } from 'next/navigation'
import { AlertTriangle, Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function UnauthorizedPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e6f4ff] p-4">
            <Card className="max-w-md w-full">
                <CardHeader className="bg-[#2f3570] text-white text-center py-6">
                    <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
                    <CardTitle className="text-2xl font-bold">Accès Non Autorisé</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6">
                    <p className="text-gray-600 mb-4">
                        Désolé, vous n'avez pas l'autorisation d'accéder à cette page.
                        Veuillez vérifier vos identifiants ou contacter l'administrateur si vous pensez qu'il s'agit d'une erreur.
                    </p>
                    <div className="w-full h-0.5 bg-gray-200 my-6"></div>
                    <p className="text-sm text-gray-500">
                        Si vous avez besoin d'aide, n'hésitez pas à contacter notre équipe de support.
                    </p>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                    <Button
                        onClick={() => router.push('/')}
                        className="w-full bg-[#2f3570] hover:bg-[#4a5180] text-white"
                    >
                        <Home className="mr-2 h-4 w-4" /> Retour à l'accueil
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}