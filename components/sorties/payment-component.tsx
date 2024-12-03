import React from 'react';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'; // Importez les icônes nécessaires
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface PaymentComponentProps {
    isLoading: boolean;
    error: string | null;
    paymentUrl: string | null;
    handlePayment: () => void;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({
                                                               isLoading,
                                                               error,
                                                               paymentUrl,
                                                               handlePayment,
                                                           }) => {
    const router = useRouter();

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
                            <Loader2 className="h-8 w-8 animate-spin text-[#2f3570]" />
                            <span className="ml-2">Chargement du paiement...</span>
                        </div>
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : (
                        <Alert>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Prêt pour le paiement</AlertTitle>
                            <AlertDescription>
                                Cliquez sur le bouton ci-dessous pour procéder au paiement.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>
                        Retour
                    </Button>
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
    );
};

export default PaymentComponent;
