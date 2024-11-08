'use client'

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InscriptionPlongeur } from '@/types/InscriptionPlongeur';
import { getDemandeById, postFinalizeDemande } from '@/api/inscriptionsApi';
import { useRouter } from 'next/navigation';

interface FinaliserDemandeProps {
    idDemande: string;
}

export function FinaliserDemande({ idDemande }: FinaliserDemandeProps) {
    const router = useRouter();

    const [demande, setDemande] = useState<InscriptionPlongeur | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (idDemande) {
            // Récupère la demande par ID
            getDemandeById(idDemande).then(data => {
                if (data.validee == true) {
                    setDemande(data);
                } else {
                    setError('Cette demande n\'a pas été validée.');
                }
                setLoading(false);
            }).catch(err => {
                console.error('Erreur lors de la récupération de la demande', err);
                setError('Erreur lors de la récupération de la demande.');
                setLoading(false);
            });
        }
    }, [idDemande]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            await postFinalizeDemande(idDemande, password);
            // Redirige vers la page de connexion ou affiche un message de succès
            alert('Votre inscription a été finalisée avec succès!');
            router.push('/login');
        } catch (error) {
            console.error('Erreur lors de la finalisation de la demande', error);
            setError('Erreur lors de la finalisation de la demande.');
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!demande) {
        return <div>Aucune demande trouvée.</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Finaliser votre inscription</h2>
            <div className="mb-6">
                <p><strong>Email:</strong> {demande.email}</p>
                <p><strong>Nom:</strong> {demande.nom}</p>
                <p><strong>Prénom:</strong> {demande.prenom}</p>
                <p><strong>Niveau Plongée Autonome:</strong> {demande.niveauPlongeeAutonome || 'N/A'}</p>
                <p><strong>Niveau Plongée Encadrée:</strong> {demande.niveauPlongeeEncadre || 'N/A'}</p>
                <p><strong>Niveau Moniteur:</strong> {demande.niveauMoniteur || 'N/A'}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setError(null); // Efface les erreurs en cas de modification
                        }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={e => {
                            setConfirmPassword(e.target.value);
                            setError(null); // Efface les erreurs en cas de modification
                        }}
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit">Finaliser l'inscription</Button>
            </form>
        </div>
    );
}
