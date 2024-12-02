import React from 'react';
import {Calendar, CheckCircle2, XCircle} from 'lucide-react'; // Importez les icônes nécessaires
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface PaymentStatusComponentProps {
    isSuccess: boolean | null; // true pour succès, false pour échec, null pour vérification
    statusMessage?: string;
    contentMessage?: string;
}

const PaymentStatusComponent: React.FC<PaymentStatusComponentProps> = ({
                                                                           isSuccess,
                                                                           statusMessage,
                                                                           contentMessage
                                                                       }) => {
    const router = useRouter();

    return (
        <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader
                    className={`bg-gradient-to-r ${
                        isSuccess ? 'from-[#2f3570] to-[#4a5180]' : 'from-red-500 to-red-600'
                    } text-white`}
                >
                    <div className="flex items-center justify-center mb-4">
                        {isSuccess === true ? (
                            <CheckCircle2 className="h-16 w-16 text-green-400"/>
                        ) : isSuccess === false ? (
                            <XCircle className="h-16 w-16 text-red-400"/>
                        ) : (
                            <Calendar className="h-16 w-16 text-gray-400"/>
                        )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isSuccess === true
                            ? 'Paiement Réussi'
                            : isSuccess === false
                                ? 'Paiement Échoué'
                                : 'Vérification en cours'}
                    </CardTitle>
                    <CardDescription className="text-gray-200 text-center">
                        {statusMessage || 'Veuillez patienter pendant la vérification du statut.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-center text-gray-600 mb-4">
                        {isSuccess === true ? 'Merci pour votre paiement.' : ''}
                        {contentMessage || ''}
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/')}
                        className="w-full"
                    >
                        Retour à l&#39;accueil
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default PaymentStatusComponent;
