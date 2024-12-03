'use client';

import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import axios from '@/api/Axios';
import PaymentComponent from '@/components/sorties/payment-component';
import PaymentStatusComponent from '@/components/sorties/payment-status-component';
import {getPaymentLink, getPaymentStatus, postPaymentStatus} from '@/api/paymentAPI';
import {Loader2} from "lucide-react";

export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [paymentStatusMessage, setPaymentStatusMessage] = useState<string | null>(null);

    useEffect(() => {

        const fetchPaymentStatus = async () => {
            try {
                return await getPaymentStatus(params.id);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const response = err.response;
                    if (response?.status === 404)
                        router.push('/unauthorized');
                    if (response?.status === 500) {
                        setPaymentStatusMessage("Une erreur est survenue lors de la validation du paiement.");
                    } else {
                        setPaymentStatusMessage("Une erreur inattendue s'est produite.");
                    }
                } else {
                    router.push('/unauthorized');
                }
                return 'Error';
            }
        }

        const fetchPaymentLink = async () => {
            try {
                return await getPaymentLink(params.id);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const response = err.response;
                    if (response?.status === 404)
                        router.push('/unauthorized');
                    if (response?.status === 409) {
                        setError("Le paiement a déjà été effectué.");
                    } else {
                        setError("Une erreur inattendue s'est produite.");
                    }
                } else {
                    setError("Impossible de contacter le serveur.");
                }
                return null;
            }
        }

        const fetchPaymentData = async () => {
            const status = await fetchPaymentStatus()
            setPaymentStatus(status);
            if (status === 'NotPaid') {
                const url = await fetchPaymentLink()
                setPaymentUrl(url);
            } else if (status === 'Authorized') {
                await postPaymentStatus(params.id);
            } else {
                setError("Il y a une erreur avec le paiement.");
            }
            setIsLoading(false);

        };

        fetchPaymentData();
    }, [params.id, router]);

    const handlePayment = () => {
        if (paymentUrl) {
            window.location.href = paymentUrl;
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-[#2f3570]"/>
                <span className="ml-2">Chargement...</span>
            </div>
        );
    }

    if (paymentStatus === 'NotPaid') {
        return (
            <PaymentComponent
                isLoading={isLoading}
                error={error}
                paymentUrl={paymentUrl}
                handlePayment={handlePayment}
            />
        );
    }

    if (paymentStatus === 'Authorized') {
        return (
            <PaymentStatusComponent
                isSuccess={true}
                statusMessage="Paiement réussi. Merci pour votre inscription."
            />
        );
    }

    return (
        <PaymentStatusComponent
            isSuccess={false}
            statusMessage={paymentStatusMessage || "Une erreur est survenue lors du paiement."}
            contentMessage={"Si le problème persiste, essayez de regler le paiement par un autre moyen."}
        />
    )
}